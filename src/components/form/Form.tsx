import { ColorType } from '../../config/StyleConfig';

export interface FormProps<T> {
  value: T;
  type?: ColorType;
  disabled?: boolean;
  readonly?: boolean;
  validator?: Validator<T>;
  onChange?: ValueChangeHandler<T>;
}

export type ValueChangeHandler<T> = (value: T, errorMessage?: string) => void;

export type Validator<T> = (value: T) => string | undefined;

export type HasLabel = { label: string };

export type SelectOption<T> = { label: string, value: T };
export type HasSelectOptions<T> = { options: SelectOption<T>[] };
