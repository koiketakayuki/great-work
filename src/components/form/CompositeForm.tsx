import * as React from 'react';
import { Validator } from './Form';
import { StyleConfig } from '../../config/StyleConfig';

export interface FormEntryProps<T> {
  value: T;
  label: string;
  config: StyleConfig;
  validator?: Validator<T>;
}

export interface FormEntry<T> extends React.Component<FormEntryProps<T>> {}
