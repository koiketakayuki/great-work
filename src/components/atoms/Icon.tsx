import * as React from 'react';
import { StyleConfig, ColorType } from '../../config/StyleConfig';
import radium from 'radium';
import { Color } from 'csstype';
import { StyleContext } from '../../config/StyleContext';

export interface IconProps {
  name: string;
  type?: ColorType;
  hover?: React.CSSProperties;
}

function getIcon(config: StyleConfig, props: IconProps) {
  const style = {
    fontSize: config.fontSizeSmall,
    color: config.getColor(props.type),
    ':hover': props.hover,
  };
  return (
    <i className="material-icons" style={style}>{props.name}</i>
  );
}

export const Icon = radium((props: IconProps) => (
  <StyleContext.Consumer>
    {config => getIcon(config, props)}
  </StyleContext.Consumer>
));
