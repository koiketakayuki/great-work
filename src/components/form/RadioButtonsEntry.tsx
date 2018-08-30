import * as React from 'react';
import { FormEntry, ValueChangeHandler, SelectFormEntryProps } from './FormEntry';
import { ContextValue } from './FormContext';
import { RadioButtons } from './SelectForm';

function getSelectBox<T, C>(
  props: SelectFormEntryProps<T, C>,
  context: ContextValue<C>,
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

export function RadioButtonsEntry<C, T>(props: SelectFormEntryProps<T, C>) {
  return (
    <FormEntry<T, C, SelectFormEntryProps<T, C>> {...props}>
      {(context, onChange) => getSelectBox(props, context, onChange)}
    </FormEntry>
  );
}
