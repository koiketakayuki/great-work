import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { PasswordForm } from '../src/components/form/TextForm';

const story = storiesOf('PasswordForm', module);
const lengthValidator = (value: string) => value.length < 10 ? 'value must be greater than 10 characters' : undefined;
const onChange = (value: string) => window.alert(value);
const onBlur = () => window.alert('Blur');

story.addDecorator(withInfo({ inline: true }));
story.add('normal', () => <PasswordForm value="Test"/>);
story.add('placeholder', () => <PasswordForm value="" placeholder="Input here..."/>);
story.add('color', () => <PasswordForm value="Test" type="primary"/>);
story.add('disabled', () => <PasswordForm value="Test" disabled={true}/>);
story.add('readonly', () => <PasswordForm value="Test" readonly={true}/>);
story.add('validation', () => <PasswordForm value="Test" validator={lengthValidator}/>);
story.add('onChange', () => <PasswordForm value="Test" onChange={onChange}/>);
story.add('OnBlur', () => <PasswordForm value="Test" onBlur={onBlur}/>);
