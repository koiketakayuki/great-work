import * as React from 'react';
import radium from 'radium';
import { StyleConfig, ColorType } from '../../config/StyleConfig';
import { IconText } from '../molecules/IconText';
import { Row } from '../layout/Row';
import { Paper } from './Paper';
import { Container } from '../layout/Container';

/**
 * Form Components props
 */
export interface FormProps<T> {
  value: T;
  disabled?: boolean;
  readonly?: boolean;
  onChange?: (value: T) => void;
  type?: ColorType;
  config: StyleConfig;
}

/**
 * Toggle Components
 */
type HasLabel = { label: string };
export type ToggleProps = FormProps<boolean> & HasLabel;

const createIconToggle = (activeIcon: string, inactiveIcon: string) =>
  class extends React.Component<ToggleProps> {

    getColor() {
      if (this.props.disabled) {
        return this.props.config.disabledFontColor;
      }

      if (this.props.value) {
        return this.props.config.getColor(this.props.type);
      }
    }

    onClick = () => {
      if (this.props.onChange && !this.props.disabled) {
        const newValue: boolean = !this.props.value;
        this.props.onChange(newValue);
      }
    }

    render() {
      return (
        <IconText
          icon={this.props.value ? activeIcon : inactiveIcon}
          cursor={this.props.disabled ? 'not-allowed' : 'pointer'}
          text={this.props.label}
          color={this.getColor()}
          onClick={this.onClick}
          hover={this.props.disabled ? {} : { color: this.props.config.getColor(this.props.type) }}
          config={this.props.config}
        />
      );
    }
  };

export const RadioButton = createIconToggle('radio_button_checked', 'radio_button_unchecked');
export const CheckBox = createIconToggle('check_box', 'check_box_outline_blank');

/**
 * Select components
 */
export type SelectOption<T> = { label: string, value: T };
type HasSelectOptions<T> = { options: SelectOption<T>[] };

export type SingleSelectFormProps<T> = FormProps<T> & HasSelectOptions<T>;
export type MultipleSelectFormProps<T> = FormProps<T[]> & HasSelectOptions<T>;

export class RadioButtons<T> extends React.Component<SingleSelectFormProps<T>> {

  private onChange = (newValue: T) => {
    if (this.props.onChange) {
      this.props.onChange(newValue);
    }
  }

  private getRadioButtons() {
    const config = this.props.config;
    const currentValue = this.props.value;

    return this.props.options.map((o: SelectOption<T>) => {
      const onChange = () => this.onChange(o.value);
      return (
        <RadioButton
          key={o.label}
          value={currentValue === o.value}
          label={o.label}
          onChange={onChange}
          disabled={this.props.disabled}
          config={config}
        />
      );
    });
  }

  render() {
    return (
      <Row wrap="wrap">
        {this.getRadioButtons()}
      </Row>
    );
  }
}

export class CheckList<T> extends React.Component<MultipleSelectFormProps<T>> {

  private onChange = (targetValue: T) => {
    const currentValue = this.props.value;

    const newValue: T[] = this.props.options.reduce(
      (acc: T[], o: SelectOption<T>) => {
        const value = o.value;
        if ((currentValue.indexOf(value) > -1 && value !== targetValue) || (currentValue.indexOf(value) === -1 && value === targetValue)) {
          acc.push(value);
        }

        return acc;
      },
      []);

    if (this.props.onChange) {
      this.props.onChange(newValue);
    }
  }

  private getCheckBoxes() {
    const config = this.props.config;
    const currentValue = this.props.value;

    return this.props.options.map((o: SelectOption<T>) => {
      const onChange = () => this.onChange(o.value);
      return (
        <CheckBox
          key={o.label}
          value={currentValue.indexOf(o.value) > -1}
          label={o.label}
          onChange={onChange}
          disabled={this.props.disabled}
          config={config}
        />
      );
    });
  }

  render() {
    return (
      <Row wrap="wrap">
        {this.getCheckBoxes()}
      </Row>
    );
  }
}

/**
 * TextForm components
 */
export type TextFormProps = FormProps<string>;
type TextType = 'text' | 'password' | 'longText';

/**
 * Helper class for TextForm
 */
const TextFormInner = radium(class extends React.Component<TextFormProps & { textType: TextType }> {

  get style() {
    return {
      color: this.props.config.getColor(this.props.type || 'default'),
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

    if (this.props.onChange !== undefined) {
      this.props.onChange(value);
    }
  }

  render() {
    if (this.props.textType === 'text') {
      return <input type="text" value={this.props.value} style={this.style} onChange={this.onChange}/>;
    }

    if (this.props.textType === 'password') {
      return <input type="password" value={this.props.value} style={this.style} onChange={this.onChange}/>;
    }

    return <textarea value={this.props.value} style={this.style} onChange={this.onChange}/>;
  }
});

const createTextForm = (textType: TextType) =>
  class extends React.Component<TextFormProps> {
    render() {
      if (this.props.readonly) {
        return <div>{this.props.value}</div>;
      }

      return (
        <Paper config={this.props.config}>
          <Container>
            <TextFormInner
              textType={textType}
              value={this.props.value}
              onChange={this.props.onChange}
              type={this.props.type}
              disabled={this.props.disabled}
              config={this.props.config}
            />
          </Container>
        </Paper>
      );
    }
  };

export const TextForm = createTextForm('text');
export const PasswordForm = createTextForm('password');
export const TextArea = createTextForm('longText');
