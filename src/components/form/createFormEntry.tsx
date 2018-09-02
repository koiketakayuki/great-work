import * as React from 'react';
import { Validator, FormProps } from './Form';
import { FormItem } from './FormItem';
import { FormContext, ContextValue } from './FormContext';
import { Validation } from './Validation';

export type FormEntryProps<T, C, P extends FormProps<T>> = P & {
  id: keyof C;
  label: string;
  validator?: Validator<T>;
  onChange?: (value: T, errorMessage?: string) => void;
};

function getChangeValueHander<T, C, P extends FormProps<T>>(context: ContextValue<C>, props: FormEntryProps<T, C, P>) {
  return (value: T, errorMessage?: string) => {
    if (props.onChange) {
      props.onChange(value, errorMessage);
    }

    const newValue = Object.assign({}, context.value, { [props.id]: value });
    context.update(newValue, false);
  };
}

export function createFormEntry<T, C, P extends FormProps<T>>(create: (formProps: P) => React.ReactNode) {
  return function (props: FormEntryProps<T, C, P>) {
    return (
      <FormItem label={props.label}>
        <FormContext.Consumer>
          {context => (
            <Validation<T, P>
              validator={props.validator}
              formProps={props}
              onChange={getChangeValueHander(context, props)}
            >
              {(formProps: P) => create(formProps)}
            </Validation>
          )}
        </FormContext.Consumer>
      </FormItem>
    );
  };
}
