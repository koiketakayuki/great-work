import * as React from 'react';
import { FormProps } from './Form';
import { ErrorMessage } from './ErrorMessage';

export interface WithErrorMessageProps<T, P extends FormProps<T>> {
  children: (props: P) => React.ReactNode;
}

export function WithErrorMessage<T, P extends FormProps<T>>(props: P & WithErrorMessageProps<T, P>) {
  return (
    <div>
      {props.children(getFilteredProps<T, P>(props))}
      {props.errorMessage ? <ErrorMessage>{props.errorMessage}</ErrorMessage> : undefined}
    </div>
  );
}

function getFilteredProps<T, P extends FormProps<T>>(props: P): P {
  const hasError = !!props.errorMessage;
  const originalProps: P = props;

  const newProps: any = {};
  for (const key in originalProps) {
    newProps[key] = originalProps[key];

    newProps.type = hasError ? 'error' : originalProps.type;
  }

  return newProps as P;
}
