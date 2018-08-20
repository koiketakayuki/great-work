import * as React from 'react';

export const Container = (props: { padding?: string, children?: React.ReactNode }) =>
  <div style={{ padding: props.padding || '10px' }}>{props.children}</div >;
