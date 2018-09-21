import * as React from 'react';
import { ColorType } from '../config/StyleConfig';
import { Paper } from './Paper';
import { Container } from './layout/Container';
import { PaddingProperty } from 'csstype';
import { ElevationLevel } from './wrapper/Elevation';
import { Ripple } from './wrapper/Ripple';

export interface ButtonProps {
  padding?: PaddingProperty<string>;
  onClick?: () => void;
  disabled?: boolean;
  elevation?: ElevationLevel;
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
      <Ripple onClick={this.onClick} initialRadius={20}>
        <Paper
          display="inline-block"
          elevation={this.props.elevation}
          onKeyDown={this.onKeyDown}
          cursor={this.props.disabled ? 'not-allowed' : 'pointer'}
          type={this.props.disabled ? 'disabled' : (this.props.type || 'primary')}
          tabIndex={0}
        >
          <Container padding={this.props.padding}>
            {this.props.children}
          </Container>
        </Paper>
      </Ripple>
    );
  }
}
