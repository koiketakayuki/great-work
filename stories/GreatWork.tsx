import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { GreatWork } from '../src/components/GreatWork';

storiesOf('Welcome', module)
  .add('to test', () => <GreatWork name="Ryutaro" / >);
