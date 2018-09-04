import * as React from 'react';
import { Container } from '../layout/Container';
import { ContextValue, UpdateValue, FormContext } from './FormContext';
import { ColorType } from '../../config/StyleConfig';
import { ValidationHandler } from './Form';

export type CompositeFormProps<T> = {
  value: T;
  onChange?: ValidationHandler<T>;
  disabled?: boolean;
  readonly?: boolean;
  type?: ColorType;
};

export class CompositeForm<T> extends React.Component<CompositeFormProps<T>> {

  getUpdateFunction(context: ContextValue<any, any>): UpdateValue<any, any> {
    return (id: string | number | symbol, childValue: any, errorMessage?: string) => {
      const newValue = Object.assign({}, this.props.value, { [id]: childValue });
      if (this.props.onChange) {
        this.props.onChange(newValue, errorMessage);
      }

      context.update(id, newValue, errorMessage);
    };
  }

  getNewContext(context: ContextValue<any, any>): ContextValue<any, any> {
    return {
      value: this.props.value,
      update: this.getUpdateFunction(context),
      disabled: this.props.disabled !== undefined ? this.props.disabled : context.disabled,
      readonly: this.props.readonly !== undefined ? this.props.readonly : context.readonly,
      type: this.props.type !== undefined ? this.props.type : context.type,
    };
  }

  getCompositeForm(context: ContextValue<any, any>) {
    return (
      <FormContext.Provider value={this.getNewContext(context)}>
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
