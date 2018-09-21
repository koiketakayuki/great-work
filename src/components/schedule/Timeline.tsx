import * as React from 'react';
import { ScheduleTableContext } from './ScheduleTable';
import { range } from '../../lib/util';

export interface TimelineProps {
  label: string;
  children: React.ReactNode;
}

export function Timeline(props: TimelineProps) {
  return (
    <ScheduleTableContext.Consumer>
      {context => (
        <div style={{ flexGrow: 1, marginLeft: '10px' }}>
          <div style={{ height: `${context.headerHeight}px` }}>{props.label}</div>
          <div style={{  position: 'relative', border: '1px solid', borderTop: 'none' }}>
            {range(context.from, context.to - 1).map(() => (
              <>
                <div style={{ borderTop: '1px solid', height: `${context.baseHeight / 2}px` }}/>
                <div style={{ borderTop: '1px dotted', height: `${context.baseHeight / 2}px` }}/>
              </>
            ))}
            {props.children}
          </div>
        </div>
      )}
    </ScheduleTableContext.Consumer>
  );
}
