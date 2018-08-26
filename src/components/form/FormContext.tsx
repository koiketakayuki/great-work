import * as React from 'react';
import { ColorType } from '../../config/StyleConfig';

export type UpdateValue<T> = (id: string, entryValue: T, hasError: boolean) => void;

export type ContextValue<T> = {
  update: UpdateValue<T>;
  disabled?: boolean;
  readonly?: boolean;
  type?: ColorType;
};

export const FormContext = React.createContext<ContextValue<any>>({
  update: () => {},
  disabled: false,
  readonly: false,
  type: undefined,
});
