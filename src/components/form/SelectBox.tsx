import * as React from 'react';
import { find } from '../../lib/util';
import { FormProps, HasSelectOptions, SelectOption } from './Form';
import { WithErrorMessage } from './WithErrorMessage';

export type SelectBoxProps<T> = FormProps<T> & HasSelectOptions<T>;

export function SelectBox<T>(props: SelectBoxProps<T>) {
  return (
    <WithErrorMessage<T, SelectBoxProps<T>> {...props}>
      {props => <_SelectBox {...props}/>}
    </WithErrorMessage>
  );
}

class _SelectBox<T> extends React.Component<SelectBoxProps<T>> {
  private onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const label = e.target.value;
    const selectedOption: SelectOption<T> | undefined = find(this.props.options, o => o.label === label);

    if (this.props.onChange && selectedOption !== undefined) {
      this.props.onChange(selectedOption.value);
    }
  }

  private getRadioButtons() {
    return this.props.options.map((o: SelectOption<T | undefined>) => {
      return (
        <option
          key={o.label}
          value={o.label}
          disabled={this.props.disabled}
        >{o.label}
        </option>
      );
    });
  }

  render() {
    const currentOption: SelectOption<T> | undefined = find(this.props.options, o => o.value === this.props.value);

    if (this.props.readonly && !this.props.disabled) {
      return <div>{currentOption ? currentOption.label : undefined}</div>;
    }

    return (
      <select onChange={this.onChange} value={currentOption ? currentOption.label : undefined} disabled={this.props.disabled}>
        {this.getRadioButtons()}
      </select>
    );
  }
}
