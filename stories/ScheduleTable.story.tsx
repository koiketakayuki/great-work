import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { ScheduleTable, Timeline, ScheduleCell } from '../src/components/GreatWork';
import { Schedule } from '../src/components/schedule/Schedule';

const story = storiesOf('RadioButtons', module);

story.addDecorator(withInfo({ inline: true }));

function createSchedule(from: number, to: number): Schedule {
  return {
    label: 'test',
    from: new Date(2010, 10, 10, from, 0, 0),
    to: new Date(2010, 10, 10, to, 0, 0),
  };
}

const onDragStart = () => console.log('hello');

story.add('onChange', () => (
  <ScheduleTable baseWidth="100px" baseHeight="80px" headerHeight="30px" from={9} to={18}>
    <Timeline label="line1">
      <ScheduleCell schedule={createSchedule(14, 15)}/>
    </Timeline>
    <Timeline label="line2">
      <ScheduleCell schedule={createSchedule(16, 18)} onDragStart={onDragStart}/>
    </Timeline>
  </ScheduleTable>
));
