import * as React from 'react';
import { Text } from '../Text';
import { StyleContext } from '../../config/StyleContext';

export interface ErrorMessageProps {
  onChange?: (value: string, errorMessage?: string) => void;
  validator?: (value: string) => string | undefined;
  children: React.ReactNode;
}

export const ErrorMessage = (props: ErrorMessageProps) => (
  <StyleContext.Consumer>
    {config => <Text fontSize={config.fontSizeSmall} type="error">{props.children}</Text>}
  </StyleContext.Consumer>
);
