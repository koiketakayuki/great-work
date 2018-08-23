import * as React from 'react';
import { FormBaseProps, HasLabel } from './Form';
import { IconText } from '../IconText';
import { validatable } from './validatable';
import { StyleConfig } from '../../config/StyleConfig';
import { StyleContext } from '../../config/StyleContext';

export type ToggleFormProps = FormBaseProps<boolean> & HasLabel;

const createIconToggle = (activeIcon: string, inactiveIcon: string) =>
  class extends React.Component<ToggleFormProps> {

    getColorType() {
      if (this.props.disabled) {
        return 'disabled';
      }

      if (this.props.value) {
        return this.props.type;
      }
    }

    onClick = () => {
      if (this.props.onChange && !this.props.disabled) {
        const newValue: boolean = !this.props.value;
        this.props.onChange(newValue);
      }
    }

    onKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        this.onClick();
      }
    }

    getForm(config: StyleConfig) {
      return (
        <IconText
          icon={this.props.value ? activeIcon : inactiveIcon}
          cursor={this.props.disabled ? 'not-allowed' : 'pointer'}
          text={this.props.label}
          type={this.getColorType()}
          onClick={this.onClick}
          onKeyDown={this.onKeyDown}
          hover={this.props.disabled ? {} : { color: config.getColor(this.props.type) }}
          tabIndex={this.props.disabled ? undefined : 0}
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
  };

export const RadioButtonBase = createIconToggle('radio_button_checked', 'radio_button_unchecked');
export const CheckBoxBase = createIconToggle('check_box', 'check_box_outline_blank');

export const CheckBox = validatable<boolean, ToggleFormProps>((props, onChange, onBlur, hasError) => {
  return (
    <CheckBoxBase
      label={props.label}
      value={props.value}
      disabled={props.disabled}
      readonly={props.readonly}
      onChange={onChange}
      onBlur={onBlur}
      type={hasError ? 'error' : props.type}
    />
  );
});