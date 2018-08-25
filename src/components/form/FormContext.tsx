import * as React from 'react';

export type UpdateValue<T> = (id: string, entryValue: T, hasError: boolean) => void;

export type ContextValue<T> = {
  update: UpdateValue<T>;
  disabled?: boolean;
  readonly?: boolean;
};

export const FormContext = React.createContext<ContextValue<any>>({
  update: (id: string, entryValue: any, hasError: boolean) => {},
  disabled: false,
  readonly: false,
});
