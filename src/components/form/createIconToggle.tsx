import * as React from 'react';
import { FormBaseProps, HasLabel } from './Form';
import { ColorType, StyleConfig } from '../../config/StyleConfig';
import { IconText } from '../IconText';
import { Icon } from '../Icon';
import { Text } from '../Text';
import { StyleContext } from '../../config/StyleContext';
export type ToggleFormProps = FormBaseProps<boolean> & HasLabel;

export function createIconToggle(activeIcon: string, inactiveIcon: string) {
  return class extends React.Component<ToggleFormProps> {

    getColorType(): ColorType {
      if (this.props.disabled) {
        return 'disabled';
      }

      if (this.props.value && !this.props.readonly) {
        return this.props.type || 'primary';
      }

      return 'default';
    }

    onClick = () => {
      if (this.props.onChange && !this.props.disabled && !this.props.readonly) {
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
          icon={<Icon name={this.props.value ? activeIcon : inactiveIcon}/>}
          cursor={this.props.disabled ? 'not-allowed' : (this.props.readonly ? 'default' : 'pointer')}
          text={<Text>{this.props.label}</Text>}
          onClick={this.onClick}
          onKeyDown={this.onKeyDown}
          type={this.getColorType()}
          hover={(this.props.disabled || this.props.readonly) ? {} : { color: config.getColor(this.props.type || 'primary') }}
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
}
