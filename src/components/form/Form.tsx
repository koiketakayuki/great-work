import { ColorType } from '../../config/StyleConfig';

export interface FormProps<T> {
  value: T;
  type?: ColorType;
  disabled?: boolean;
  readonly?: boolean;
  onChange?: ValueChangeHandler<T>;
}

export type ValueChangeHandler<T> = (value: T) => void;
export type ValidationHandler<T> = (value: T, errorMessage?: string) => void;

/**
 * Validation function
 */
export type Validator<T> = (value: T) => string | undefined;

/**
 * Used when component has its label
 */
export type HasLabel = { label: string };

/**
 * Select components
 */
export type SelectOption<T> = { label: string, value: T };
export type HasSelectOptions<T> = { options: SelectOption<T>[] };
