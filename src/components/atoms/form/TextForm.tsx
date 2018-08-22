import * as React from 'react';
import radium from 'radium';
import { FormProps, FormState } from './Form';
import { Color } from 'csstype';
import { Paper } from '../Paper';
import { Container } from '../../layout/Container';
import { validatable } from './validatable';

/**
 * TextForm components
 */
export interface TextFormProps extends FormProps<string> {
  placeholder?: string;
  onBlur?: React.FocusEventHandler;
}

export type TextType = 'text' | 'password' | 'longText';

/**
 * Helper class for TextForm
 */
const TextInput = radium(class extends React.Component<TextFormProps & { textType: TextType }> {

  getColor(): Color {
    if (this.props.disabled) {
      return this.props.config.getColor('disabled');
    }

    return this.props.config.getColor(this.props.type || 'default');
  }

  get style() {
    return {
      color: this.getColor(),
      display: 'block',
      border: 'none',
      padding: '0',
      margin: '0',
      outline: 'none',
      width: '100%',
      background: 'transparent',
      fontSize: this.props.config.fontSizeMedium,
      ':focus': {
        opacity: 0.8,
      },
    };
  }

  onChange = (e: React.ChangeEvent<any>) => {
    const value: string = e.target.value;

    if (this.props.onChange && !this.props.disabled) {
      this.props.onChange(value);
    }
  }

  render() {
    if (this.props.textType === 'text' || this.props.textType === 'password') {
      return (
        <input
          type={this.props.textType}
          value={this.props.value}
          style={this.style}
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
        style={this.style}
        onChange={this.onChange}
        onBlur={this.props.onBlur}
        disabled={this.props.disabled}
        placeholder={this.props.placeholder}
      />
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
          type={this.props.disabled ? 'disabled' : this.props.type}
          config={this.props.config}
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
              config={this.props.config}
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
      config={props.config}
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
      config={props.config}
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
      config={props.config}
    />
  );
});
