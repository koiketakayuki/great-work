import * as React from 'react';
import { StyleConfig } from '../../config/StyleConfig';
import radium from 'radium';
import { Color } from 'csstype';

export interface IconProps {
  name: string;
  color?: Color;
  hover?: React.CSSProperties;
  config: StyleConfig;
}

export const Icon = radium((props: IconProps) => (
  <i className="material-icons" style={getStyle(props)}>{props.name}</i>
));

function getStyle(props: IconProps) {
  return {
    fontSize: props.config.fontSizeSmall,
    color: props.color,
    ':hover': props.hover,
  };
}
