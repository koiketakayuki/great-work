import * as React from 'react';

const style: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-end',
};

export function Right(props: { children: React.ReactNode }) {
  return <div style={style}>{props.children}</div>;
}
