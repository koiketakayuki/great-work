import * as React from 'react';
import radium from 'radium';
import { ButtonSkin } from './ButtonSkin';
import { ButtonFrame } from './ButtonFrame';

export type ButtonBaseProp = {
  skin: ButtonSkin;
  frame: ButtonFrame;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
};

export const ButtonBase = radium(class extends React.Component<ButtonBaseProp> {
  get style () {
    const style = {
      display: 'inline-block',
      fontSize: this.props.frame.fontSize,
      padding: this.props.frame.padding,
      lineHeight: this.props.frame.lineHeight,
      color: this.props.skin.color,
      background: this.props.skin.backgroundColor,
      cursor: this.props.skin.cursor,
      ':hover': this.props.skin[':hover'],
    };

    return style;
  }
  render() {
    return <div style={this.style} onClick={this.props.onClick}>{this.props.children}</div>;
  }
});
