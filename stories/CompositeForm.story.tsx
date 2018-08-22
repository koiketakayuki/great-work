import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { CompositeForm, TextFormEntry } from '../src/components/form/CompositeForm';

const story = storiesOf('CompositeForm', module);
const sayHello = () => window.alert('Hello!');

story.addDecorator(withInfo({ inline: true }));

const value = { id: 1, name: 'test' };
const onChange = (newValue: { name: string }) => console.log(newValue);

story.add('disabled', () => (
  <CompositeForm value={value} onChange={onChange}>
    <TextFormEntry id="name" value={value.name} label="氏名"/>
  </CompositeForm>
));
