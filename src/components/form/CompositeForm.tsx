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

  getUpdateFunction(context: ContextValue<any>): UpdateValue<T> {
    return (newValue: T, hasError: boolean) => {
      if (this.props.onChange) {
        this.props.onChange(newValue, hasError);
      }

      context.update(newValue, hasError);
    };
  }

  getCurrentContext(context: ContextValue<any>): ContextValue<T> {
    return {
      value: this.props.value,
      update: this.getUpdateFunction(context),
      disabled: this.props.disabled !== undefined ? this.props.disabled : context.disabled,
      readonly: this.props.readonly !== undefined ? this.props.readonly : context.readonly,
      type: this.props.type !== undefined ? this.props.type : context.type,
    };
  }

  getCompositeForm(context: ContextValue<any>) {
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
