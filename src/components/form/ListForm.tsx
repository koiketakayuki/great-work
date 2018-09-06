import * as React from 'react';
import { FormProps, ValueChangeHandler } from './Form';
import { Container } from '../layout/Container';
import { Right } from '../layout/Right';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { Text } from '../Text';
import { IconText } from '../IconText';

export type DefaultValueGenerator<T> = () => T;

export interface ListFormProps<T> extends FormProps<T[]> {
  createChildForm: (props: FormProps<T>, onDelete: () => void) => React.ReactNode;
  addText?: string;
  default?: T | DefaultValueGenerator<T>;
  keyParameter?: keyof T;
  onChange?: (value: T[], errorMessage?: string, childFormErrorMessage?: string) => void;
}

export function ListForm<T>(props: ListFormProps<T>) {
  const listForms = props.value.map((element: T, i: number) => createListForm(element, props, i));
  return wrapWithContainer(listForms, props);
}

function createListForm<T>(element: T, props: ListFormProps<T>, index: number) {
  const childFormProps: FormProps<T> = getChildFormProps(element, props, index);
  const onDelete = getDeleteHandler(index, props);
  const childForm: React.ReactNode = props.createChildForm(childFormProps, onDelete);

  return childForm;
}

function getChildFormProps<T>(element: T, props: ListFormProps<T>, index: number): FormProps<T> {
  return {
    value: element,
    onChange: getElementValueChangeHandler(props, index),
    type: props.type,
    disabled: props.disabled,
    readonly: props.readonly,
  };
}

function getElementValueChangeHandler<T>(props: ListFormProps<T>, index: number): ValueChangeHandler<T> | undefined {
  const onChange = props.onChange;

  if (!onChange) {
    return undefined;
  }

  const currentValue: T[] = props.value;

  return (childValue: T, childFormErrorMessage?: string) => {
    const newValue: T[] = [];

    for (let i = 0; i < currentValue.length; i = i + 1) {
      if (i === index) {
        newValue.push(childValue);
      } else {
        newValue.push(currentValue[i]);
      }
    }

    const errorMessage = props.validator ? props.validator(newValue) : undefined;

    onChange(newValue, errorMessage, childFormErrorMessage);
  };
}

function getDeleteHandler<T>(index: number, props: FormProps<T[]>) {
  return () => {
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
}

function wrapWithContainer<T>(node: React.ReactNode, props: ListFormProps<T>) {
  const hasAddButton =
    props.addText !== undefined &&
    props.default !== undefined &&
    !props.readonly && !props.disabled;

  const addChild = () => {
    if (props.onChange && props.default !== undefined) {
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
