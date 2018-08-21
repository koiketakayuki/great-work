import * as React from 'react';
import { Row } from '../layout/Row';
import { StyleConfig } from '../../config/StyleConfig';
import { SelectOption } from './Select';
import { RadioButton } from './RadioButton';

export interface RadioButtonProps<T> {
  value?: T;
  options: SelectOption<T>[];
  onChange?: (newValue: T) => void;
  disabled?: boolean;
  config: StyleConfig;
}

export class RadioButtons<T> extends React.Component<RadioButtonProps<T>> {

  private onChange = (newValue: T) => {
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
        {this.getCheckBoxes()}
      </Row>
    );
  }
}
