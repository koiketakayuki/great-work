import * as React from 'react';
import radium from 'radium';
import { CursorProperty, FlexWrapProperty } from 'csstype';
import { ColorType, StyleConfig } from '../../config/StyleConfig';
import { StyleContext } from '../../config/StyleContext';

export interface RowProps {
  display?: 'flex' | 'inline-flex';
  type?: ColorType;
  children: React.ReactNode;
  cursor?: CursorProperty;
  hover?: object;
  wrap?: FlexWrapProperty;
  tabIndex?: number;
  onClick?: React.MouseEventHandler;
  onKeyDown?: React.KeyboardEventHandler;
}

function getStyle(config: StyleConfig, props: RowProps) {
  const colorContext = config.getColorContext(props.type);
  return {
    color: colorContext.color,
    background: colorContext.backgroundColor,
    display: props.display || 'flex',
    alignItems: 'center',
    cursor: props.cursor,
    flexWrap: props.wrap || 'nowrap',
    ':hover': props.hover,
  };
}

function getRow(config: StyleConfig, props: RowProps) {
  return (
    <div
      style={getStyle(config, props)}
      tabIndex={props.tabIndex}
      onClick={props.onClick}
      onKeyDown={props.onKeyDown}
    >{props.children}
    </div>
  );
}

export const Row = radium((props: RowProps) => (
  <StyleContext.Consumer>
    {config => getRow(config, props)}
  </StyleContext.Consumer>
));
