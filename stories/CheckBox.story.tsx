import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { CheckBox } from '../src/components/molecules/CheckBox';
import { RadioButton } from '../src/components/molecules/RadioButton';
import { DefaultStyleConfig as config } from '../src/config/DefaultStyleConfig';

class CheckBoxDemo extends React.Component<{}, { value: boolean }> {
  constructor(props: {}) {
    super(props);
    this.state = { value: true };
  }

  onChange = (value: boolean) => {
    this.setState({ value });
  }

  render() {
    return (
      <div>
        <CheckBox label="test" config={config} value={this.state.value} onChange={this.onChange}/>
        <CheckBox label="test" config={config} value={this.state.value} onChange={this.onChange} disabled={true}/>
        <RadioButton label="test" config={config} value={this.state.value} onChange={this.onChange}/>
        <RadioButton label="test" config={config} value={this.state.value} onChange={this.onChange} disabled={true}/>
      </div>
    );
  }
}

storiesOf('CheckBox', module)
  .add('to test', () => <CheckBoxDemo/>);
