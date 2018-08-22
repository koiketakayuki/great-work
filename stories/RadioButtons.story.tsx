import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { RadioButtons } from '../src/components/form/SelectForm';

const story = storiesOf('RadioButtons', module);
const lengthValidator = (value: string) => value.length < 10 ? 'value must be greater than 10 characters' : undefined;
const onChange = (value: string) => window.alert(value);
const onBlur = (e: React.FocusEvent<Element>) => window.alert('Blur');

story.addDecorator(withInfo({ inline: true }));
