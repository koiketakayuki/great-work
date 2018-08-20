import * as React from 'react';
import { StyleConfig, ColorType } from '../../config/StyleConfig';
import { Paper } from '../atoms/Paper';
import { Container } from '../layout/Container';
import { FloatLevel } from '../../lib/getFloatStyle';
import { PaddingProperty } from 'csstype';

export type ButtonProps = {
  padding?: PaddingProperty<string>;
  onClick?: React.MouseEventHandler
  disabled?: boolean;
  float?: FloatLevel;
  type?: ColorType;
  config: StyleConfig
};

export class Button extends React.Component<ButtonProps> {
  render() {
    return (
      <Paper
        display="inline-block"
        float={this.props.float}
        onClick={this.props.onClick}
        cursor={this.props.disabled ? 'not-allowed' : 'pointer'}
        type={this.props.disabled ? 'disabled' : (this.props.type || 'primary')}
        config={this.props.config}
      >
        <Container padding={this.props.padding || '8px'}>
          {this.props.children}
        </Container>
      </Paper>
    );
  }
}
