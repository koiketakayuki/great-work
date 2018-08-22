import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { TextForm } from '../src/components/form/TextForm';

const story = storiesOf('TextForm', module);
const lengthValidator = (value: string) => value.length < 10 ? 'value must be greater than 10 characters' : undefined;
const onChange = (value: string) => window.alert(value);
const onBlur = (e: React.FocusEvent<Element>) => window.alert('Blur');

story.addDecorator(withInfo({ inline: true }));
story.add('normal', () => <TextForm value="Test"/>);
story.add('color', () => <TextForm value="Test" type="primary"/>);
story.add('disabled', () => <TextForm value="Test" disabled={true}/>);
story.add('readonly', () => <TextForm value="Test" readonly={true}/>);
story.add('validation', () => <TextForm value="Test" validator={lengthValidator}/>);
story.add('onChange', () => <TextForm value="Test" onChange={onChange}/>);
story.add('OnBlur', () => <TextForm value="Test" onBlur={onBlur}/>);
