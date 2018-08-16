import * as React from 'react';

export interface HelloProps { name: string; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class GreatWork extends React.Component<HelloProps> {
  render() {
    return <h1>GreatWork {this.props.name}!</h1>;
  }
}
