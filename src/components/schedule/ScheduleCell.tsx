import * as React from 'react';

import { Schedule } from './Schedule';
import { HeightProperty } from 'csstype';
import { ScheduleTableContext, ScheduleTableContextValue } from './ScheduleTable';

export interface ScheduleCellProps {
  schedule: Schedule;
  onDragStart?: React.MouseEventHandler;
}

export function ScheduleCell(props: ScheduleCellProps) {
  return (
    <ScheduleTableContext.Consumer>
      {context => getCell(props, context)}
    </ScheduleTableContext.Consumer>
  );
}

function getCell(props: ScheduleCellProps, context: ScheduleTableContextValue) {
  return (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        opacity: 0.7,
        background: 'red',
        color: 'white',
        height: getHeight(props, context),
        top: getTop(props, context),
      }}
      onDragStart={props.onDragStart}
      draggable={true}
    >{props.schedule.label}
    </div>
  );
}

function getTop(props: ScheduleCellProps, context: ScheduleTableContextValue): HeightProperty<string> {
  const hour = props.schedule.from.getHours();

  return `calc(${hour - 9} * ${context.baseHeight})`;
}

function getHeight(props: ScheduleCellProps, context: ScheduleTableContextValue): HeightProperty<string> {
  const hourDiff: number = props.schedule.to.valueOf() - props.schedule.from.valueOf();

  const unit = hourDiff / (60 * 60 * 1000);
  return `calc(${context.baseHeight} * ${unit})`;
}
