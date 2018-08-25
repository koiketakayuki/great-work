import * as React from 'react';
import { Validator } from './Form';
import { Container } from '../layout/Container';

export interface FormEntryProps<T> {
  id: string;
  value: T;
  label: string;
  validator?: Validator<T>;
  disabled?: boolean;
  readonly?: boolean;
  children?: React.ReactNode;
}

export class FormEntry<T, S extends FormEntryProps<T>> extends React.Component<S> {}

export type UpdateValue<T> = (id: string, entryValue: T, hasError: boolean) => void;
export type ContextValue<T> = {
  update: UpdateValue<T>;
  disabled?: boolean;
  readonly?: boolean;
};

export const FormContext = React.createContext<ContextValue<any>>({
  update: (id: string, entryValue: any, hasError: boolean) => {},
  disabled: false,
  readonly: false,
});

export type CompositeFormProps<T> = {
  value: T;
  onChange?: (value: T, hasError: boolean) => void;
  disabled?: boolean;
  readonly?: boolean;
};

export class CompositeForm<T> extends React.Component<CompositeFormProps<T>> {

  getUpdateFunction(context: ContextValue<T>): UpdateValue<T> {
    return (id: string, entryValue: any, hasError: boolean) => {
      const newValue = Object.assign({}, this.props.value, { [id]: entryValue });

      if (this.props.onChange) {
        this.props.onChange(newValue, hasError);
      }

      context.update('', newValue, hasError);
    };
  }

  getCurrentContext(context: ContextValue<T>) {
    return {
      update: this.getUpdateFunction(context),
      disabled: this.props.disabled,
      readonly: this.props.readonly,
    };
  }

  getCompositeForm(context: ContextValue<T>) {
    return (
      <FormContext.Provider value={this.getCurrentContext(context)}>
        <Container>{this.props.children}</Container>
      </FormContext.Provider>
    );
  }

  render() {
    return (
      <FormContext.Consumer>
        {context => this.getCompositeForm(context)}
      </FormContext.Consumer>
    );
  }
}

type OnEntryValueChange<T> = (value: T) => void;

type CreateEntry<T, S extends FormEntryProps<T>> =
  (props: S, update: OnEntryValueChange<T>, context: ContextValue<T>) => React.ReactNode;

export function createFormEntry<T, S extends FormEntryProps<T>>(createEntry: CreateEntry<T, S>) {
  return class extends FormEntry<T, S> {
    validate(value: T) {
      if (this.props.validator) {
        return this.props.validator(value);
      }
    }

    getEntry(context: ContextValue<T>) {
      const onEntryValueChange = (entryValue: T) => {
        const errorMessage: string | undefined = this.validate(entryValue);
        context.update(this.props.id, entryValue, !!errorMessage);
      };
      return createEntry(this.props, onEntryValueChange, context);
    }

    render() {
      return (
        <FormContext.Consumer>
          {context => this.getEntry(context)}
        </FormContext.Consumer>
      );
    }
  };
}
