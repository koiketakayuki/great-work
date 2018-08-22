import * as React from 'react';
import { FormProps, FormState } from './Form';
import { Container } from '../../layout/Container';
import { ErrorMessage } from './ErrorMessage';

export function validatable<T, S extends FormProps<T>>(
  create: (
    props: S,
    onChange: (value: T, errorMessage?: string) => void,
    onBlur: React.FocusEventHandler,
    hasError: boolean,
  ) => React.ReactNode,
) {
  return class extends React.Component<S, FormState> {
    constructor(props: S) {
      super(props);
      this.state = {
        errorMessage: undefined,
        validationActive: false,
      };
    }

    onChange = (newValue: T) => {
      if (this.props.onChange) {
        let errorMessage: string | undefined = undefined;
        if (this.props.validator) {
          errorMessage = this.props.validator(newValue);

          this.setState({ errorMessage });
        }
        this.props.onChange(newValue, errorMessage);
      }
    }

    onBlur = (e: React.FocusEvent) => {
      this.setState({ validationActive: true });
    }

    getErrorMessage() {
      if (this.state.errorMessage && this.state.validationActive) {
        return <Container padding="10px 0"><ErrorMessage config={this.props.config}>{this.state.errorMessage}</ErrorMessage></Container>;
      }
    }

    render() {
      const errorMessage = this.getErrorMessage();
      const hasError = errorMessage !== undefined;

      return (
        <div>
          {create(this.props, this.onChange, this.onBlur, hasError)}
          {errorMessage}
        </div>
      );
    }
  };
}
