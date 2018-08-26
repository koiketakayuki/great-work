import * as React from 'react';
import { PasswordForm } from './TextForm';
import { FormEntryProps, FormEntry, ValueChangeHandler } from './FormEntry';
import { ContextValue } from './FormContext';

function getPasswordForm(
  props: FormEntryProps<string>,
  context: ContextValue<string>,
  onChange: ValueChangeHandler<string>,
) {
  return (
    <PasswordForm
      value={props.value}
      validator={props.validator}
      onChange={onChange}
      disabled={props.disabled || context.disabled}
      readonly={props.readonly || context.readonly}
    />
  );
}

export function PasswordFormEntry(props: FormEntryProps<string>) {
  return (
    <FormEntry<string, FormEntryProps<string>> {...props}>
      {(context, onChange) => getPasswordForm(props, context, onChange)}
    </FormEntry>
  );
}
