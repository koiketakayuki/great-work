import * as React from 'react';
import { FormEntryProps, FormContext, UpdateValue } from './CompositeForm';
import { Section } from '../layout/Section';
import { TextForm } from './TextForm';

export class TextFormEntry extends React.Component<FormEntryProps<string>> {

  validate(value: string) {
    if (this.props.validator) {
      return this.props.validator(value);
    }
  }

  getEntry(update: UpdateValue<string>) {
    const onEntryValueChange = (entryValue: string) => {
      const errorMessage: string | undefined = this.validate(entryValue);
      update(this.props.id, entryValue, !!errorMessage);
    };
    return <Section label={this.props.label}><TextForm value={this.props.value} onChange={onEntryValueChange}/></Section>;
  }

  render() {
    return (
      <FormContext.Consumer>
        {update => this.getEntry(update)}
      </FormContext.Consumer>
    );
  }
}
