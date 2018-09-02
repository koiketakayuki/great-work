import * as React from 'react';
import { createFormEntry, FormEntryProps } from './createFormEntry';
import { TextForm } from './TextForm';
import { TextFormProps } from './createTextForm';

export type TextFormEntryProps<C> = FormEntryProps<string, C, TextFormProps>;

export function TextFormEntry<C>(entryProps: TextFormEntryProps<C>) {
  return createFormEntry<string, C, TextFormProps>(props => <TextForm {...props}/>)(entryProps);
}
