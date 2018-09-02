import * as React from 'react';
import { createFormEntry, FormEntryProps } from './createFormEntry';
import { TextArea } from './TextArea';
import { TextFormProps } from './createTextForm';

export type TextFormEntryProps<C> = FormEntryProps<string, C, TextFormProps>;

export function TextAreaEntry<C>(entryProps: TextFormEntryProps<C>) {
  return createFormEntry<string, C, TextFormProps>(props => <TextArea {...props}/>)(entryProps);
}
