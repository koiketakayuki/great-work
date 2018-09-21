import * as React from 'react';

import { Schedule } from './Schedule';
import { HeightProperty, TopProperty, BottomProperty } from 'csstype';
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

  onSashDragStart = (event: React.DragEvent) => {
    event.stopPropagation();
    this.onDragStart(event);
  }

  onSashTopDragEnd = (scheduleTableContext: ScheduleTableContextValue) => (event: React.DragEvent) => {
    event.stopPropagation();
    if (this.state.startX !== undefined && this.state.startY !== undefined) {
      const yDiff = event.clientY - this.state.startY;

      if (this.props.onScheduleChange) {
        const { hourDiff, minutesDiff } = this.getDateDiffFromPixelDiff(yDiff, scheduleTableContext);

        const newDate = shiftDate(this.props.schedule.from, hourDiff, minutesDiff);
        const newDateTimestamp = newDate.valueOf();

        const schedule: T = Object.assign({}, this.props.schedule, {
          from: newDate,
        });

        this.props.onScheduleChange(schedule, 0);
      }
    }
  }

  onSashBottomDragEnd = (scheduleTableContext: ScheduleTableContextValue) => (event: React.DragEvent) => {
    event.stopPropagation();
    if (this.state.startX !== undefined && this.state.startY !== undefined) {
      const yDiff = event.clientY - this.state.startY;

      if (this.props.onScheduleChange) {
        const { hourDiff, minutesDiff } = this.getDateDiffFromPixelDiff(yDiff, scheduleTableContext);

        const schedule: T = Object.assign({}, this.props.schedule, {
          to: shiftDate(this.props.schedule.to, hourDiff, minutesDiff),
        });

        this.props.onScheduleChange(schedule, 0);
      }
    }
  }

  getCell(scheduleTableContext: ScheduleTableContextValue) {
    return (
      <div
        ref={this.ref}
        style={{
          position: 'absolute',
          display: 'flex',
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
        <div style={{ position: 'relative', flexGrow: 1 }}>
          <ScheduleCellSash top="0" onDragStart={this.onSashDragStart} onDragEnd={this.onSashTopDragEnd(scheduleTableContext)}/>
          <Container>{this.props.schedule.label}</Container>
          <ScheduleCellSash bottom="0" onDragStart={this.onSashDragStart} onDragEnd={this.onSashBottomDragEnd(scheduleTableContext)}/>
        </div>
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

interface ScheduleCellSashProps {
  top?: TopProperty<string>;
  bottom?: BottomProperty<string>;
  onDragStart?: React.DragEventHandler;
  onDragEnd?: React.DragEventHandler;
}

function ScheduleCellSash(props: ScheduleCellSashProps) {
  return (
    <div
      style={{ top: props.top, bottom: props.bottom, position: 'absolute', width: '100%', height: '6px', cursor: 'ns-resize', zIndex: 1 }}
      onDragStartCapture={props.onDragStart}
      onDragEndCapture={props.onDragEnd}
      draggable={true}
    />
  );
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
