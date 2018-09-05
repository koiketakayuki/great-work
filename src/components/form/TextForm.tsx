import * as React from 'react';
import { createTextForm, TextFormProps } from './createTextForm';
import { Validation } from './Validation';

const _TextForm = createTextForm('text');

export function TextForm(props: TextFormProps) {
  return (
    <Validation validator={props.validator} onChange={props.onChange} formProps={props}>
      {props => <_TextForm {...props}/>}
    </Validation>
  );
}
