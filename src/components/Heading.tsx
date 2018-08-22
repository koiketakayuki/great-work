import * as React from 'react';
import { Text, TextProps, TextTag } from './Text';
import { StyleConfig } from '../config/StyleConfig';
import { StyleContext } from '../config/StyleContext';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5;

export interface HeadingProps {
  tag?: TextTag;
  level: HeadingLevel;
  children: React.ReactNode;
  config: StyleConfig;
}

export const Heading = (props: HeadingProps) => (
  <StyleContext.Consumer>
    {config => <Text {...(getHeadingStyle(config, props))}>{props.children}</Text>}
  </StyleContext.Consumer>
);

function getHeadingStyle(config: StyleConfig, props: HeadingProps): TextProps {
  if (props.level === 2) {
    return getHeading2Style(config, props);
  }

  if (props.level === 3) {
    return getHeading3Style(config, props);
  }

  if (props.level === 4) {
    return getHeading4Style(config, props);
  }

  if (props.level === 5) {
    return getHeading5Style(config, props);
  }

  return getHeading1Style(config, props);
}

function getHeading1Style(config: StyleConfig, props: HeadingProps): TextProps {
  return {
    tag: props.tag || 'h1',
    fontSize: config.heading1,
    fontWeight: 'bold',
    decoration: 'none',
  };
}

function getHeading2Style(config: StyleConfig, props: HeadingProps): TextProps {
  return {
    tag: props.tag || 'h2',
    fontSize: config.heading2,
    fontWeight: 'bold',
    decoration: 'none',
  };
}

function getHeading3Style(config: StyleConfig, props: HeadingProps): TextProps {
  return {
    tag: props.tag || 'h3',
    fontSize: config.heading3,
    fontWeight: 'bold',
    decoration: 'none',
  };
}

function getHeading4Style(config: StyleConfig, props: HeadingProps): TextProps {
  return {
    tag: props.tag || 'h4',
    fontSize: config.heading4,
    fontWeight: 'bold',
    decoration: 'none',
  };
}

function getHeading5Style(config: StyleConfig, props: HeadingProps): TextProps {
  return {
    tag: props.tag || 'h5',
    fontSize: config.heading5,
    lineHeight: 1.0,
    fontWeight: 'bold',
    decoration: 'none',
    cursor: 'default',
  };
}
