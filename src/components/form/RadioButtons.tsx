import * as React from 'react';
import { find } from '../../lib/util';
import { FormProps, HasSelectOptions, SelectOption } from './Form';
import { RadioButton } from './RadioButton';
import { Row } from '../layout/Row';
import { WithErrorMessage } from './WithErrorMessage';

export type RadioButtonsProps<T> = FormProps<T> & HasSelectOptions<T>;

export function RadioButtons<T>(props: RadioButtonsProps<T>) {
  return (
    <WithErrorMessage<T, RadioButtonsProps<T>> {...props}>
      {props => <_RadioButtons {...props}/>}
    </WithErrorMessage>
  );
}

class _RadioButtons<T> extends React.Component<RadioButtonsProps<T>> {

  private onChange = (newValue: T) => {
    if (this.props.onChange) {
      this.props.onChange(newValue);
    }
  }

  private getRadioButtons() {
    const currentValue = this.props.value;

    return this.props.options.map((o: SelectOption<T>) => {
      const onChange = () => this.onChange(o.value);
      return (
        <RadioButton
          key={o.label}
          value={currentValue === o.value}
          label={o.label}
          onChange={onChange}
          type={this.props.type}
          disabled={this.props.disabled}
        />
      );
    });
  }

  render() {
    const currentOption: SelectOption<T> | undefined = find(this.props.options, o => o.value === this.props.value);

    if (this.props.readonly && !this.props.disabled) {
      return <div>{currentOption ? currentOption.label : undefined}</div>;
    }

    return (
      <Row wrap="wrap">
        {this.getRadioButtons()}
      </Row>
    );
  }
}
