import * as React from 'react';
import { Validator, FormProps, ValueChangeHandler } from './Form';
import { ErrorMessage } from './ErrorMessage';

export interface ValidationProps<T, P extends FormProps<T>> {
  validator?: Validator<T>;
  onChange?: ValueChangeHandler<T>;
  formProps: P;
  children: (props: P) => React.ReactNode;
}

export interface ValidationState {
  errorMessage?: string;
}

export class Validation<T, P extends FormProps<T>> extends React.Component<ValidationProps<T, P>, ValidationState> {

  constructor(props: ValidationProps<T, P>) {
    super(props);
    this.state = { errorMessage: undefined };
  }

  getFilteredProps(): P {
    const hasError = !!this.state.errorMessage;
    const originalProps: P = this.props.formProps;

    const newProps: any = {};
    for (const key in originalProps) {
      newProps[key] = originalProps[key];

      newProps.type = hasError ? 'error' : originalProps.type;
      newProps.onChange = this.onChange;
    }

    return newProps;
  }

  onChange: ValueChangeHandler<T> = (value: T) => {
    let errorMessage = undefined;
    if (this.props.validator) {
      errorMessage = this.props.validator(value);
    }
    this.setState({ errorMessage });

    if (this.props.onChange) {
      this.props.onChange(value, errorMessage);
    }
  }

  render() {
    return (
      <div>
        {this.props.children(this.getFilteredProps())}
        {this.state.errorMessage ? <ErrorMessage>{this.state.errorMessage}</ErrorMessage> : undefined}
      </div>
    );
  }
}
