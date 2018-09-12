import * as React from 'react';

import { Schedule } from './Schedule';
import { HeightProperty } from 'csstype';
import { ScheduleTableContext, ScheduleTableContextValue } from './ScheduleTable';
import { Container } from '../layout/Container';

export interface ScheduleCellProps<T extends Schedule> {
  schedule: T;
  onDragStart?: React.MouseEventHandler;
  onScheduleChange?: (schedule: T, diff: number) => void;
}

export interface ScheduleCellState {
  startX?: number;
  startY?: number;
}

export class ScheduleCell<T extends Schedule = Schedule> extends React.Component<ScheduleCellProps<T>, ScheduleCellState> {

  private ref: React.RefObject<HTMLDivElement>;

  constructor(props: ScheduleCellProps<T>) {
    super(props);
    this.state = {};
    this.ref = React.createRef<HTMLDivElement>();
  }

  getMoveDiffFromPixelDiff = (pixelDiff: number, scheduleTableContext: ScheduleTableContextValue) => {
    if (this.ref.current) {
      const sign: number = Math.sign(pixelDiff);
      const absolutePixelDiff = Math.abs(pixelDiff);
      const base = this.ref.current.offsetWidth;
      const absoluteDiff = (absolutePixelDiff + base * 1 / 2) / base;

      return sign * Math.floor(absoluteDiff);
    }

    return 0;
  }

  getDateDiffFromPixelDiff = (pixelDiff: number, scheduleTableContext: ScheduleTableContextValue) => {
    const sign: number = Math.sign(pixelDiff);
    const absolutePixelDiff = Math.abs(pixelDiff);
    const baseHeight = scheduleTableContext.baseHeight;
    const absoluteDiff = (absolutePixelDiff + baseHeight * 1 / 4) / baseHeight;

    const hourDiff = Math.floor(absoluteDiff);
    const minutesDiff = absoluteDiff - hourDiff > 0.5 ? 30 : 0;

    return {
      hourDiff: sign * hourDiff,
      minutesDiff: sign * minutesDiff,
    };
  }

  onDragStart = (dragStartEvent: React.DragEvent) => {
    this.setState({ startX: dragStartEvent.clientX, startY: dragStartEvent.clientY });
  }

  onDragEnd = (scheduleTableContext: ScheduleTableContextValue) => (dragEndEvent: React.DragEvent) => {
    if (this.state.startX !== undefined && this.state.startY !== undefined) {
      const xDiff = dragEndEvent.clientX - this.state.startX;
      const yDiff = dragEndEvent.clientY - this.state.startY;

      if (this.props.onScheduleChange) {
        const moveDiff = this.getMoveDiffFromPixelDiff(xDiff, scheduleTableContext);
        const { hourDiff, minutesDiff } = this.getDateDiffFromPixelDiff(yDiff, scheduleTableContext);

        const schedule: T = Object.assign({}, this.props.schedule, {
          from: shiftDate(this.props.schedule.from, hourDiff, minutesDiff),
          to: shiftDate(this.props.schedule.to, hourDiff, minutesDiff),
        });

        this.props.onScheduleChange(schedule, moveDiff);
      }
    }
  }

  getCell(scheduleTableContext: ScheduleTableContextValue) {
    return (
      <div
        ref={this.ref}
        style={{
          position: 'absolute',
          width: '100%',
          opacity: 0.7,
          background: 'red',
          color: 'white',
          height: getHeight(this.props, scheduleTableContext),
          top: getTop(this.props, scheduleTableContext),
          cursor: 'move',
        }}
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd(scheduleTableContext)}
        draggable={true}
      >
        <Container>{this.props.schedule.label}</Container>
      </div>
    );
  }

  render() {
    return (
      <ScheduleTableContext.Consumer>
        {scheduleTableContext => this.getCell(scheduleTableContext)}
      </ScheduleTableContext.Consumer>
    );
  }
}

function getTop<T extends Schedule>(props: ScheduleCellProps<T>, scheduleTableContext: ScheduleTableContextValue): HeightProperty<string> {
  const hour = props.schedule.from.getHours();
  const minutes = props.schedule.from.getMinutes();

  return `${(hour - scheduleTableContext.from + minutes / 60) * scheduleTableContext.baseHeight}px`;
}

function getHeight<T extends Schedule>(
  props: ScheduleCellProps<T>,
  scheduleTableContext: ScheduleTableContextValue,
): HeightProperty<string> {
  const hourDiff: number = props.schedule.to.valueOf() - props.schedule.from.valueOf();

  const unit = hourDiff / (60 * 60 * 1000);
  return `${scheduleTableContext.baseHeight * unit}px`;
}

function shiftDate(date: Date, hourDiff: number, minutesDiff: number) {
  const result = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours() + hourDiff,
    date.getMinutes() + minutesDiff,
    date.getSeconds(),
    date.getMilliseconds());

  return result;
}
