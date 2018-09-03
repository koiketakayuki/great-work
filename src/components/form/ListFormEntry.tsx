import * as React from 'react';
import { createFormEntry, FormEntryProps } from './createFormEntry';
import { FormProps, ValueChangeHandler } from './Form';
import { Container } from '../layout/Container';
import { Right } from '../layout/Right';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { Text } from '../Text';
import { IconText } from '../IconText';
import { IconButton } from '../IconButton';

type DefaultValueGenerator<T> = () => T;

type CreateChildForm<T> = (props: FormProps<T>) => React.ReactNode;

export type ListFormEntryProps<T, C> = FormEntryProps<T[], C, FormProps<T[]>> & {
  addText?: string;
  default?: T | DefaultValueGenerator<T>;
  keyParameter?: keyof T;
  deletable?: boolean;
  children: CreateChildForm<T>;
};

export function ListFormEntry<C, T>(entryProps: ListFormEntryProps<T, C>) {
  return createFormEntry<T[], C, FormProps<T[]>>((listFormProps: FormProps<T[]>) => {
    return createListForm(listFormProps, entryProps);
  })(entryProps);
}

function createListForm<T, C>(listFormProps: FormProps<T[]>, entryProps: ListFormEntryProps<T, C>) {
  const childForms = listFormProps.value.map((childFormValue: T, index: number) => {
    const childFormProps: FormProps<T> = getChildFormProps<T>(index, childFormValue, listFormProps);

    const hasDeleteButton = entryProps.deletable && !listFormProps.disabled && !listFormProps.readonly;

    if (hasDeleteButton) {
      return attachDeleteButton(entryProps.children(childFormProps), index, listFormProps);
    }

    return entryProps.children(childFormProps);
  });

  return wrapWithContainer(childForms, listFormProps, entryProps);
}

function attachDeleteButton<T>(node: React.ReactNode, index: number, listFormProps: FormProps<T[]>) {
  const deleteChild = () => {
    if (listFormProps.onChange) {
      const oldListValue = listFormProps.value;
      const newListValue: T[] = [];
      for (let i = 0; i < oldListValue.length; i = i + 1) {
        if (i !== index) {
          newListValue.push(oldListValue[i]);
        }
      }
      listFormProps.onChange(newListValue);
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

function wrapWithContainer<T, C>(node: React.ReactNode, listFormProps: FormProps<T[]>, entryProps: ListFormEntryProps<T, C>) {
  const hasAddButton =
    entryProps.addText !== undefined &&
    entryProps.default !== undefined &&
    !listFormProps.readonly && !listFormProps.disabled;

  const addChild = () => {
    if (listFormProps.onChange && entryProps.default) {
      const newValue: T = typeof entryProps.default === 'function' ?
        entryProps.default() : entryProps.default;

      const newListValue = listFormProps.value.concat([newValue]);
      listFormProps.onChange(newListValue);
    }
  };

  const addButtonContainer = hasAddButton ? (
    <Right>
      <Container>
        <Button type="primary" onClick={addChild}>
          <IconText icon={<Icon name="add"/>} text={<Text>{entryProps.addText}</Text>}/>
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

function getChildFormProps<T>(index: number, value: T, listFormProps: FormProps<T[]>): FormProps<T> {
  return {
    value,
    type: listFormProps.type,
    disabled: listFormProps.disabled,
    readonly: listFormProps.readonly,
    onChange: getChildValueChangeHandler(index, listFormProps),
  };
}

function getChildValueChangeHandler<T>(index: number, listFormProps: FormProps<T[]>): ValueChangeHandler<T> {
  return (newValue: T) => {
    if (listFormProps.onChange) {
      const oldListValue = listFormProps.value;
      const newListValue: T[] = [];

      for (let i = 0; i < oldListValue.length; i = i + 1) {
        if (i === index) {
          newListValue.push(newValue);
        } else {
          newListValue.push(oldListValue[i]);
        }
      }

      listFormProps.onChange(newListValue);
    }
  };
}
