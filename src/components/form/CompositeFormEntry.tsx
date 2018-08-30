import * as React from 'react';
import { FormEntryProps, FormEntry, ValueChangeHandler } from './FormEntry';
import { ContextValue, FormContext } from './FormContext';
import { Paper } from '../Paper';

export type CompositeFormEntryProps<T, C> = FormEntryProps<T, C> & {
  children: React.ReactNode;
};

function getForm<T, C>(
  props: CompositeFormEntryProps<T, C>,
  context: ContextValue<C>,
  onChange: ValueChangeHandler<T>,
) {
  const newContext: ContextValue<T> = {
    value: props.value,
    update: (value: T) => {
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

export function CompositeFormEntry<C, T>(props: CompositeFormEntryProps<T, C>) {
  return (
    <FormEntry<T, C, CompositeFormEntryProps<T, C>> {...props}>
      {(context, onChange) => getForm(props, context, onChange)}
    </FormEntry>
  );
}
