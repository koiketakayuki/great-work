import * as React from 'react';
import { formEntry, SelectFormEntryProps } from './CompositeForm';
import { RadioButtons } from './SelectForm';
import { FormItem } from './FormItem';

export const RadioButtonsEntry = <T extends any>(props: SelectFormEntryProps<T>) =>
  new (formEntry<T, SelectFormEntryProps<T>>((props, onChange, context) => {
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
