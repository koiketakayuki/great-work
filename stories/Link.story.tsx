import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { Link } from '../src/components/atoms/Link';
import { DefaultStyleConfig as config } from '../src/config/DefaultStyleConfig';

const story = storiesOf('Link', module);

story.add('一覧', () =>
  (
    <div>
      <Link config={config} href="https://google.com">Google</Link>
      <Link config={config} href="https://google.com" target="_blank">Google(New Tab)</Link>
      <Link config={config} href="https://google.com" disabled={true}>Google(Disabled)</Link>
    </div>
  ));
