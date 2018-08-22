import * as React from 'react';
import { getFloatStyle, FloatLevel } from '../../lib/getFloatStyle';
import { Color, DisplayProperty, CursorProperty } from 'csstype';
import { StyleConfig, ColorType } from '../../config/StyleConfig';
import { StyleContext } from '../../config/StyleContext';

export interface PaperProps {
  display?: DisplayProperty;
  children?: React.ReactNode;
  float?: FloatLevel;
  cursor?: CursorProperty;
  type?: ColorType;
  onClick?: React.MouseEventHandler;
  onKeyDown?: React.KeyboardEventHandler;
  tabIndex?: number;
}

function getPaper(config: StyleConfig, props: PaperProps) {
  const style = Object.assign(
    config.getColorContext(props.type || 'default'),
    {
      cursor: props.cursor,
      display: props.display || 'block',
    },
    getFloatStyle(props.float === undefined ? 2 : props.float));
  return <div style={style} tabIndex={props.tabIndex} onClick={props.onClick} onKeyDown={props.onKeyDown}>{props.children}</div>;
}

export const Paper = (props: PaperProps) => (
  <StyleContext.Consumer>
    {config => getPaper(config, props)}
  </StyleContext.Consumer>
);
