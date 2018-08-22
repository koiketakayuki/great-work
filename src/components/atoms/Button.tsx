import * as React from 'react';
import { StyleConfig, ColorType } from '../../config/StyleConfig';
import { Paper } from './Paper';
import { Container } from '../layout/Container';
import { FloatLevel } from '../../lib/getFloatStyle';
import { PaddingProperty } from 'csstype';

export interface ButtonProps {
  padding?: PaddingProperty<string>;
  onClick?: Function;
  disabled?: boolean;
  float?: FloatLevel;
  type?: ColorType;
  config: StyleConfig;
}

export class Button extends React.Component<ButtonProps> {

  onClick = (e: React.MouseEvent) => {
    if (this.props.onClick && !this.props.disabled) {
      this.props.onClick();
    }
  }

  onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && this.props.onClick) {
      this.props.onClick();
    }
  }

  render() {
    return (
      <Paper
        display="inline-block"
        float={this.props.float}
        onClick={this.onClick}
        onKeyDown={this.onKeyDown}
        cursor={this.props.disabled ? 'not-allowed' : 'pointer'}
        type={this.props.disabled ? 'disabled' : (this.props.type || 'primary')}
        tabIndex={0}
        config={this.props.config}
      >
        <Container padding={this.props.padding || '8px'}>
          {this.props.children}
        </Container>
      </Paper>
    );
  }
}
