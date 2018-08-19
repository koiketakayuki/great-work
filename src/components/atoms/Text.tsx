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

export interface TextProp {
  tag?: 'div' | 'a' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
  fontSize: FontSizeProperty<string>;
  lineHeight: LineHeightProperty<string>;
  fontWeight: FontWeightProperty;
  decoration: TextDecorationProperty;
  cursor: CursorProperty;
  color: Color;
  href?: string;
  target?: string;
  hover?: object;
}

export const Text = radium(class extends React.Component<TextProp> {

  get Tag(): string {
    return this.props.tag || 'div';
  }

  get style () {
    const style = {
      display: 'block',
      fontSize: this.props.fontSize,
      fontWeight: this.props.fontWeight,
      lineHeight: this.props.lineHeight,
      textDecoration: this.props.decoration,
      cursor: this.props.cursor,
      color: this.props.color,
      margin: '0',
      ':hover': this.props.hover,
    };

    return style;
  }

  render() {
    return <this.Tag style={this.style} href={this.props.href} target={this.props.target}>{this.props.children}</this.Tag>;
  }
});
