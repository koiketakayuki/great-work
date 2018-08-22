import * as React from 'react';
import { formEntry, SelectFormEntryProps } from './CompositeForm';
import { SelectBox } from './SelectForm';
import { FormItem } from './FormItem';

export const SelectBoxEntry = <T extends any>(props: SelectFormEntryProps<T>) =>
  new (formEntry<T, SelectFormEntryProps<T>>((props, onChange, context) => {
    return (
      <FormItem label={props.label}>
        <SelectBox
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
