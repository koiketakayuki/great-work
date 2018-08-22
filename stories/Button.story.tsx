import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Button } from '../src/components/Button';

const story = storiesOf('Button', module);
const sayHello = () => window.alert('Hello!');

story.addDecorator(withInfo({ inline: true }));
story.add('color', () => (
  <div>
    <Button type="primary">Primary</Button>
    <Button type="secondary">Secondary</Button>
    <Button type="error">Error</Button>
    <Button type="default">Default</Button>
  </div>
));
story.add('float', () => (
  <div>
    <Button float={0}>Float0</Button>
    <Button float={1}>Float1</Button>
    <Button float={2}>Float2</Button>
    <Button float={3}>Float3</Button>
    <Button float={4}>Float4</Button>
    <Button float={5}>Float5</Button>
    <Button float={6}>Float6</Button>
    <Button float={7}>Float7</Button>
    <Button float={8}>Float8</Button>
  </div>
));
story.add('disabled', () => <Button disabled={true} onClick={sayHello}>Hello</Button>);
story.add('onClick', () => <Button onClick={sayHello}>Hello</Button>);
