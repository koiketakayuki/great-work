import * as React from 'react';
import radium from 'radium';
import { CursorProperty } from 'csstype';

export interface RowProps {
  children: React.ReactNode;
  cursor?: CursorProperty;
  hover?: object;
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
    ':hover': props.hover,
  };
}
