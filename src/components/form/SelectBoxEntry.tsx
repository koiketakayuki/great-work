import * as React from 'react';
import { createFormEntry, FormEntryProps } from './createFormEntry';
import { SelectBoxProps, SelectBox } from './SelectBox';

export type SelectBoxEntryProps<C, T> = FormEntryProps<T, C, SelectBoxProps<T>>;

export function SelectBoxEntry<C, T>(entryProps: SelectBoxEntryProps<C, T>) {
  return createFormEntry<T, C, SelectBoxProps<T>>(props => <SelectBox<T> {...props}/>)(entryProps);
}
