import * as React from 'react';
import { createTextForm, TextFormProps } from './createTextForm';
import { Validation } from './Validation';

const _TextArea = createTextForm('longText');

export function TextArea(props: TextFormProps) {
  return (
    <Validation validator={props.validator} onChange={props.onChange} formProps={props}>
      {props => <_TextArea {...props}/>}
    </Validation>
  );
}
