import * as React from 'react';
import radium from 'radium';
import { FormProps } from './Form';
import { Color } from 'csstype';
import { Paper } from '../Paper';
import { Container } from '../../layout/Container';
import { validatable } from './validatable';
import { StyleConfig } from '../../../config/StyleConfig';
import { StyleContext } from '../../../config/StyleContext';

/**
 * TextForm components
 */
export interface TextFormProps extends FormProps<string> {
  placeholder?: string;
}

export type TextType = 'text' | 'password' | 'longText';

/**
 * Helper class for TextForm
 */
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
          onBlur={this.props.onBlur}
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
        onBlur={this.props.onBlur}
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

const createTextFormBase = (textType: TextType) =>
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
              onBlur={this.props.onBlur}
              type={this.props.type}
              disabled={this.props.disabled}
              placeholder={this.props.placeholder}
            />
          </Container>
        </Paper>
      );
    }
  };

const TextFormBase = createTextFormBase('text');
const PasswordFormBase = createTextFormBase('password');
const TextAreaBase = createTextFormBase('longText');

export interface TextFormProps extends FormProps<string> {
  placeholder?: string;
}

export const TextForm = validatable<string, TextFormProps>((props, onChange, onBlur, hasError) => {
  return (
    <TextFormBase
      value={props.value}
      disabled={props.disabled}
      readonly={props.readonly}
      onChange={onChange}
      onBlur={onBlur}
      type={hasError ? 'error' : props.type}
    />
  );
});

export const PasswordForm = validatable<string, TextFormProps>((props, onChange, onBlur, hasError) => {
  return (
    <PasswordFormBase
      value={props.value}
      disabled={props.disabled}
      readonly={props.readonly}
      onChange={onChange}
      onBlur={onBlur}
      type={hasError ? 'error' : props.type}
    />
  );
});

export const TextArea = validatable<string, TextFormProps>((props, onChange, onBlur, hasError) => {
  return (
    <TextAreaBase
      value={props.value}
      disabled={props.disabled}
      readonly={props.readonly}
      onChange={onChange}
      onBlur={onBlur}
      type={hasError ? 'error' : props.type}
    />
  );
});
