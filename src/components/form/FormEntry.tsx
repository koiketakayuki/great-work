import * as React from 'react';
import { Validator } from './Form';
import { ContextValue, FormContext } from './FormContext';
import { FormItem } from './FormItem';
import { HasSelectOptions } from './SelectForm';
import { ColorType } from '../../config/StyleConfig';

export type ValueChangeHandler<T> = (value: T) => void;

export interface FormEntryProps<T, C> {
  id: keyof C;
  value: T;
  type?: ColorType;
  label: string;
  validator?: Validator<T>;
  disabled?: boolean;
  readonly?: boolean;
}

export type SelectFormEntryProps<T, C> = FormEntryProps<T, C> & HasSelectOptions<T>;
export type MultipleSelectFormEntryProps<T, C> = FormEntryProps<T[], C> & HasSelectOptions<T>;

function getChangeHandler<T, C>(props: FormEntryProps<T, C>, context: ContextValue<C>): ValueChangeHandler<T> {
  return (value: T) => {
    let hasError = false;

    if (props.validator) {
      hasError = !!props.validator(value);
    }

    const newValue = Object.assign({}, context.value, { [props.id]: value });
    context.update(newValue, hasError);
  };
}

export type FormGenerator<T, C> = {
  children: (context: ContextValue<C>, onChange: ValueChangeHandler<T>) => React.ReactNode;
};

export function FormEntry<T, C, S extends FormEntryProps<T, C>>(props: S & FormGenerator<T, C>) {
  return (
    <FormItem label={props.label}>
      <FormContext.Consumer>
        {context  => props.children(context, getChangeHandler(props, context))}
      </FormContext.Consumer>
    </FormItem>
  );
}
