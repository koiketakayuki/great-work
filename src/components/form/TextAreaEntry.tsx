import * as React from 'react';
import { TextArea } from './TextForm';
import { FormEntryProps, FormEntry, ValueChangeHandler } from './FormEntry';
import { ContextValue } from './FormContext';

function getTextArea(
  props: FormEntryProps<string>,
  context: ContextValue<string>,
  onChange: ValueChangeHandler<string>,
) {
  return (
    <TextArea
      value={props.value}
      type={props.type || context.type}
      validator={props.validator}
      onChange={onChange}
      disabled={props.disabled || context.disabled}
      readonly={props.readonly || context.readonly}
    />
  );
}

export function TextAreaEntry(props: FormEntryProps<string>) {
  return (
    <FormEntry<string, FormEntryProps<string>> {...props}>
      {(context, onChange) => getTextArea(props, context, onChange)}
    </FormEntry>
  );
}
