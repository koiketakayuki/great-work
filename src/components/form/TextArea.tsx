import * as React from 'react';
import { createTextForm, TextFormProps } from './createTextForm';
import { WithErrorMessage } from './WithErrorMessage';

const _TextArea = createTextForm('longText');

export function TextArea(props: TextFormProps) {
  return (
    <WithErrorMessage<string, TextFormProps> {...props}>
      {props => <_TextArea {...props}/>}
    </WithErrorMessage>
  );
}
