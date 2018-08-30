import * as React from 'react';
import { FormEntry, ValueChangeHandler, MultipleSelectFormEntryProps } from './FormEntry';
import { ContextValue } from './FormContext';
import { CheckList } from './SelectForm';

function getCheckList<T, C>(
  props: MultipleSelectFormEntryProps<T, C>,
  context: ContextValue<C>,
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

export function CheckListEntry<C, T>(props: MultipleSelectFormEntryProps<T, C>) {
  return (
    <FormEntry<T[], C, MultipleSelectFormEntryProps<T, C>> {...props}>
      {(context, onChange) => getCheckList(props, context, onChange)}
    </FormEntry>
  );
}
