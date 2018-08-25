import * as React from 'react';
import { PasswordForm } from './TextForm';
import { FormItem } from './FormItem';
import { createFormEntry, FormEntryProps } from './FormEntry';

export const PasswordFormEntry = createFormEntry<string, FormEntryProps<string>>((props, onChange, context) => {
  return (
    <FormItem label={props.label}>
      <PasswordForm
        value={props.value}
        validator={props.validator}
        onChange={onChange}
        disabled={props.disabled || context.disabled}
        readonly={props.readonly || context.readonly}
      />
    </FormItem>
  );
});
