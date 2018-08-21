import * as React from 'react';
import { Row } from '../layout/Row';
import { CheckBox } from './CheckBox';
import { StyleConfig } from '../../config/StyleConfig';
import { SelectOption } from './Select';

export interface CheckListProps<T> {
  value: T[];
  options: SelectOption<T>[];
  onChange?: (newValue: T[]) => void;
  disabled?: boolean;
  config: StyleConfig;
}

export class CheckList<T> extends React.Component<CheckListProps<T>> {

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
