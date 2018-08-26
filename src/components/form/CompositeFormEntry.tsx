import * as React from 'react';
import { FormEntryProps, FormEntry, ValueChangeHandler } from './FormEntry';
import { ContextValue, FormContext } from './FormContext';

export type CompositeFormEntryProps<T> = FormEntryProps<T> & {
  children: React.ReactNode;
};

function getForm<T>(
  props: CompositeFormEntryProps<T>,
  context: ContextValue<T>,
  onChange: ValueChangeHandler<T>,
) {
  const newContext = {
    update: (_: string, value: T) => {
      onChange(value);
    },
    disabled: context.disabled,
    readonly: context.readonly,
  };
  return (
    <FormContext.Provider value={newContext}>
      {props.children}
    </FormContext.Provider>
  );
}

export function CompositeFormEntry<T>(props: CompositeFormEntryProps<T>) {
  return (
    <FormEntry<T, CompositeFormEntryProps<T>> {...props}>
      {(context, onChange) => getForm(props, context, onChange)}
    </FormEntry>
  );
}
