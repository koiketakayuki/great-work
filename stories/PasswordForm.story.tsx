import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { DefaultStyleConfig as config } from '../src/config/DefaultStyleConfig';
import { PasswordForm } from '../src/components/atoms/form/TextForm';

const story = storiesOf('PasswordForm', module);
const lengthValidator = (value: string) => value.length < 10 ? 'value must be greater than 10 characters' : undefined;
const onChange = (value: string) => window.alert(value);
const onBlur = (e: React.FocusEvent<Element>) => window.alert('Blur');

story.addDecorator(withInfo({ inline: true }));
story.add('normal', () => <PasswordForm value="Test" config={config}/>);
story.add('color', () => <PasswordForm value="Test" type="primary" config={config}/>);
story.add('disabled', () => <PasswordForm value="Test" disabled={true} config={config}/>);
story.add('readonly', () => <PasswordForm value="Test" readonly={true} config={config}/>);
story.add('validation', () => <PasswordForm value="Test" validator={lengthValidator} config={config}/>);
story.add('onChange', () => <PasswordForm value="Test" onChange={onChange} config={config}/>);
story.add('OnBlur', () => <PasswordForm value="Test" onBlur={onBlur} config={config}/>);
