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

export function createFormEntry<T, C, P extends FormProps<T>>(create: (formProps: P) => React.ReactNode) {
  return function (props: FormEntryProps<T, C, P>) {
    return (
      <FormItem label={props.label}>
        <FormContext.Consumer>
          {context => (
            <FormContext.Provider value={getNewContext(context, props)}>
              <Validation<T, P>
                validator={props.validator}
                formProps={getFilteredProps<T, C, P>(context, props)}
                onChange={getChangeValueHander(context, props)}
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
  context: ContextValue<C>,
  formEntryProps: FormEntryProps<T, C, P>,
): ContextValue<C> {
  return {
    value: context.value,
    disabled: formEntryProps.disabled !== undefined ? formEntryProps.disabled : context.disabled,
    readonly: formEntryProps.readonly !== undefined ? formEntryProps.readonly : context.readonly,
    type: formEntryProps.type !== undefined ? formEntryProps.type : context.type,
    update: context.update,
  };
}

function getFilteredProps<T, C, P extends FormProps<T>>(
  context: ContextValue<C>,
  props: P,
): P {
  const result: any = {};

  for (const key in props) {
    result[key] = props[key];
  }

  result['disabled'] = props.disabled !== undefined ? props.disabled : context.disabled;
  result['readonly'] = props.readonly !== undefined ? props.readonly : context.readonly;
  result['type'] = props.type !== undefined ? props.type : context.type;

  return result as P;
}

function getChangeValueHander<T, C, P extends FormProps<T>>(context: ContextValue<C>, props: FormEntryProps<T, C, P>) {
  return (value: T, errorMessage?: string) => {
    if (props.onChange) {
      props.onChange(value, errorMessage);
    }

    const newValue = Object.assign({}, context.value, { [props.id]: value });
    context.update(newValue, false);
  };
}
