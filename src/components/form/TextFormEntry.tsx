import * as React from 'react';
import { TextForm } from './TextForm';
import { FormEntryProps, FormEntry, ValueChangeHandler } from './FormEntry';
import { ContextValue } from './FormContext';

function getTextForm<C>(
  props: FormEntryProps<string, C>,
  context: ContextValue<C>,
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

export function TextFormEntry<C>(props: FormEntryProps<string, C>) {
  return (
    <FormEntry<string, C, FormEntryProps<string, C>> {...props}>
      {(context, onChange) => getTextForm(props, context, onChange)}
    </FormEntry>
  );
}
