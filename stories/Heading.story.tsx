import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { Heading } from '../src/components/atoms/Heading';
import { DefaultStyleConfig as config } from '../src/config/DefaultStyleConfig';

const sayHello = () => alert('Hello!');

const story = storiesOf('Heading', module);

story.add('一覧', () =>
  (
    <div>
      <Heading level="1" config={config}>Heading1</Heading>
      <Heading level="2" config={config}>Heading2</Heading>
      <Heading level="3" config={config}>Heading3</Heading>
      <Heading level="4" config={config}>Heading4</Heading>
      <Heading level="5" config={config}>Heading5</Heading>
    </div>
  ));
