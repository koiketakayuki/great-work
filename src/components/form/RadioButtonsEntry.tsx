import * as React from 'react';
import { createFormEntry, FormEntryProps } from './CompositeForm';
import { RadioButtons, HasSelectOptions } from './SelectForm';
import { FormItem } from './FormItem';

type RadioButtonsEntryProps<T> = FormEntryProps<T> & HasSelectOptions<T>;

export const RadioButtonsEntry = <T extends any>(props: RadioButtonsEntryProps<T>) =>
  new (createFormEntry<T, RadioButtonsEntryProps<T>>((props, onChange, context) => {
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
