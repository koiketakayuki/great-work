import * as React from 'react';
import { Container } from '../layout/Container';
import { ContextValue, UpdateValue, FormContext } from './FormContext';
import { ColorType } from '../../config/StyleConfig';

export type CompositeFormProps<T> = {
  value: T;
  onChange?: (value: T, hasError: boolean) => void;
  disabled?: boolean;
  readonly?: boolean;
  type?: ColorType;
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
      disabled: this.props.disabled || context.disabled,
      readonly: this.props.readonly || context.readonly,
      type: this.props.type || context.type,
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
