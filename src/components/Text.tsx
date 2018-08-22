import * as React from 'react';
import radium from 'radium';
import {
  FontSizeProperty,
  LineHeightProperty,
  FontWeightProperty,
  TextDecorationProperty,
  CursorProperty,
} from 'csstype';
import { StyleConfig, ColorType } from '../config/StyleConfig';
import { StyleContext } from '../config/StyleContext';

export type TextTag = 'div' | 'a' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5';

export interface TextProps {
  tag?: TextTag;
  fontSize?: FontSizeProperty<string>;
  lineHeight?: LineHeightProperty<string>;
  fontWeight?: FontWeightProperty;
  decoration?: TextDecorationProperty;
  cursor?: CursorProperty;
  type?: ColorType;
  href?: string;
  target?: string;
  hover?: object;
}

export const Text = radium(class extends React.Component<TextProps> {

  get Tag(): string {
    return this.props.tag || 'div';
  }

  getStyle (config: StyleConfig) {
    const style = {
      display: 'block',
      fontSize: this.props.fontSize || config.fontSizeMedium,
      fontWeight: this.props.fontWeight,
      lineHeight: this.props.lineHeight || 1.0,
      textDecoration: this.props.decoration || 'none',
      cursor: this.props.cursor || 'inherit',
      color: config.getColor(this.props.type),
      margin: '0',
      ':hover': this.props.hover,
    };

    return style;
  }

  getText(config: StyleConfig) {
    return <this.Tag style={this.getStyle(config)} href={this.props.href} target={this.props.target}>{this.props.children}</this.Tag>;
  }

  render() {
    return (
      <StyleContext.Consumer>
        {config => this.getText(config)}
      </StyleContext.Consumer>
    );
  }
});
