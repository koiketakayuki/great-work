import * as React from 'react';
import { FormEntryProps, createFormEntry } from './createFormEntry';
import { FormProps } from './Form';
import { Paper } from '../Paper';
import { FormContext, ContextValue } from './FormContext';

export type CompositeFormEntryProps<T, C> = FormEntryProps<T, C, FormProps<T>> & {
  children: React.ReactNode;
};

export function CompositeFormEntry<C, T>(entryProps: CompositeFormEntryProps<T, C>) {
  return createFormEntry<T, C, FormProps<T>>(props => (
    <FormContext.Consumer>
      {context =>
        <FormContext.Provider value={getNewContext(context, props, entryProps)}>
          <Paper>
            {entryProps.children}
          </Paper>
        </FormContext.Provider>
      }
    </FormContext.Consumer>
  ))(entryProps);
}

function getNewContext<C, T>(
  currentContext: ContextValue<C>,
  props: FormProps<T>,
  entryProps: CompositeFormEntryProps<T, C>,
): ContextValue<T> {
  return {
    value: props.value,
    disabled: props.disabled,
    readonly: props.readonly,
    type: props.type,
    update: (value: T, hasError: boolean) => {
      const newValue: C = Object.assign({}, currentContext.value, { [entryProps.id]: value });
      currentContext.update(newValue, hasError);
    },
  };
}
