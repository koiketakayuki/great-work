import * as React from 'react';
import { range } from '../../lib/util';

export interface ScheduleTableProps {
  baseWidth: number;
  baseHeight: number;
  headerHeight: number;
  children: React.ReactNode;
  from: number;
  to: number;
}

export function ScheduleTable(props: ScheduleTableProps) {
  return (
    <ScheduleTableContext.Provider
      value={{
        baseWidth: props.baseWidth,
        baseHeight: props.baseHeight,
        headerHeight: props.headerHeight,
        from: props.from,
        to: props.to,
      }}
    >
      <div style={{ display: 'flex', boxSizing: 'border-box' }}>
        <div style={{ marginTop: `${props.headerHeight - 10}px` }}>
          {range(props.from, props.to).map(hour => (
            <div key={hour} style={{ height: `${props.baseHeight}px` }}>{hour}:00</div>
          ))}
        </div>
        {props.children}
      </div>
    </ScheduleTableContext.Provider>
  );
}

export interface ScheduleTableContextValue {
  baseWidth: number;
  baseHeight: number;
  headerHeight: number;
  from: number;
  to: number;
}

export const ScheduleTableContext = React.createContext<ScheduleTableContextValue>({
  baseWidth: 200,
  baseHeight: 100,
  headerHeight: 40,
  from: 9,
  to: 18,
});
