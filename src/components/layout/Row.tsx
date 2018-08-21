import * as React from 'react';
import radium from 'radium';
import { CursorProperty, FlexWrapProperty } from 'csstype';

export interface RowProps {
  children: React.ReactNode;
  cursor?: CursorProperty;
  hover?: object;
  wrap?: FlexWrapProperty;
  tabIndex?: number;
  onClick?: React.MouseEventHandler;
  onKeyDown?: React.KeyboardEventHandler;
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

function getStyle(props: RowProps) {
  return {
    display: 'flex',
    alignItems: 'center',
    cursor: props.cursor,
    flexWrap: props.wrap || 'nowrap',
    ':hover': props.hover,
  };
}
