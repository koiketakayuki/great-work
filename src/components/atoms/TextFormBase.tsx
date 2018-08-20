import * as React from 'react';
import radium from 'radium';
import { StyleConfig } from '../../config/StyleConfig';
import { Color } from 'csstype';

export interface TextFormBaseProps {
  value: string;
  color: Color;
  onChange?: (value: string) => void;
  config: StyleConfig;
}

export const TextFormBase = radium(class extends React.Component<TextFormBaseProps> {

  constructor(props: TextFormBaseProps) {
    super(props);
  }

  get style() {
    return {
      color: this.props.color,
      display: 'block',
      border: 'none',
      padding: '0',
      margin: '0',
      outline: 'none',
      width: '100%',
      background: 'transparent',
      fontSize: this.props.config.fontSizeMedium,
      ':focus': {
        opacity: 0.8,
      },
    };
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;

    if (this.props.onChange !== undefined) {
      this.props.onChange(value);
    }
  }

  render() {
    return <input type="text" value={this.props.value} style={this.style} onChange={this.onChange}/>;
  }
});
