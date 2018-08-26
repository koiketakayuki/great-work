import * as React from 'react';
import { TextForm } from './TextForm';
import { FormEntryProps, FormEntry, ValueChangeHandler } from './FormEntry';
import { ContextValue } from './FormContext';

function getTextForm(
  props: FormEntryProps<string>,
  context: ContextValue<string>,
  onChange: ValueChangeHandler<string>,
) {
  return (
    <TextForm
      value={props.value}
      type={props.type || context.type}
      validator={props.validator}
      onChange={onChange}
      disabled={props.disabled || context.disabled}
      readonly={props.readonly || context.readonly}
    />
  );
}

export function TextFormEntry(props: FormEntryProps<string>) {
  return (
    <FormEntry<string, FormEntryProps<string>> {...props}>
      {(context, onChange) => getTextForm(props, context, onChange)}
    </FormEntry>
  );
}
