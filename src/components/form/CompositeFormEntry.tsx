import * as React from 'react';
import { FormEntryProps, createFormEntry } from './createFormEntry';
import { FormProps } from './Form';
import { Paper } from '../Paper';

export type CompositeFormEntryProps<T, C> = FormEntryProps<T, C, FormProps<T>> & {
  children: React.ReactNode;
};

export function CompositeFormEntry<C, T>(entryProps: CompositeFormEntryProps<T, C>) {
  return createFormEntry<T, C, FormProps<T>>((props) => {
    return <Paper>{entryProps.children}</Paper>;
  })(entryProps);
}
