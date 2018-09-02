import * as React from 'react';
import { createFormEntry, FormEntryProps } from './createFormEntry';
import { CheckListProps, CheckList } from './CheckList';

export type CheckListEntryProps<C, T> = FormEntryProps<T[], C, CheckListProps<T>>;

export function CheckListEntry<C, T>(entryProps: CheckListEntryProps<C, T>) {
  return createFormEntry<T[], C, CheckListProps<T>>(props => <CheckList<T> {...props}/>)(entryProps);
}
