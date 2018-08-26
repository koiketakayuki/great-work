import * as React from 'react';
import { FormEntryProps, FormEntry, ValueChangeHandler } from './FormEntry';
import { ContextValue, FormContext } from './FormContext';
import { Paper } from '../Paper';

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
    disabled:props.disabled ||  context.disabled,
    readonly: props.readonly || context.readonly,
    type: props.type || context.type,
  };
  return (
    <Paper>
      <FormContext.Provider value={newContext}>
        {props.children}
      </FormContext.Provider>
    </Paper>
  );
}

export function CompositeFormEntry<T>(props: CompositeFormEntryProps<T>) {
  return (
    <FormEntry<T, CompositeFormEntryProps<T>> {...props}>
      {(context, onChange) => getForm(props, context, onChange)}
    </FormEntry>
  );
}
