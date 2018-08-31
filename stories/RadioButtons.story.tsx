import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { RadioButtons } from '../src/components/form/SelectForm';

const story = storiesOf('RadioButtons', module);
const onChange = (value: string) => window.alert(value);
const onBlur = () => window.alert('Blur');

story.addDecorator(withInfo({ inline: true }));

const options = [
  {
    label: 'Label1',
    value: 'Value1',
  },
  {
    label: 'Label2',
    value: 'Value2',
  },
  {
    label: 'Label3',
    value: 'Value3',
  },
];

story.add('normal', () => <RadioButtons<string> value="Value1" options={options}/>);
story.add('color', () => <RadioButtons<string> value="Value1" options={options} type="primary"/>);
story.add('disabled', () => <RadioButtons<string> value="Value1" options={options} disabled={true}/>);
story.add('readonly', () => <RadioButtons<string> value="Value1" options={options} readonly={true}/>);
story.add('onChange', () => <RadioButtons<string> value="Value1" options={options} onChange={onChange}/>);
story.add('onBlur', () => <RadioButtons<string> value="Value1" options={options} onBlur={onBlur}/>);
