import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { CompositeForm } from '../src/components/form/CompositeForm';
import { TextFormEntry } from '../src/components/form/TextFormEntry';

const story = storiesOf('CompositeForm', module);
const sayHello = () => window.alert('Hello!');
const lengthValidator = (value: string) => value.length < 10 ? 'value must be greater than 10 characters' : undefined;

story.addDecorator(withInfo({ inline: true }));

const value = { id: 1, name: 'test' };
const onChange = (newValue: { id: number, name: string }, hasError: boolean) => {
  console.log(newValue);
  console.log(name);
};

story.add('disabled', () => (
  <CompositeForm value={value} onChange={onChange}>
    <TextFormEntry id="name" value={value.name} label="氏名" validator={lengthValidator}/>
  </CompositeForm>
));
