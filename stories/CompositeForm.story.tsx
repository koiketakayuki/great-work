import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { CompositeForm } from '../src/components/form/CompositeForm';
import { TextFormEntry } from '../src/components/form/TextFormEntry';
import { PasswordFormEntry } from '../src/components/form/PasswordFormEntry';
import { TextAreaEntry } from '../src/components/form/TextAreaEntry';
import { RadioButtonsEntry } from '../src/components/form/RadioButtonsEntry';
import { SelectBoxEntry } from '../src/components/form/SelectBoxEntry';
import { CheckListEntry } from '../src/components/form/CheckListEntry';

const story = storiesOf('CompositeForm', module);
story.addDecorator(withInfo({ inline: true }));
const lengthValidator = () => 'Hello!';

type TestType = {
  id: number,
  name: string;
  password: string;
  content: string;
  checks: number[];
};

const options = [
  { label: '1', value: 'test' },
  { label: '2', value: 'testtestest' },
  { label: '3', value: 'testtestestestest' },
];

const checkOptions = [
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 },
  { label: '6', value: 6 },
  { label: '7', value: 7 },
  { label: '8', value: 8 },
  { label: '9', value: 9 },
];

class CompositeFormDemo extends React.Component<{}, { value: TestType}> {

  constructor(props: {}) {
    super(props);
    this.state = {
      value: {
        id: 1,
        name: 'test',
        password: 'test',
        content: 'test',
        checks: [],
      },
    };
  }

  onChange = (value: TestType) => {
    console.log(value);
    this.setState({ value });
  }

  render() {
    const value = this.state.value;
    return (
      <CompositeForm value={value} onChange={this.onChange}>
        <TextFormEntry id="name" value={value.name} label="氏名" validator={lengthValidator}/>
        <TextFormEntry id="password" value={value.password} label="パスワード" validator={lengthValidator}/>
        <PasswordFormEntry id="password" value={value.password} label="パスワード" validator={lengthValidator}/>
        <RadioButtonsEntry id="password" value={value.password} options={options} label="パスワード" validator={lengthValidator}/>
        <SelectBoxEntry id="password" value={value.password} options={options} label="パスワード" validator={lengthValidator}/>
        <CheckListEntry id="checks" value={value.checks} options={checkOptions} label="チェック" validator={lengthValidator}/>
        <TextAreaEntry id="content" value={value.content} label="本文" validator={lengthValidator}/>
      </CompositeForm>
    );
  }
}

story.add('disabled', () => (
  <CompositeFormDemo />
));
