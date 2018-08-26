import * as React from 'react';
import { FormEntry, ValueChangeHandler, MultipleSelectFormEntryProps } from './FormEntry';
import { ContextValue } from './FormContext';
import { CheckList } from './SelectForm';

function getCheckList<T>(
  props: MultipleSelectFormEntryProps<T>,
  context: ContextValue<T[]>,
  onChange: ValueChangeHandler<T[]>,
) {
  return (
    <CheckList
      value={props.value}
      validator={props.validator}
      onChange={onChange}
      options={props.options}
      disabled={props.disabled || context.disabled}
      readonly={props.readonly || context.readonly}
    />
  );
}

export const CheckListEntry = <T extends any>(props: MultipleSelectFormEntryProps<T>) => (
  <FormEntry<T[], MultipleSelectFormEntryProps<T>> {...props}>
    {(context, onChange) => getCheckList(props, context, onChange)}
  </FormEntry>
);
