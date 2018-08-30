import * as React from 'react';
import { PasswordForm } from './TextForm';
import { FormEntryProps, FormEntry, ValueChangeHandler } from './FormEntry';
import { ContextValue } from './FormContext';

function getPasswordForm<C>(
  props: FormEntryProps<string, C>,
  context: ContextValue<C>,
  onChange: ValueChangeHandler<string>,
) {
  return (
    <PasswordForm
      value={props.value}
      type={props.type || context.type}
      validator={props.validator}
      onChange={onChange}
      disabled={props.disabled || context.disabled}
      readonly={props.readonly || context.readonly}
    />
  );
}

export function PasswordFormEntry<C>(props: FormEntryProps<string, C>) {
  return (
    <FormEntry<string, C, FormEntryProps<string, C>> {...props}>
      {(context, onChange) => getPasswordForm(props, context, onChange)}
    </FormEntry>
  );
}
