import * as React from 'react';
import radium from 'radium';
import {
  FontSizeProperty,
  Color,
  LineHeightProperty,
  FontWeightProperty,
  TextDecorationProperty,
  CursorProperty,
} from 'csstype';
import { StyleConfig } from '../../config/StyleConfig';

export interface TextProps {
  tag?: 'div' | 'a' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
  fontSize?: FontSizeProperty<string>;
  lineHeight?: LineHeightProperty<string>;
  fontWeight?: FontWeightProperty;
  decoration?: TextDecorationProperty;
  cursor?: CursorProperty;
  color?: Color;
  href?: string;
  target?: string;
  hover?: object;
  config: StyleConfig;
}

export const Text = radium(class extends React.Component<TextProps> {

  get Tag(): string {
    return this.props.tag || 'div';
  }

  get style () {
    const config = this.props.config;
    const style = {
      display: 'block',
      fontSize: this.props.fontSize || config.fontSizeMedium,
      fontWeight: this.props.fontWeight,
      lineHeight: this.props.lineHeight || 1.0,
      textDecoration: this.props.decoration || 'none',
      cursor: this.props.cursor || 'inherit',
      color: this.props.color || 'inherit',
      margin: '0',
      ':hover': this.props.hover,
    };

    return style;
  }

  render() {
    return <this.Tag style={this.style} href={this.props.href} target={this.props.target}>{this.props.children}</this.Tag>;
  }
});
