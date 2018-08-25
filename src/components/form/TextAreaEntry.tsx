import * as React from 'react';
import { FormEntryProps, createFormEntry } from './CompositeForm';
import { TextArea } from './TextForm';
import { FormItem } from './FormItem';

export const TextAreaEntry = createFormEntry<string, FormEntryProps<string>>((props, onChange, context) => {
  return (
    <FormItem label={props.label}>
      <TextArea
        value={props.value}
        validator={props.validator}
        onChange={onChange}
        disabled={props.disabled || context.disabled}
        readonly={props.readonly || context.readonly}
      />
    </FormItem>
  );
});
