import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { CheckBox, SelectOption, CheckList, RadioButtons, SelectBox } from '../src/components/atoms/Form';
import { DefaultStyleConfig as config } from '../src/config/DefaultStyleConfig';

class CheckBoxDemo extends React.Component<{}, { value: number[], value1: number | undefined }> {

  static options: SelectOption<number>[] = [
    { value: 1, label: 'りんご' },
    { value: 2, label: 'みかん' },
    { value: 3, label: 'ばなな' },
    { value: 4, label: 'めろん' },
    { value: 5, label: 'すいか' },
    { value: 6, label: 'いちじく' },
    { value: 7, label: 'ぶどう' },
    { value: 8, label: 'もも' },
    { value: 9, label: 'ゆず' },
    { value: 10, label: 'れもん' },
  ];

  constructor(props: {}) {
    super(props);
    this.state = { value: [3], value1: 1 };
  }

  onChange = (value: number[]) => {
    this.setState({ value });
    this.render();
  }

  onChange1 = (value1: number | undefined) => {
    this.setState({ value1 });
    this.render();
  }

  render() {
    return (
      <div>
        <CheckList
          value={this.state.value}
          options={CheckBoxDemo.options}
          onChange={this.onChange}
          config={config}
        />
        <CheckList
          value={this.state.value}
          options={CheckBoxDemo.options}
          onChange={this.onChange}
          disabled={true}
          config={config}
        />
        <SelectBox
          value={this.state.value1}
          options={CheckBoxDemo.options}
          onChange={this.onChange1}
          config={config}
        />
        <RadioButtons
          value={this.state.value1}
          options={CheckBoxDemo.options}
          onChange={this.onChange1}
          config={config}
        />
        <RadioButtons
          value={this.state.value1}
          options={CheckBoxDemo.options}
          onChange={this.onChange1}
          config={config}
          disabled={true}
        />
      </div>
    );
  }
}

storiesOf('CheckBox', module)
  .add('to test', () => <CheckBoxDemo/>);
