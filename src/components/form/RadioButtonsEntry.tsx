import * as React from 'react';
import { FormEntry, ValueChangeHandler, SelectFormEntryProps } from './FormEntry';
import { ContextValue } from './FormContext';
import { RadioButtons } from './SelectForm';

function getSelectBox<T>(
  props: SelectFormEntryProps<T>,
  context: ContextValue<T>,
  onChange: ValueChangeHandler<T>,
) {
  return (
    <RadioButtons
      value={props.value}
      type={props.type || context.type}
      validator={props.validator}
      onChange={onChange}
      options={props.options}
      disabled={props.disabled || context.disabled}
      readonly={props.readonly || context.readonly}
    />
  );
}

export function RadioButtonsEntry<T>(props: SelectFormEntryProps<T>) {
  return (
    <FormEntry<T, SelectFormEntryProps<T>> {...props}>
      {(context, onChange) => getSelectBox(props, context, onChange)}
    </FormEntry>
  );
}
