import * as React from 'react';
import { find } from '../../lib/util';
import { FormProps, HasSelectOptions, SelectOption } from './Form';
import { CheckBox } from './CheckBox';
import { Row } from '../layout/Row';
import { Validation } from './Validation';

export type CheckListProps<T> = FormProps<T[]> & HasSelectOptions<T>;

export function CheckList<T>(props: CheckListProps<T>) {
  return (
    <Validation validator={props.validator} onChange={props.onChange} formProps={props}>
      {props => <_CheckList {...props}/>}
    </Validation>
  );
}

class _CheckList<T> extends React.Component<CheckListProps<T>> {

  private onChange = (targetValue: T) => {
    if (this.props.onChange) {
      const currentValue = this.props.value;

      const newValue: T[] = this.props.options.reduce(
        (acc: T[], o: SelectOption<T>) => {
          const value = o.value;
          if ((currentValue.indexOf(value) > -1 && value !== targetValue) ||
          (currentValue.indexOf(value) === -1 && value === targetValue)) {
            acc.push(value);
          }

          return acc;
        },
        []);
      this.props.onChange(newValue);
    }
  }

  private getCheckBoxes() {
    const currentValue = this.props.value;

    return this.props.options.map((o: SelectOption<T>) => {
      const onChange = () => this.onChange(o.value);
      return (
        <CheckBox
          key={o.label}
          value={currentValue.indexOf(o.value) > -1}
          label={o.label}
          onChange={onChange}
          type={this.props.type}
          disabled={this.props.disabled}
        />
      );
    });
  }

  render() {
    if (this.props.readonly && !this.props.disabled) {
      const selectedLabels = this.props.value.map((v: T) => {
        const option = find(this.props.options, (o: SelectOption<T>) => o.value === v);

        return option ? option.label : '';
      });
      return (
        <div>{selectedLabels.join(', ')}</div>
      );
    }

    return (
      <Row wrap="wrap">
        {this.getCheckBoxes()}
      </Row>
    );
  }
}
