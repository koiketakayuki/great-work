import * as React from 'react';
import { Text, TextProps } from './Text';
import { StyleConfig } from '../config/StyleConfig';
import { StyleContext } from '../config/StyleContext';

export interface LinkProps {
  href: string;
  target?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

export const Link = (props: LinkProps) => (
  <StyleContext.Consumer>
    {config => <Text {...(getLinkStyle(config, props.href, props.target, props.disabled))}>{props.children}</Text>}
  </StyleContext.Consumer>
);

function getLinkStyle(config: StyleConfig, href: string, target?: string, disabled?: boolean): TextProps {
  if (disabled) {
    return getDisabledStyle(config);
  }

  return getDefaultStyle(config, href, target);
}

function getDisabledStyle(config: StyleConfig): TextProps {
  return {
    tag: 'div',
    fontSize: config.fontSizeMedium,
    fontWeight: 'normal',
    decoration: 'none',
    cursor: 'not-allowed',
    type: 'disabled',
  };
}

function getDefaultStyle(config: StyleConfig, href: string, target?: string): TextProps {
  return {
    href,
    target,
    tag: 'a',
    fontSize: config.fontSizeMedium,
    fontWeight: 'normal',
    decoration: 'underline',
    cursor: 'pointer',
    type: 'default',
    hover: {
      opacity: 0.8,
    },
  };
}
