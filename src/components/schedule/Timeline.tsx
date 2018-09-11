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
          <div style={{ height: context.headerHeight }}>{props.label}</div>
          <div style={{  position: 'relative', border: '1px solid', borderTop: 'none' }}>
            {range(context.from, context.to).map(() => (
              <>
                <div style={{ borderTop: '1px solid', height: `calc(${context.baseHeight} / 2)` }}/>
                <div style={{ borderTop: '1px dotted', height: `calc(${context.baseHeight} / 2)` }}/>
              </>
            ))}
            {props.children}
          </div>
        </div>
      )}
    </ScheduleTableContext.Consumer>
  );
}
