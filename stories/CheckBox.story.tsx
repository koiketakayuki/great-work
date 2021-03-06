import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { CheckBox } from '../src/components/form/CheckBox';

const story = storiesOf('CheckBox', module);

const sayHello = () => window.alert('Hello');

story.addDecorator(withInfo({ inline: true }));
story.add('true', () => <CheckBox value={true} label="test"/>);
story.add('false', () => <CheckBox value={false} label="test"/>);
story.add('color', () => <CheckBox value={true} label="test" type="secondary"/>);
story.add('disabled', () => <CheckBox value={true} label="test" disabled={true}/>);
story.add('readonly', () => <CheckBox value={true} label="test" readonly={true}/>);
story.add('onChange', () => <CheckBox value={true} label="test" onChange={sayHello}/>);
