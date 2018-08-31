import * as React from 'react';
import { FormProps } from './Form';
import { find } from '../../lib/util';
import { Row } from '../layout/Row';
import { validatable } from './validatable';
import { RadioButton } from './RadioButton';
import { CheckBox } from './CheckBox';

/**
 * Select components
 */
export type SelectOption<T> = { label: string, value: T };
export type HasSelectOptions<T> = { options: SelectOption<T>[] };

export type SelectBoxProps<T> = FormProps<T> & HasSelectOptions<T>;
export type RadioButtonsProps<T> = FormProps<T> & HasSelectOptions<T>;
export type CheckListProps<T> = FormProps<T[]> & HasSelectOptions<T>;

class SelectBoxBase<T> extends React.Component<SelectBoxProps<T>> {
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

class RadioButtonsBase<T> extends React.Component<RadioButtonsProps<T>> {

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

class CheckListBase<T> extends React.Component<CheckListProps<T>> {

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

export const SelectBox = <T extends any>(props: SelectBoxProps<T>) =>
  new (validatable<T, SelectBoxProps<T>>((props, onChange, onBlur, hasError) => (
    <SelectBoxBase
      value={props.value}
      disabled={props.disabled}
      readonly={props.readonly}
      options={props.options}
      onChange={onChange}
      onBlur={onBlur}
      type={hasError ? 'error' : props.type}
    />
  )))(props);

export const RadioButtons = <T extends any>(props: RadioButtonsProps<T>) =>
  new (validatable<T, RadioButtonsProps<T>>((props, onChange, onBlur, hasError) => (
    <RadioButtonsBase
      value={props.value}
      disabled={props.disabled}
      readonly={props.readonly}
      options={props.options}
      onChange={onChange}
      onBlur={onBlur}
      type={hasError ? 'error' : props.type}
    />
  )))(props);

export const CheckList = <T extends any>(props: CheckListProps<T>) =>
  new (validatable<T[], CheckListProps<T>>((props, onChange, onBlur, hasError) => (
    <CheckListBase
      value={props.value}
      disabled={props.disabled}
      readonly={props.readonly}
      options={props.options}
      onChange={onChange}
      onBlur={onBlur}
      type={hasError ? 'error' : props.type}
    />
  )))(props);
