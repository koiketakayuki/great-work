import * as React from 'react';
import { FormEntry, ValueChangeHandler, SelectFormEntryProps } from './FormEntry';
import { ContextValue } from './FormContext';
import { SelectBox } from './SelectForm';

function getSelectBox<T>(
  props: SelectFormEntryProps<T>,
  context: ContextValue<T>,
  onChange: ValueChangeHandler<T>,
) {
  return (
    <SelectBox
      value={props.value}
      validator={props.validator}
      onChange={onChange}
      options={props.options}
      disabled={props.disabled || context.disabled}
      readonly={props.readonly || context.readonly}
    />
  );
}

export function SelectBoxEntry<T>(props: SelectFormEntryProps<T>) {
  return (
    <FormEntry<T, SelectFormEntryProps<T>> {...props}>
      {(context, onChange) => getSelectBox(props, context, onChange)}
    </FormEntry>
  );
}
