import * as React from 'react';
import { StyleConfig, ColorType } from '../../config/StyleConfig';
import { IconText } from './IconText';

export interface IconToggleProps {
  value: boolean;
  label: string;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
  colorType?: ColorType;
  config: StyleConfig;
}

export const IconToggle = (activeIcon: string, inactiveIcon: string) =>
class CheckBox extends React.Component<IconToggleProps> {

  get icon() {
    return this.props.value ? activeIcon : inactiveIcon;
  }

  get cursor() {
    return this.props.disabled ? 'not-allowed' : 'pointer';
  }

  get color() {
    if (this.props.disabled) {
      return this.props.config.disabledFontColor;
    }

    if (this.props.value) {
      return this.props.config.getColor(this.props.colorType);
    }
  }

  get hover() {
    return this.props.disabled ? {} : { color: this.props.config.getColor(this.props.colorType) };
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
        icon={this.icon}
        cursor={this.cursor}
        text={this.props.label}
        color={this.color}
        onClick={this.onClick}
        hover={this.hover}
        config={this.props.config}
      />
    );
  }
};
