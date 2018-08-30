import * as React from 'react';
import { FormEntryProps, FormEntry, ValueChangeHandler } from './FormEntry';
import { ContextValue, FormContext } from './FormContext';
import { Right } from '../layout/Right';
import { Button } from '../Button';
import { IconButton } from '../IconButton';
import { Container } from '../layout/Container';
import { IconText } from '../IconText';

type DefaultValueGenerator<T> = () => T;

interface ListFormEntryProps<T, C> extends FormEntryProps<T[], C> {
  default: T | DefaultValueGenerator<T>;
  children: (element: T, onChange: ValueChangeHandler<T>) => React.ReactNode;
  keyParameter?: keyof T;
}

interface ListItemProps<C> {
  key: string;
  context: ContextValue<C>;
  onDelete: () => void;
}

export class ListItem<C> extends React.Component<ListItemProps<C>, { uniqueKey: string }> {
  render() {
    return (
      <div style={{ position: 'relative' }}>
        <FormContext.Provider value={this.props.context}>
          {this.props.children}
          <div style={{ position: 'absolute', right: '6px', top: '12px' }}>
            <IconButton name="highlight_off" type="error" onClick={this.props.onDelete}/>
          </div>
        </FormContext.Provider>
      </div>
    );
  }
}

function getListItem<T, C>(
  index: number,
  element: T,
  props: ListFormEntryProps<T, C>,
  context: ContextValue<C>,
) {

  const newContext: ContextValue<T> = {
    value: element,
    update: (newElementValue: T) => {
      const newValue: T[] = [];
      for (let i = 0; i < props.value.length; i = i + 1) {
        if (i !== index) {
          newValue.push(props.value[i]);
        } else {
          newValue.push(newElementValue);
        }
      }

      context.update(Object.assign({}, context.value, { [props.id]: newValue }), true);
    },
    disabled: props.disabled || context.disabled,
    readonly: props.readonly || context.readonly,
    type:  props.type || context.type,
  };

  const form =  props.children(element, value => newContext.update(value, true));

  const onDelete = () => {
    const newValue = [];
    for (let i = 0; i < props.value.length; i = i + 1) {
      if (i !== index) {
        newValue.push(props.value[i]);
      }
    }

    context.update(Object.assign({}, context.value, { [props.id]: newValue }), true);
  };

  const key = props.keyParameter ? String(element[props.keyParameter]) : String(index);

  return (
    <ListItem key={key} context={newContext} onDelete={onDelete}>
      {form}
    </ListItem>
  );
}

function getListForm<T, C>(
  props: ListFormEntryProps<T, C>,
  context: ContextValue<C>,
  onChange: ValueChangeHandler<T[]>,
) {
  const value: T[] = props.value;
  const length = value.length;
  const forms: React.ReactNode[] = [];

  for (let i = 0; i < length; i = i + 1) {
    const form = getListItem(i, value[i], props, context);
    forms.push(form);
  }

  const onAdd = () => {
    const defaultValue = props.default;
    if (typeof defaultValue === 'function') {
      onChange(props.value.concat([defaultValue()]));
    } else {
      onChange(props.value.concat([defaultValue]));
    }
  };

  const newContext: ContextValue<C> = {
    value: context.value,
    update: context.update,
    disabled: props.disabled || context.disabled,
    readonly: props.readonly || context.readonly,
    type:  props.type || context.type,
  };

  return (
    <div>
      {forms}
      <Right>
        <Container>
          <Button
            onClick={onAdd}
            disabled={newContext.disabled}
          ><IconText icon="add" text="add"/>
          </Button>
        </Container>
      </Right>
    </div>
  );
}

export function ListFormEntry<T, C>(props: ListFormEntryProps<T, C>) {
  return (
    <FormEntry<T[], C, FormEntryProps<T[], C>> {...props}>
      {(context, onChange) => getListForm(props, context, onChange)}
    </FormEntry>
  );
}
