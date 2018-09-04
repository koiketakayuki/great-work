import * as React from 'react';
import { Validator, FormProps, ValidationHandler } from './Form';
import { FormItem } from './FormItem';
import { FormContext, ContextValue } from './FormContext';
import { Validation } from './Validation';

export type FormEntryProps<T, C, P extends FormProps<T>> = P & {
  id: keyof C;
  label: string;
  validator?: Validator<T>;
  onChange?: ValidationHandler<T>;
};

export function createFormEntry<T, C, P extends FormProps<T>>(create: (formProps: P) => React.ReactNode) {
  return function (props: FormEntryProps<T, C, P>) {
    return (
      <FormItem label={props.label}>
        <FormContext.Consumer>
          {context => (
            <FormContext.Provider value={getNewContext(context, props)}>
              <Validation<T, P>
                validator={props.validator}
                formProps={props}
                onChange={getChangeValueHander<T, C, P>(context, props)}
              >
                {(formProps: P) => create(formProps)}
              </Validation>
            </FormContext.Provider>
          )}
        </FormContext.Consumer>
      </FormItem>
    );
  };
}

function getNewContext<T, C, P extends FormProps<T>>(
  context: ContextValue<C, T>,
  formEntryProps: FormEntryProps<T, C, P>,
): ContextValue<C, any> {
  return {
    value: context.value,
    disabled: formEntryProps.disabled !== undefined ? formEntryProps.disabled : context.disabled,
    readonly: formEntryProps.readonly !== undefined ? formEntryProps.readonly : context.readonly,
    type: formEntryProps.type !== undefined ? formEntryProps.type : context.type,
    update: context.update,
  };
}

function getChangeValueHander<T, C, P extends FormProps<T>>(
  context: ContextValue<C, T>,
  props: FormEntryProps<T, C, P>,
): ValidationHandler<T> {
  return (value: T, errorMessage?: string) => {
    if (props.onChange) {
      props.onChange(value, errorMessage);
    }

    context.update(props.id, value, errorMessage);
  };
}
