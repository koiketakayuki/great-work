import * as React from 'react';
import { StyleConfig } from '../../config/StyleConfig';
import { TextFormBase } from '../atoms/TextFormBase';
import { Color } from 'csstype';
import { ErrorMessage } from '../atoms/ErrorMessage';
import { Container } from '../layout/Container';
import { Paper } from '../atoms/Paper';

export interface TextFormProp {
  value: string;
  onChange?: (value: string, errorMessage?: string) => void;
  validator?: (value: string) => string | undefined;
  config: StyleConfig;
}

export interface TextFormState {
  errorMessage?: string;
}

export class TextForm extends React.Component<TextFormProp, TextFormState> {

  constructor(prop: TextFormProp) {
    super(prop);
    this.state = {
      errorMessage: undefined,
    };
  }

  onChange = (value: string) => {
    let errorMessage: string | undefined = undefined;

    if (this.props.validator) {
      errorMessage = this.props.validator(value);

      if (errorMessage !== undefined) {
        this.setState({
          errorMessage,
        });
      } else {
        this.setState({
          errorMessage: undefined,
        });
      }
    }

    if (this.props.onChange) {
      this.props.onChange(value, errorMessage);
    }
  }

  private getErrorMessage() {
    if (this.state.errorMessage) {
      return (
        <Container padding="6px 0">
          <ErrorMessage config={this.props.config}>{this.state.errorMessage}</ErrorMessage>
        </Container>
      );
    }
  }

  private getColor(): Color {
    return this.state.errorMessage ? this.props.config.errorFontColor : this.props.config.fontColor;
  }

  private getBackgroundColor(): Color | undefined {
    return this.state.errorMessage ? this.props.config.error : undefined;
  }

  render() {
    const color: Color = this.getColor();

    return (
      <div>
        <Paper config={this.props.config}>
          <Container padding="6px">
            <TextFormBase
              value={this.props.value}
              color={color}
              onChange={this.onChange}
              config={this.props.config}
            />
          </Container>
        </Paper>
        {this.getErrorMessage()}
      </div>
    );
  }
}
