import * as React from 'react';
import { DatePicker } from '../src/components/form/DatePicker';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { range } from '../src/lib/util';

const story = storiesOf('DatePicker', module);

story.addDecorator(withInfo({ inline: true }));

const yearOptions = range(2000, 2018).map(y => ({ value: y, label: String(y) }));

const onChange = (date: Date) => {
  console.log(date);
};

story.add('normal', () => <DatePicker value={new Date()} yearOptions={yearOptions} onChange={onChange}/>);
