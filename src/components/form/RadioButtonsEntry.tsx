import * as React from 'react';
import { createFormEntry, FormEntryProps } from './createFormEntry';
import { RadioButtonsProps, RadioButtons } from './RadioButtons';

export type RadioButtonsEntryProps<C, T> = FormEntryProps<T, C, RadioButtonsProps<T>>;

export function RadioButtonsEntry<C, T>(entryProps: RadioButtonsEntryProps<C, T>) {
  return createFormEntry<T, C, RadioButtonsProps<T>>(props => <RadioButtons<T> {...props}/>)(entryProps);
}
