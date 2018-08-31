import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { IconText } from '../src/components/IconText';
import { Text } from '../src/components/Text';
import { Icon } from '../src/components/Icon';

const story = storiesOf('IconText', module);
const sayHello = () => window.alert('Hello!');

story.addDecorator(withInfo({ inline: true }));
story.add('normal', () => (
  <IconText icon={<Icon name="add"/>} text={<Text>add</Text>}/>
));

story.add('color', () => (
  <div>
    <IconText icon={<Icon name="remove"/>} text={<Text>primary</Text>} type="primary"/>
    <IconText icon={<Icon name="bookmark"/>} text={<Text>secondary</Text>} type="secondary"/>
    <IconText icon={<Icon name="done"/>} text={<Text>error</Text>} type="error"/>
    <IconText icon={<Icon name="eject"/>} text={<Text>disabled</Text>} type="disabled"/>
    <IconText icon={<Icon name="donut_small"/>} text={<Text >default</Text>} type="default"/>
  </div>
));

story.add('hover', () => (
  <IconText hover={{ color: 'red' }} icon={<Icon name="history"/>} text={<Text>hover</Text>}/>
));

story.add('cursor', () => (
  <div>
    <IconText cursor="pointer" icon={<Icon name="history"/>} text={<Text>pointer</Text>}/>
    <IconText cursor="not-allowed" icon={<Icon name="help"/>} text={<Text>not-allowed</Text>}/>
    <IconText cursor="progress" icon={<Icon name="label"/>} text={<Text>progress</Text>}/>
  </div>
));

story.add('put icon right', () => (
  <IconText right={true} icon={<Icon name="add"/>} text={<Text>add</Text>}/>
));

story.add('onClick', () => <IconText onClick={sayHello} icon={<Icon name="history"/>} text={<Text>Click here</Text>}/>);

story.add('onKeyDown', () =>
  <IconText tabIndex={0} onKeyDown={sayHello} icon={<Icon name="history"/>} text={<Text>Enter some key</Text>}/>);
