import * as React from 'react';
import { Validator } from './Form';
import { ErrorMessage } from './ErrorMessage';
import { ValueChangeHandler } from './FormEntry';

export interface ValidationProps<T> {
  onChange?: (value: T, errorMessage?: string) => void;
  validator?: Validator<T>;
  children: (onChange: ValueChangeHandler<T>) => React.ReactNode;
}

export interface ValidationState {
  errorMessage?: string;
}

export class Validation<T> extends React.Component<ValidationProps<T>, ValidationState> {

  onChange = (value: T) => {
    let errorMessage: string | undefined = undefined;
    if (this.props.validator) {
      errorMessage = this.props.validator(value);
    }
    if (this.props.onChange) {
      this.props.onChange(value, errorMessage);
    }
  }

  render() {
    return (
      <div>
        {this.props.children(this.onChange)}
        {this.state.errorMessage ? <ErrorMessage>{this.state.errorMessage}</ErrorMessage> : undefined}
      </div>
    );
  }
}
