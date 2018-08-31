import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { IconButton } from '../src/components/IconButton';
import { Icon } from '../src/components/Icon';

const story = storiesOf('IconButton', module);
const sayHello = () => window.alert('Hello!');

story.addDecorator(withInfo({ inline: true }));
story.add('normal', () => <IconButton icon={<Icon name="add"/>} onClick={sayHello}/>);

story.add('color', () => (
  <div>
    <IconButton type="primary" icon={<Icon name="add"/>} onClick={sayHello}/>
    <IconButton type="secondary" icon={<Icon name="add"/>} onClick={sayHello}/>
    <IconButton type="error" icon={<Icon name="add"/>} onClick={sayHello}/>
    <IconButton type="disabled" icon={<Icon name="add"/>} onClick={sayHello}/>
    <IconButton type="default" icon={<Icon name="add"/>} onClick={sayHello}/>
  </div>
));

story.add('disabled', () => <IconButton disabled={true} icon={<Icon name="add"/>} onClick={sayHello}/>);
