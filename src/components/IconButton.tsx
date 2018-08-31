import * as React from 'react';
import { IconProps } from './Icon';
import { ButtonProps } from './Button';
import { StyleContext } from '../config/StyleContext';
import { StyleConfig } from '../config/StyleConfig';

export interface IconButtonProps extends ButtonProps {
  icon: React.ReactElement<IconProps>;
}

function getIconButton(config: StyleConfig, props: IconButtonProps) {
  const style = {
    color: config.getColor(props.disabled ? 'disabled' : props.type),
    cursor: props.disabled ? 'not-allowed' : 'pointer',
    padding: props.padding,
  };

  const onClick = () => {
    if (props.onClick && !props.disabled) {
      props.onClick();
    }
  };

  return (
    <div onClick={onClick} style={style}>
      {props.icon}
    </div>
  );
}

export function IconButton(props: IconButtonProps) {
  return (
    <StyleContext.Consumer>
      {config => getIconButton(config, props)}
    </StyleContext.Consumer>
  );
}
