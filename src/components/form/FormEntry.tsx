import * as React from 'react';
import { Validator } from './Form';
import { ContextValue, FormContext } from './FormContext';

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
