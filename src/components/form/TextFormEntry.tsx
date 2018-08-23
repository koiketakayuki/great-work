import * as React from 'react';
import { FormEntryProps, formEntry } from './CompositeForm';
import { TextForm } from './TextForm';
import { FormItem } from './FormItem';

export const TextFormEntry = formEntry<string, FormEntryProps<string>>((props, onChange, context) => {
  return (
    <FormItem label={props.label}>
      <TextForm
        value={props.value}
        validator={props.validator}
        onChange={onChange}
        disabled={props.disabled || context.disabled}
        readonly={props.readonly || context.readonly}
      />
    </FormItem>
  );
});