import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Paper } from '../src/components/Paper';

const story = storiesOf('Paper', module);

const sayHello = () => window.alert('Hello');

story.addDecorator(withInfo({ inline: true }));
story.add('normal', () => <Paper>Paper</Paper>);
story.add('color', () => (
  <div>
    <Paper type="primary">primary</Paper>
    <Paper type="secondary">secondary</Paper>
    <Paper type="error">error</Paper>
    <Paper type="disabled">disabled</Paper>
  </div>
));
story.add('float', () => (
  <div>
    <Paper float={0}>Float0</Paper>
    <Paper float={1}>Float1</Paper>
    <Paper float={2}>Float2</Paper>
    <Paper float={3}>Float3</Paper>
    <Paper float={4}>Float4</Paper>
    <Paper float={5}>Float5</Paper>
    <Paper float={6}>Float6</Paper>
    <Paper float={7}>Float7</Paper>
    <Paper float={8}>Float8</Paper>
  </div>
));
story.add('cursor', () => (
  <div>
    <Paper cursor="pointer">pointer</Paper>
    <Paper cursor="not-allowed">not-allowed</Paper>
    <Paper cursor="progress">progress</Paper>
  </div>
));

story.add('onClick', () => <Paper onClick={sayHello}>Click here</Paper>);
story.add('onKeyDown', () => <Paper onKeyDown={sayHello} tabIndex={0}>Enter some key</Paper>);
