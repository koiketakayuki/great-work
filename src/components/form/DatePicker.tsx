import * as React from 'react';
import { FormProps, SelectOption } from './Form';
import { Row } from '../layout/Row';
import { SelectBox } from './SelectBox';
import { range } from '../../lib/util';

export interface DatePickerProps extends FormProps<Date> {
  yearOptions: SelectOption<number>[];
}

const monthOptions: SelectOption<number>[] =
  range(0, 11).map(m => ({ value: m, label: String(m + 1) }));

export class DatePicker extends React.Component<DatePickerProps> {

  constructor(props: DatePickerProps) {
    super(props);
  }

  getDateOptions = (value: Date) => {
    const year = value.getFullYear();
    const month = value.getMonth();
    const dayCountInMonth: number = new Date(year, month + 1, 0).getDate();
    const days = range(1, dayCountInMonth);

    return days.map(d => ({ value: d, label: String(d) }));
  }

  onYearChange = (year: number) => {
    if (this.props.onChange) {
      const month = this.props.value.getMonth();
      const date = this.props.value.getDate();

      const newValue = new Date(year, month, date, 0, 0, 0, 0);
      this.props.onChange(newValue);
    }
  }

  onMonthChange = (month: number) => {
    if (this.props.onChange) {
      const year = this.props.value.getFullYear();
      const date = this.props.value.getDate();

      const newValue = new Date(year, month, date, 0, 0, 0, 0);
      this.props.onChange(newValue);
    }
  }

  onDateChange = (date: number) => {
    if (this.props.onChange) {
      const year = this.props.value.getFullYear();
      const month = this.props.value.getMonth();

      const newValue = new Date(year, month, date, 0, 0, 0, 0);
      this.props.onChange(newValue);
    }
  }

  render() {
    const year = this.props.value.getFullYear();
    const month = this.props.value.getMonth();
    const date = this.props.value.getDate();

    return (
      <Row>
        <SelectBox<number> value={year} options={this.props.yearOptions} onChange={this.onYearChange}/>
        <SelectBox<number> value={month} options={monthOptions} onChange={this.onMonthChange}/>
        <SelectBox<number> value={date} options={this.getDateOptions(this.props.value)} onChange={this.onDateChange}/>
      </Row>
    );
  }
}
