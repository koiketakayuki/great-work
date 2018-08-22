import * as React from 'react';
import { Validator } from './Form';

export interface FormEntryProps<T> {
  id: string;
  value: T;
  label: string;
  validator?: Validator<T>;
}

export type UpdateValue<T> = (id: string, entryValue: any, hasError: boolean) => void;
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
