import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { ScheduleTable, Timeline, ScheduleCell, Button } from '../src/components/GreatWork';
import { Schedule } from '../src/components/schedule/Schedule';
import { range, findIndex, replace } from '../src/lib/util';

const story = storiesOf('RadioButtons', module);

story.addDecorator(withInfo({ inline: true }));

interface MySchedule extends Schedule {
  id: number;
  timelineId: number;
}

function createSchedule(id: number, timelineId: number, from: number, to: number): MySchedule {
  return {
    id,
    timelineId,
    label: 'test',
    from: new Date(2010, 10, 10, from, 0, 0),
    to: new Date(2010, 10, 10, to, 0, 0),
  };
}

class ScheduleTableDemo extends React.Component<{}, { schedules: MySchedule[], rangeLimit: number }> {

  constructor(props: {}) {
    super(props);
    this.state = {
      rangeLimit: 3,
      schedules: [
        createSchedule(1, 1, 9, 12),
        createSchedule(2, 2, 10, 11),
        createSchedule(3, 1, 14, 15),
        createSchedule(4, 3, 13, 15),
        createSchedule(5, 1, 16, 17),
        createSchedule(6, 3, 17, 18),
        createSchedule(7, 2, 15, 16),
      ],
    };
  }

  filterSchedulesByTimelineId(timelineId: number) {
    return this.state.schedules.filter(s => s.timelineId === timelineId);
  }

  onScheduleChange = (schedule: MySchedule, diff: number) => {
    const newSchedule = Object.assign({}, schedule, { timelineId: schedule.timelineId + diff });
    const oldScheduleIndex = findIndex(this.state.schedules, s => s.id === schedule.id);

    if (oldScheduleIndex !== -1) {
      this.setState({ schedules: replace(this.state.schedules, oldScheduleIndex, newSchedule) });
    }
  }

  addTimeline = () => {
    this.setState({ rangeLimit: this.state.rangeLimit + 1 });
  }

  render() {
    return (
      <div>
        <Button onClick={this.addTimeline}>Add Timeline</Button>
        <ScheduleTable baseWidth={100} baseHeight={80} headerHeight={30} from={9} to={18}>
          {range(1, this.state.rangeLimit).map((timelineId) => {
            return (
              <Timeline label={`Timeline${timelineId}`} key={timelineId}>
                {this.filterSchedulesByTimelineId(timelineId)
                  .map(s => (
                    <ScheduleCell
                      schedule={s}
                      key={s.id}
                      onScheduleChange={this.onScheduleChange}
                    />))}
              </Timeline>
            );
          })}
        </ScheduleTable>
      </div>
    );
  }
}

story.add('onChange', () => <ScheduleTableDemo/>);
