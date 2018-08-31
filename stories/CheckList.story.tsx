import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { CheckList } from '../src/components/form/SelectForm';

const story = storiesOf('CheckList', module);
const onChange = (value: string[]) => window.alert(value);
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

const value = ['Value1'];

story.add('normal', () => <CheckList<string> value={value} options={options}/>);
story.add('color', () => <CheckList<string> value={value} options={options} type="secondary"/>);
story.add('disabled', () => <CheckList<string> value={value} options={options} disabled={true}/>);
story.add('readonly', () => <CheckList<string> value={value} options={options} readonly={true}/>);
story.add('onChange', () => <CheckList<string> value={value} options={options} onChange={onChange}/>);
story.add('onBlur', () => <CheckList<string> value={value} options={options} onBlur={onBlur}/>);
