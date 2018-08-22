import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { DefaultStyleConfig as config } from '../src/config/DefaultStyleConfig';
import { Paper } from '../src/components/atoms/Paper';
import { Container } from '../src/components/layout/Container';
import { Section } from '../src/components/layout/Section';
import { TextForm } from '../src/components/atoms/form/TextForm';

const story = storiesOf('Form', module);

class TextFormDemo extends React.Component<{}, { value: string, readonly: boolean, disabled: boolean }> {
  constructor(props: {}) {
    super(props);
    this.state = {
      value: '',
      readonly: true,
      disabled: true,
    };
  }

  onChange = (value: string, errorMessage: string | undefined) => {
    this.setState({ value });
  }

  validate = (value: string): string | undefined => {
    if (value.length > 10) {
      return 'Value must not be greater than 10 character length';
    }
  }

  render() {
    return (
      <Paper config={config}>
        <Container>
          <Section label="TextForm" config={config}>
            <TextForm value={this.state.value} config={config} onChange={this.onChange}/>
            <Container>
              <Section label="color" config={config}>
                <TextForm value={this.state.value} config={config} onChange={this.onChange} type="primary"/>
                <TextForm value={this.state.value} config={config} onChange={this.onChange} type="secondary"/>
              </Section>
              <Section label="readonly" config={config}>
                <TextForm value={this.state.value} config={config} onChange={this.onChange} readonly={true}/>
              </Section>
              <Section label="disabled" config={config}>
                <TextForm value={this.state.value} config={config} onChange={this.onChange} disabled={true}/>
              </Section>
              <Section label="validation" config={config}>
                <TextForm value={this.state.value} config={config} onChange={this.onChange} validator={this.validate}/>
              </Section>
            </Container>
          </Section>
        </Container>
      </Paper>
    );
  }
}

story.add('TextForm', () => <TextFormDemo/>);
