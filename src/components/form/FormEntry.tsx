import * as React from 'react';
import { Validator } from './Form';
import { ContextValue, FormContext } from './FormContext';
import { FormItem } from './FormItem';
import { HasSelectOptions } from './SelectForm';
import { ColorType } from '../../config/StyleConfig';

export type ValueChangeHandler<T> = (value: T) => void;

export interface FormEntryProps<T> {
  id: string;
  value: T;
  type?: ColorType;
  label: string;
  validator?: Validator<T>;
  disabled?: boolean;
  readonly?: boolean;
}

export type SelectFormEntryProps<T> = FormEntryProps<T> & HasSelectOptions<T>;
export type MultipleSelectFormEntryProps<T> = FormEntryProps<T[]> & HasSelectOptions<T>;

function getChangeHandler<T>(props: FormEntryProps<T>, context: ContextValue<T>): ValueChangeHandler<T> {
  return (value: T) => {
    let hasError = false;

    if (props.validator) {
      hasError = !!props.validator(value);
    }

    context.update(props.id, value, hasError);
  };
}

export type FormGenerator<T> = {
  children: (context: ContextValue<T>, onChange: ValueChangeHandler<T>) => React.ReactNode;
};

export const FormEntry = <T extends any, S extends FormEntryProps<T>>(props: S & FormGenerator<T>) => {
  return (
    <FormItem label={props.label}>
      <FormContext.Consumer>
        {context  => props.children(context, getChangeHandler(props, context))}
      </FormContext.Consumer>
    </FormItem>
  );
};
