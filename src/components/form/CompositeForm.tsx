import * as React from 'react';
import { Validator } from './Form';
import { StyleConfig } from '../../config/StyleConfig';
import { TextForm } from './TextForm';
import { Section } from '../layout/Section';

export interface FormEntryProps<T> {
  id: string;
  value: T;
  label: string;
  validator?: Validator<T>;
}

export const FormContext = React.createContext(<T extends any>(id: string, newValue: T, hasError: boolean) => {});

export type CompositeFormProps<T> = {
  value: T;
  onChange?: (value: T, hasError: boolean) => void;
  validator?: Validator<T>;
  children: React.ReactNode;
};

export class CompositeForm<T> extends React.Component<CompositeFormProps<T>> {

  update = (id: string, entryValue: any, hasError: boolean) => {
    const newValue = Object.assign({}, this.props.value, { [id]: entryValue });

    if (this.props.onChange) {
      this.props.onChange(newValue, hasError);
    }
  }

  render() {
    return <FormContext.Provider value={this.update}>{this.props.children}</FormContext.Provider>;
  }
}

export class TextFormEntry extends React.Component<FormEntryProps<string>> {

  validate(value: string) {
    if (this.props.validator) {
      return this.props.validator(value);
    }
  }

  getEntry(update: (id: string, newValue: string, hasError: boolean) => void) {
    const onEntryValueChange = (entryValue: string) => {
      const errorMessage: string | undefined = this.validate(entryValue);
      update(this.props.id, entryValue, !!errorMessage);
    };
    return <Section label={this.props.label}><TextForm value={this.props.value} onChange={onEntryValueChange}/></Section>;
  }

  render() {
    return (
      <FormContext.Consumer>
        {update => this.getEntry(update)}
      </FormContext.Consumer>
    );
  }
}
