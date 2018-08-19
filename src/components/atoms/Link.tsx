import * as React from 'react';
import { Text, TextProp } from './Text';
import { StyleConfig } from '../../config/StyleConfig';

export interface LinkProp {
  href: string;
  target?: string;
  disabled?: boolean;
  children: React.ReactNode;
  config: StyleConfig;
}

export const Link = (props: LinkProp) =>
  <Text {...(getLinkStyle(props.config, props.href, props.target, props.disabled))}>{props.children}</Text>;

function getLinkStyle(config: StyleConfig, href: string, target?: string, disabled?: boolean): TextProp {
  if (disabled) {
    return getDisabledStyle(config);
  }

  return getDefaultStyle(config, href, target);
}

function getDisabledStyle(config: StyleConfig): TextProp {
  return {
    config,
    tag: 'div',
    fontSize: config.fontSizeMedium,
    lineHeight: 1.0,
    fontWeight: 'normal',
    decoration: 'none',
    cursor: 'not-allowed',
    color: config.disabledFontColor,
  };
}

function getDefaultStyle(config: StyleConfig, href: string, target?: string): TextProp {
  return {
    config,
    href,
    target,
    tag: 'a',
    fontSize: config.fontSizeMedium,
    lineHeight: 1.0,
    fontWeight: 'normal',
    decoration: 'underline',
    cursor: 'pointer',
    color: config.fontColor,
    hover: {
      opacity: 0.8,
    },
  };
}
