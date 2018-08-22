import * as React from 'react';
import { formEntry, FormEntryProps } from './CompositeForm';
import { SelectBox, HasSelectOptions } from './SelectForm';
import { FormItem } from './FormItem';

type SelectBoxEntryProps<T> = FormEntryProps<T> & HasSelectOptions<T>;

export const SelectBoxEntry = <T extends any>(props: SelectBoxEntryProps<T>) =>
  new (formEntry<T, SelectBoxEntryProps<T>>((props, onChange, context) => {
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
