import * as React from 'react';
import { TextArea } from './TextForm';
import { FormEntryProps, FormEntry, ValueChangeHandler } from './FormEntry';
import { ContextValue } from './FormContext';

function getTextArea<C>(
  props: FormEntryProps<string, C>,
  context: ContextValue<C>,
  onChange: ValueChangeHandler<string>,
) {
  return (
    <TextArea
      value={props.value}
      type={props.type || context.type}
      validator={props.validator}
      onChange={onChange}
      disabled={props.disabled || context.disabled}
      readonly={props.readonly || context.readonly}
    />
  );
}

export function TextAreaEntry<C>(props: FormEntryProps<string, C>) {
  return (
    <FormEntry<string, C, FormEntryProps<string, C>> {...props}>
      {(context, onChange) => getTextArea(props, context, onChange)}
    </FormEntry>
  );
}
