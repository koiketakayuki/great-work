import * as React from 'react';
import { FormEntryProps, FormContext, ContextValue, UpdateValue, formEntry } from './CompositeForm';
import { FormItem } from './FormItem';
import { Paper } from '../Paper';

export const CompositeFormEntry = <T extends any>(props: FormEntryProps<T>) =>
  new (formEntry<T, FormEntryProps<T>>((props, onChange, hasError) => {
    const context = {
      update: (_: string, newValue: T, hasError: boolean) => {
        onChange(newValue);
      },
      readonly: props.readonly,
      disabled: props.disabled,
    };

    return (
      <FormItem label={props.label}>
        <Paper>
          <FormContext.Provider value={context}>
            {props.children}
          </FormContext.Provider>
        </Paper>
      </FormItem>
    );
  }))(props);
