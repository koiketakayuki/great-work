import * as React from 'react';
import { StyleConfig, ColorType } from '../../../config/StyleConfig';

/**
 * Props of primitive Form component which doesn't have validator
 */
export interface FormBaseProps<T> {
  value: T;
  config: StyleConfig;
  type?: ColorType;
  disabled?: boolean;
  readonly?: boolean;
  onChange?: (value: T) => void;
  onBlur?: React.FocusEventHandler;
}

/**
 * Props of Form component which can have validator
 *
 * Typically, form is composed of FormBase + Validator
 */
export interface FormProps<T> {
  value: T;
  config: StyleConfig;
  type?: ColorType;
  disabled?: boolean;
  readonly?: boolean;
  onChange?: (value: T, errorMessage?: string) => void;
  onBlur?: React.FocusEventHandler;
  validator?: Validator<T>;
}

/**
 * State of Form
 */
export interface FormState {
  errorMessage: string | undefined;
  validationActive: boolean;
}

/**
 * Validation function
 */
export type Validator<T> = (value: T) => string | undefined;

/**
 * Used when component has its label
 */
export type HasLabel = { label: string };
