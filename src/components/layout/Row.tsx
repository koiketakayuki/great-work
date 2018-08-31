import * as React from 'react';
import radium from 'radium';
import { CursorProperty, FlexWrapProperty, Color } from 'csstype';
import { ColorType, StyleConfig } from '../../config/StyleConfig';

export interface RowProps {
  display?: 'flex' | 'inline-flex';
  color?: Color;
  background?: Color;
  children: React.ReactNode;
  cursor?: CursorProperty;
  hover?: object;
  wrap?: FlexWrapProperty;
  tabIndex?: number;
  onClick?: React.MouseEventHandler;
  onKeyDown?: React.KeyboardEventHandler;
}

function getStyle(props: RowProps) {
  return {
    color: props.color,
    background: props.background,
    display: props.display || 'flex',
    alignItems: 'center',
    cursor: props.cursor,
    flexWrap: props.wrap || 'nowrap',
    ':hover': props.hover,
  };
}

export const Row = radium((props: RowProps) => (
  <div
    style={getStyle(props)}
    tabIndex={props.tabIndex}
    onClick={props.onClick}
    onKeyDown={props.onKeyDown}
  >{props.children}
  </div>
));
