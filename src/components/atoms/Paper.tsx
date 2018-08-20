import * as React from 'react';
import { getFloatStyle, FloatLevel } from '../../lib/getFloatStyle';
import { Color, DisplayProperty, CursorProperty } from 'csstype';
import { StyleConfig, ColorType } from '../../config/StyleConfig';

export interface PaperProps {
  display?: DisplayProperty;
  children?: React.ReactNode;
  float?: FloatLevel;
  cursor?: CursorProperty;
  type?: ColorType;
  onClick?: React.MouseEventHandler;
  config: StyleConfig;
}

export const Paper = (props: PaperProps) =>
  <div style={getStyle(props)} onClick={props.onClick}>{props.children}</div>;

function getStyle(props: PaperProps): object {
  return Object.assign(
    props.config.getColorContext(props.type || 'default'),
    {
      cursor: props.cursor,
      display: props.display || 'block',
    },
    getFloatStyle(props.float || '2'));
}
