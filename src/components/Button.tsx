import * as React from 'react';
import { ColorType } from '../config/StyleConfig';
import { Paper } from './Paper';
import { Container } from './layout/Container';
import { FloatLevel } from '../lib/getFloatStyle';
import { PaddingProperty } from 'csstype';

export interface ButtonProps {
  padding?: PaddingProperty<string>;
  onClick?: () => void;
  disabled?: boolean;
  float?: FloatLevel;
  type?: ColorType;
}

export class Button extends React.Component<ButtonProps> {

  onClick = () => {
    if (this.props.onClick && !this.props.disabled) {
      this.props.onClick();
    }
  }

  onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && this.props.onClick) {
      this.onClick();
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
      >
        <Container padding={this.props.padding || '8px'}>
          {this.props.children}
        </Container>
      </Paper>
    );
  }
}
