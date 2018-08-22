import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { DefaultStyleConfig as config } from '../src/config/DefaultStyleConfig';
import { Button } from '../src/components/atoms/Button';

const story = storiesOf('Button', module);
const sayHello = () => window.alert('Hello!');

story.addDecorator(withInfo({ inline: true }));
story.add('color', () => (
  <div>
    <Button type="primary" config={config}>Primary</Button>
    <Button type="secondary" config={config}>Secondary</Button>
    <Button type="error" config={config}>Error</Button>
    <Button type="default" config={config}>Default</Button>
  </div>
));
story.add('float', () => (
  <div>
    <Button float={0} config={config}>Float0</Button>
    <Button float={1} config={config}>Float1</Button>
    <Button float={2} config={config}>Float2</Button>
    <Button float={3} config={config}>Float3</Button>
    <Button float={4} config={config}>Float4</Button>
    <Button float={5} config={config}>Float5</Button>
    <Button float={6} config={config}>Float6</Button>
    <Button float={7} config={config}>Float7</Button>
    <Button float={8} config={config}>Float8</Button>
  </div>
));
story.add('disabled', () => <Button config={config} disabled={true} onClick={sayHello}>Hello</Button>);
story.add('onClick', () => <Button config={config} onClick={sayHello}>Hello</Button>);
