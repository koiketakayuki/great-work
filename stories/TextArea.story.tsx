import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { TextArea } from '../src/components/form/TextForm';

const story = storiesOf('TextArea', module);
const lengthValidator = (value: string) => value.length < 10 ? 'value must be greater than 10 characters' : undefined;
const onChange = (value: string) => window.alert(value);
const onBlur = () => window.alert('Blur');

story.addDecorator(withInfo({ inline: true }));
story.add('normal', () => <TextArea value="Test"/>);
story.add('color', () => <TextArea value="Test" type="primary"/>);
story.add('disabled', () => <TextArea value="Test" disabled={true}/>);
story.add('readonly', () => <TextArea value="Test" readonly={true}/>);
story.add('validation', () => <TextArea value="Test" validator={lengthValidator}/>);
story.add('onChange', () => <TextArea value="Test" onChange={onChange}/>);
story.add('OnBlur', () => <TextArea value="Test" onBlur={onBlur}/>);
