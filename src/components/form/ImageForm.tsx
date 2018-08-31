import * as React from 'react';
import { WidthProperty, HeightProperty } from 'csstype';
import { FormProps } from './Form';

export interface ImageFormProps extends FormProps<string> {
  width: WidthProperty<string>;
  height: HeightProperty<string>;
}

export class ImageForm extends React.Component<ImageFormProps> {

  private input: HTMLInputElement | null = null;

  public static defaultProps = {
    width: '120px',
    height: '120px',
  };

  getStyle() {
    return {
      width: this.props.width,
      height: this.props.height,
      cursor: 'pointer',
      zIndex: 1,
    };
  }

  onChange = () => {
    const input = this.input;
    const files = input ? input.files : null;
    const onChange = this.props.onChange;

    if (files !== null && onChange) {
      if (files.length > 0) {
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            onChange(reader.result);
          }
        };
      }
    }
  }

  onClick = () => {
    if (this.input) {
      this.input.click();
    }
  }

  render() {
    return (
      <div style={this.getStyle()}>
        <input type="file" ref={ref => this.input = ref} onChange={this.onChange} style={{ display: 'none' }}/>
        <img src={this.props.value} style={this.getStyle()} onClick={this.onClick}/>
      </div>
    );
  }
}
