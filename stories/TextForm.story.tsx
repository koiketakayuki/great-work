import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { TextForm } from '../src/components/form/TextForm';

const story = storiesOf('TextForm', module);
const onChange = (value: string) => window.alert(value);

story.addDecorator(withInfo({ inline: true }));
story.add('normal', () => <TextForm value="Test"/>);
story.add('placeholder', () => <TextForm value="" placeholder="Input here..."/>);
story.add('color', () => <TextForm value="Test" type="primary"/>);
story.add('disabled', () => <TextForm value="Test" disabled={true}/>);
story.add('readonly', () => <TextForm value="Test" readonly={true}/>);
story.add('onChange', () => <TextForm value="Test" onChange={onChange}/>);
