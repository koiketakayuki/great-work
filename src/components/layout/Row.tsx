import * as React from 'react';
import radium from 'radium';
import { CursorProperty, FlexWrapProperty } from 'csstype';

export interface RowProps {
  children: React.ReactNode;
  cursor?: CursorProperty;
  hover?: object;
  wrap?: FlexWrapProperty;
  onClick?: React.MouseEventHandler;
}

export const Row = radium((props: RowProps) => (
  <div
    style={getStyle(props)}
    onClick={props.onClick}
  >{props.children}
  </div>
));

function getStyle(props: RowProps) {
  return {
    display: 'flex',
    alignItems: 'center',
    cursor: props.cursor,
    'flex-wrap': props.wrap || 'nowrap',
    ':hover': props.hover,
  };
}
