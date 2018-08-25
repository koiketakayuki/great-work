import * as React from 'react';
import { Container } from '../layout/Container';
import { ContextValue, UpdateValue, FormContext } from './FormContext';

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
