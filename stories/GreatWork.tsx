import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { GreatWork } from '../src/components/GreatWork';
import { Button } from '../src/components/button/Button';
import { DefaultStyleConfig as config } from '../src/config/DefaultStyleConfig';
import { ButtonSkinName } from '../src/components/button/ButtonSkin';

storiesOf('Welcome', module)
  .add('to test', () => <GreatWork name="Ryutaro" / >);

const sayHello = () => alert('Hello!');

const story = storiesOf('Button', module);

const skinNames: ButtonSkinName[] = ['primary', 'secondary'];

for (const skin of skinNames) {
  story.add(skin,
            () => <Button config={config} skin={skin} frame="large" onClick={sayHello}>test</Button>);
  story.add(`${skin}-disabled`,
            () => <Button config={config} skin={skin} disabled={true} frame="large" onClick={sayHello}>test</Button>);
}
