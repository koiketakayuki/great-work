import * as React from 'react';

export interface HelloProps { name: string; }

export class GreatWork extends React.Component<HelloProps> {
  render() {
    return <h1>GreatWork {this.props.name}!</h1>;
  }
}
