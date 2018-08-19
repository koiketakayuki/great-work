import * as React from 'react';
import { StyleConfig } from '../../config/StyleConfig';
import { Text } from './Text';

export interface ErrorMessageProp {
  onChange?: (value: string, errorMessage?: string) => void;
  validator?: (value: string) => string | undefined;
  config: StyleConfig;
  children: React.ReactNode;
}

export const ErrorMessage = (props: ErrorMessageProp) =>
  <Text color={props.config.errorFontColor} config={props.config}>{props.children}</Text>;
