import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { CheckBox } from '../src/components/form/ToggleForm';

const story = storiesOf('CheckBox', module);
const lengthValidator = (value: string) => value.length < 10 ? 'value must be greater than 10 characters' : undefined;
const onBlur = (e: React.FocusEvent<Element>) => window.alert('Blur');

const sayHello = () => window.alert('Hello');

story.addDecorator(withInfo({ inline: true }));
story.add('true', () => <CheckBox value={true} label="test"/>);
story.add('false', () => <CheckBox value={false} label="test"/>);
story.add('color', () => <CheckBox value={true} label="test" type="secondary"/>);
story.add('disabled', () => <CheckBox value={true} label="test" disabled={true}/>);
story.add('readonly', () => <CheckBox value={true} label="test" readonly={true}/>);
story.add('onChange', () => <CheckBox value={true} label="test" onChange={sayHello}/>);
