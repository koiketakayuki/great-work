import * as React from 'react';
import { ColorType } from '../../config/StyleConfig';

export type UpdateValue<C, T> = (id: keyof C, value: T, errorMessage?: string) => void;

export type ContextValue<C, T> = {
  value: C,
  update: UpdateValue<C, T>;
  disabled?: boolean;
  readonly?: boolean;
  type?: ColorType;
};

export const FormContext = React.createContext<ContextValue<any, any>>({
  value: {},
  update: () => {},
  disabled: false,
  readonly: false,
  type: undefined,
});
