import * as React from 'react';
import { createTextForm, TextFormProps } from './createTextForm';
import { Validation } from './Validation';

const _PasswordForm = createTextForm('password');

export function PasswordForm(props: TextFormProps) {
  return (
    <Validation validator={props.validator} onChange={props.onChange} formProps={props}>
      {props => <_PasswordForm {...props}/>}
    </Validation>
  );
}
