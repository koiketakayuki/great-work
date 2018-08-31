import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { ImageForm } from '../src/components/form/ImageForm';

const story = storiesOf('ImageForm', module);

class ImageFormDemo extends React.Component<{}, { value: string }> {

  constructor(props: {}) {
    super(props);
    this.state = { value: '' };
  }

  onChange = (value: string) => {
    this.setState({ value });
  }

  render () {
    return (
      <ImageForm value={this.state.value} onChange={this.onChange}/>
    );
  }
}

story.addDecorator(withInfo({ inline: true }));
story.add('normal', () => <ImageForm value=""/>);
story.add('onChange', () => <ImageFormDemo/>);
