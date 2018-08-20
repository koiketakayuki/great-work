import * as React from 'react';

export const FixedCell = (props: { children: React.ReactNode }) =>
  <div style={{ flexGrow: 0, flexShrink: 0 }}>{props.children}</div>;

export const FlexCell = (props: { children: React.ReactNode }) =>
  <div style={{ flexGrow: 1 }}>{props.children}</div>;
