import * as React from 'react';
import { FormProps } from './Form';
import radium from 'radium';
import { StyleConfig } from '../../config/StyleConfig';
import { Color } from 'csstype';
import { StyleContext } from '../../config/StyleContext';
import { Paper } from '../Paper';
import { Container } from '../layout/Container';

export type TextType = 'text' | 'longText' | 'password';

export interface TextFormProps extends FormProps<string> {
  placeholder?: string;
}

const TextInput = radium(class extends React.Component<TextFormProps & { textType: TextType }> {

  onChange = (e: React.ChangeEvent<any>) => {
    const value: string = e.target.value;

    if (this.props.onChange && !this.props.disabled) {
      this.props.onChange(value);
    }
  }

  getColor(config: StyleConfig): Color {
    if (this.props.disabled) {
      return config.getColor('disabled');
    }

    return config.getColor(this.props.type || 'default');
  }

  getStyle(config: StyleConfig) {
    return {
      color: this.getColor(config),
      display: 'block',
      border: 'none',
      padding: '0',
      margin: '0',
      outline: 'none',
      width: '100%',
      background: 'transparent',
      cursor: this.props.disabled ? 'not-allowed' : undefined,
      fontSize: config.fontSizeMedium,
      ':focus': {
        opacity: 0.8,
      },
    };
  }

  getForm(config: StyleConfig) {
    if (this.props.textType === 'text' || this.props.textType === 'password') {
      return (
        <input
          type={this.props.textType}
          value={this.props.value}
          style={this.getStyle(config)}
          onChange={this.onChange}
          disabled={this.props.disabled}
          placeholder={this.props.placeholder}
        />
      );
    }
    return (
      <textarea
        value={this.props.value}
        style={this.getStyle(config)}
        onChange={this.onChange}
        disabled={this.props.disabled}
        placeholder={this.props.placeholder}
      />
    );
  }

  render() {
    return (
      <StyleContext.Consumer>
        {config => this.getForm(config)}
      </StyleContext.Consumer>
    );
  }
});

export const createTextForm = (textType: TextType) =>
  class extends React.Component<TextFormProps> {
    render() {
      if (this.props.readonly) {
        return <div>{this.props.value}</div>;
      }

      return (
        <Paper
          type={this.props.disabled ? 'disabled' : (this.props.type === 'error' ? 'error' : undefined)}
          cursor={this.props.disabled ? 'not-allowed' : undefined}
        >
          <Container>
            <TextInput
              textType={textType}
              value={this.props.value}
              onChange={this.props.onChange}
              type={this.props.type}
              disabled={this.props.disabled}
              placeholder={this.props.placeholder}
            />
          </Container>
        </Paper>
      );
    }
  };
