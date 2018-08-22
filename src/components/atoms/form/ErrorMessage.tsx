import * as React from 'react';
import { StyleConfig } from '../../../config/StyleConfig';
import { Text } from '../Text';

export interface ErrorMessageProps {
  onChange?: (value: string, errorMessage?: string) => void;
  validator?: (value: string) => string | undefined;
  config: StyleConfig;
  children: React.ReactNode;
}

export const ErrorMessage = (props: ErrorMessageProps) =>
  <Text fontSize={props.config.fontSizeSmall} color={props.config.getColor('error')} config={props.config}>{props.children}</Text>;
