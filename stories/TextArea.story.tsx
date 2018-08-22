import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { DefaultStyleConfig as config } from '../src/config/DefaultStyleConfig';
import { TextArea } from '../src/components/atoms/form/TextForm';

const story = storiesOf('TextArea', module);
const lengthValidator = (value: string) => value.length < 10 ? 'value must be greater than 10 characters' : undefined;
const onChange = (value: string) => window.alert(value);
const onBlur = (e: React.FocusEvent<Element>) => window.alert('Blur');

story.addDecorator(withInfo({ inline: true }));
story.add('normal', () => <TextArea value="Test" config={config}/>);
story.add('color', () => <TextArea value="Test" type="primary" config={config}/>);
story.add('disabled', () => <TextArea value="Test" disabled={true} config={config}/>);
story.add('readonly', () => <TextArea value="Test" readonly={true} config={config}/>);
story.add('validation', () => <TextArea value="Test" validator={lengthValidator} config={config}/>);
story.add('onChange', () => <TextArea value="Test" onChange={onChange} config={config}/>);
story.add('OnBlur', () => <TextArea value="Test" onBlur={onBlur} config={config}/>);
