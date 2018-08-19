import * as React from 'react';
import { Text, TextProp } from './Text';
import { StyleConfig } from '../../config/StyleConfig';

export type HeadingLevel = '1' | '2' | '3' | '4' | '5';

export interface HeadingProp {
  level: HeadingLevel;
  children: React.ReactNode;
  config: StyleConfig;
}

export const Heading = (props: HeadingProp) =>
  <Text {...(getHeadingStyle(props.config, props.level))}>{props.children}</Text>;

function getHeadingStyle(config: StyleConfig, level: HeadingLevel): TextProp {
  if (level === '2') {
    return getHeading2Style(config);
  }

  if (level === '3') {
    return getHeading3Style(config);
  }

  if (level === '4') {
    return getHeading4Style(config);
  }

  if (level === '5') {
    return getHeading5Style(config);
  }

  return getHeading1Style(config);
}

function getHeading1Style(config: StyleConfig): TextProp {
  return {
    tag: 'h1',
    fontSize: config.heading1,
    lineHeight: 1.0,
    fontWeight: 'bold',
    decoration: 'none',
    cursor: 'default',
    color: config.fontColor,
  };
}

function getHeading2Style(config: StyleConfig): TextProp {
  return {
    tag: 'h2',
    fontSize: config.heading2,
    lineHeight: 1.0,
    fontWeight: 'bold',
    decoration: 'none',
    cursor: 'default',
    color: config.fontColor,
  };
}

function getHeading3Style(config: StyleConfig): TextProp {
  return {
    tag: 'h3',
    fontSize: config.heading3,
    lineHeight: 1.0,
    fontWeight: 'bold',
    decoration: 'none',
    cursor: 'default',
    color: config.fontColor,
  };
}

function getHeading4Style(config: StyleConfig): TextProp {
  return {
    tag: 'h4',
    fontSize: config.heading4,
    lineHeight: 1.0,
    fontWeight: 'bold',
    decoration: 'none',
    cursor: 'default',
    color: config.fontColor,
  };
}

function getHeading5Style(config: StyleConfig): TextProp {
  return {
    tag: 'h5',
    fontSize: config.heading5,
    lineHeight: 1.0,
    fontWeight: 'bold',
    decoration: 'none',
    cursor: 'default',
    color: config.fontColor,
  };
}
