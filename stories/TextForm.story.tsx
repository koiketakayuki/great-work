import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { DefaultStyleConfig as config } from '../src/config/DefaultStyleConfig';
import { TextForm } from '../src/components/atoms/form/TextForm';

const story = storiesOf('TextForm', module);
const lengthValidator = (value: string) => value.length < 10 ? 'value must be greater than 10 characters' : undefined;
const onChange = (value: string) => window.alert(value);
const onBlur = (e: React.FocusEvent<Element>) => window.alert('Blur');

story.addDecorator(withInfo({ inline: true }));
story.add('normal', () => <TextForm value="Test" config={config}/>);
story.add('color', () => <TextForm value="Test" type="primary" config={config}/>);
story.add('disabled', () => <TextForm value="Test" disabled={true} config={config}/>);
story.add('readonly', () => <TextForm value="Test" readonly={true} config={config}/>);
story.add('validation', () => <TextForm value="Test" validator={lengthValidator} config={config}/>);
story.add('onChange', () => <TextForm value="Test" onChange={onChange} config={config}/>);
story.add('OnBlur', () => <TextForm value="Test" onBlur={onBlur} config={config}/>);
