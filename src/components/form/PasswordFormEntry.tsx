import * as React from 'react';
import { createFormEntry } from './createFormEntry';
import { TextFormProps } from './createTextForm';
import { TextFormEntryProps } from './TextAreaEntry';
import { PasswordForm } from './PasswordForm';

export function PasswordFormEntry<C>(entryProps: TextFormEntryProps<C>) {
  return createFormEntry<string, C, TextFormProps>(props => <PasswordForm {...props}/>)(entryProps);
}
