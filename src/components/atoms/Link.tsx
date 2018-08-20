import * as React from 'react';
import { Text, TextProps } from './Text';
import { StyleConfig } from '../../config/StyleConfig';

export interface LinkProps {
  href: string;
  target?: string;
  disabled?: boolean;
  children: React.ReactNode;
  config: StyleConfig;
}

export const Link = (props: LinkProps) =>
  <Text {...(getLinkStyle(props.config, props.href, props.target, props.disabled))}>{props.children}</Text>;

function getLinkStyle(config: StyleConfig, href: string, target?: string, disabled?: boolean): TextProps {
  if (disabled) {
    return getDisabledStyle(config);
  }

  return getDefaultStyle(config, href, target);
}

function getDisabledStyle(config: StyleConfig): TextProps {
  return {
    config,
    tag: 'div',
    fontSize: config.fontSizeMedium,
    fontWeight: 'normal',
    decoration: 'none',
    cursor: 'not-allowed',
    color: config.disabledFontColor,
  };
}

function getDefaultStyle(config: StyleConfig, href: string, target?: string): TextProps {
  return {
    config,
    href,
    target,
    tag: 'a',
    fontSize: config.fontSizeMedium,
    fontWeight: 'normal',
    decoration: 'underline',
    cursor: 'pointer',
    color: config.fontColor,
    hover: {
      opacity: 0.8,
    },
  };
}
