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
story.add('elevation', () => (
  <div>
    <Button elevation={0}>Float0</Button>
    <Button elevation={1}>Float1</Button>
    <Button elevation={2}>Float2</Button>
    <Button elevation={3}>Float3</Button>
    <Button elevation={4}>Float4</Button>
    <Button elevation={5}>Float5</Button>
    <Button elevation={6}>Float6</Button>
    <Button elevation={7}>Float7</Button>
    <Button elevation={8}>Float8</Button>
  </div>
));
story.add('disabled', () => <Button disabled={true} onClick={sayHello}>Hello</Button>);
story.add('onClick', () => <Button onClick={sayHello}>Hello</Button>);
