import * as React from 'react';
import { ColorType } from '../../config/StyleConfig';

export type UpdateValue<C> = (newValue: C, hasError: boolean) => void;

export type ContextValue<C> = {
  value: C;
  update: UpdateValue<C>;
  disabled?: boolean;
  readonly?: boolean;
  type?: ColorType;
};

export const FormContext = React.createContext<ContextValue<any>>({
  value: {},
  update: () => {},
  disabled: false,
  readonly: false,
  type: undefined,
});
