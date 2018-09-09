import * as React from 'react';
import { createTextForm, TextFormProps } from './createTextForm';
import { WithErrorMessage } from './WithErrorMessage';

const _TextForm = createTextForm('text');

export function TextForm(props: TextFormProps) {
  return (
    <WithErrorMessage<string, TextFormProps> {...props}>
      {props => <_TextForm {...props}/>}
    </WithErrorMessage>
  );
}
