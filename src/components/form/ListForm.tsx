import * as React from 'react';
import { FormProps, ValueChangeHandler } from './Form';
import { Container } from '../layout/Container';
import { Right } from '../layout/Right';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { Text } from '../Text';
import { IconText } from '../IconText';
import { IconButton } from '../IconButton';

export type DefaultValueGenerator<T> = () => T;

export interface ListFormProps<T> extends FormProps<T[]> {
  addText?: string;
  default: T | DefaultValueGenerator<T>;
  keyParameter?: keyof T;
  deletable?: boolean;
  children: (element: T) => React.ReactNode;
}

export function ListForm<T>(props: ListFormProps<T>) {
  const listForms = props.value.map((element: T, i: number) => createListForm(element, props, i));
  return wrapWithContainer(listForms, props);
}

function createListForm<T>(element: T, props: ListFormProps<T>, index: number) {
  const childForm = props.children(element);
  const hasDeleteButton = props.deletable && !props.disabled && !props.readonly;

  if (hasDeleteButton) {
    return attachDeleteButton(childForm, index, props);
  }

  return childForm;
}

function attachDeleteButton<T>(node: React.ReactNode, index: number, props: FormProps<T[]>) {
  const deleteChild = () => {
    if (props.onChange) {
      const oldListValue = props.value;
      const newListValue: T[] = [];
      for (let i = 0; i < oldListValue.length; i = i + 1) {
        if (i !== index) {
          newListValue.push(oldListValue[i]);
        }
      }
      props.onChange(newListValue);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      {node}
      <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
        <IconButton type="error" icon={<Icon name="highlight_off"/>} onClick={deleteChild}/>
      </div>
    </div>
  );
}

function wrapWithContainer<T>(node: React.ReactNode, props: ListFormProps<T>) {
  const hasAddButton =
    props.addText !== undefined &&
    props.default !== undefined &&
    !props.readonly && !props.disabled;

  const addChild = () => {
    if (props.onChange && props.default) {
      const newValue: T = typeof props.default === 'function' ?
        props.default() : props.default;

      const newListValue = props.value.concat([newValue]);
      props.onChange(newListValue);
    }
  };

  const addButtonContainer = hasAddButton ? (
    <Right>
      <Container>
        <Button type="primary" onClick={addChild}>
          <IconText icon={<Icon name="add"/>} text={<Text>{props.addText}</Text>}/>
        </Button>
      </Container>
    </Right>
  ) : undefined;

  return (
    <div>
      <Container>
        {node}
      </Container>
      {addButtonContainer}
    </div>
  );
}
