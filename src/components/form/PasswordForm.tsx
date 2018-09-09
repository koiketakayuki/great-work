import * as React from 'react';
import { createTextForm, TextFormProps } from './createTextForm';
import { WithErrorMessage } from './WithErrorMessage';

const _PasswordForm = createTextForm('password');

export function PasswordForm(props: TextFormProps) {
  return (
    <WithErrorMessage<string, TextFormProps> {...props}>
      {props => <_PasswordForm {...props}/>}
    </WithErrorMessage>
  );
}
