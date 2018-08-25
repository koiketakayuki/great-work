import * as React from 'react';
import { createFormEntry, FormEntryProps } from './CompositeForm';
import { CheckList, HasSelectOptions } from './SelectForm';
import { FormItem } from './FormItem';

type CheckListEntryProps<T> = FormEntryProps<T[]> & HasSelectOptions<T>;

export const CheckListEntry = <T extends any>(props: CheckListEntryProps<T>) =>
  new (createFormEntry<T[], CheckListEntryProps<T>>((props, onChange, context) => {
    return (
      <FormItem label={props.label}>
        <CheckList
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
