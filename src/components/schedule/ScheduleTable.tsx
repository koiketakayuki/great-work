import * as React from 'react';
import { WidthProperty, HeightProperty } from 'csstype';
import { range } from '../../lib/util';

export interface ScheduleTableProps {
  baseWidth: WidthProperty<string>;
  baseHeight: HeightProperty<string>;
  headerHeight: HeightProperty<string>;
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
        <div style={{ marginTop: props.headerHeight }}>
          {range(props.from, props.to).map(hour => (
            <div key={hour} style={{ height: props.baseHeight }}>{hour}:00</div>
          ))}
        </div>
        {props.children}
      </div>
    </ScheduleTableContext.Provider>
  );
}

export interface ScheduleTableContextValue {
  baseWidth: WidthProperty<string>;
  baseHeight: HeightProperty<string>;
  headerHeight: HeightProperty<string>;
  from: number;
  to: number;
}

export const ScheduleTableContext = React.createContext<ScheduleTableContextValue>({
  baseWidth: '200px',
  baseHeight: '100px',
  headerHeight: '40px',
  from: 9,
  to: 18,
});
