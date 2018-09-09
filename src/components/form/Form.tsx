import { ColorType } from '../../config/StyleConfig';

export interface FormProps<T> {
  value: T;
  type?: ColorType;
  disabled?: boolean;
  readonly?: boolean;
  onChange?: ValueChangeHandler<T>;
  errorMessage?: string;
}

export type ValueChangeHandler<T> = (value: T) => void;

export type HasLabel = { label: string };

export type SelectOption<T> = { label: string, value: T };
export type HasSelectOptions<T> = { options: SelectOption<T>[] };
