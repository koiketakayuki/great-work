import * as React from 'react';
import { FormEntryProps, formEntry } from './CompositeForm';
import { RadioButtons, HasSelectOptions } from './SelectForm';
import { FormItem } from './FormItem';

export const RadioButtonsEntry = <T extends any>(props: FormEntryProps<T> & HasSelectOptions<T>) =>
  new (formEntry<T, FormEntryProps<T> & HasSelectOptions<T>>((props, onChange, context) => {
    return (
      <FormItem label={props.label}>
        <RadioButtons
          value={props.value}
          validator={props.validator}
          onChange={onChange}
          options={props.options}
          disabled={props.disabled || context.disabled}
          readonly={props.readonly || context.readonly}
        />
      </FormItem>
    );
  }))(props);
