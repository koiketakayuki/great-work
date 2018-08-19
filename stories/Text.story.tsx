import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { Text } from '../src/components/atoms/Text';
import { DefaultStyleConfig as config } from '../src/config/DefaultStyleConfig';

const sayHello = () => alert('Hello!');

const story = storiesOf('Text', module);

story.add('Text', () =>
  <Text cursor="pointer" decoration="underline" fontWeight={600} fontSize="14px" lineHeight="14px" color="red">test</Text>);
