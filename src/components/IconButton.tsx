import * as React from 'react';
import { Icon } from './Icon';
import { ColorType } from '../config/StyleConfig';

interface IconButtonProps {
  name: string;
  type?: ColorType;
  onClick?: React.MouseEventHandler;
}

export function IconButton(props: IconButtonProps) {
  return (
    <div onClick={props.onClick} style={{ cursor: 'pointer' }}>
      <Icon name={props.name} type={props.type}/>
    </div>
  );
}
