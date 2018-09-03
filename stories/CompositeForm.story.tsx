import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { CompositeForm } from '../src/components/form/CompositeForm';
import { TextFormEntry } from '../src/components/form/TextFormEntry';
import { TextAreaEntry } from '../src/components/form/TextAreaEntry';
import { RadioButtonsEntry } from '../src/components/form/RadioButtonsEntry';
import { SelectBoxEntry } from '../src/components/form/SelectBoxEntry';
import { ListFormEntry } from '../src/components/form/ListFormEntry';
import { CheckListEntry } from '../src/components/form/CheckListEntry';
import { CompositeFormEntry } from '../src/components/form/CompositeFormEntry';
import { Paper } from '../src/components/Paper';
import { TextForm } from '../src/components/form/TextForm';
import { ValueChangeHandler } from '../src/components/form/Form';
import { Validation } from '../src/components/form/Validation';
import { TextFormProps } from '../src/components/form/createTextForm';
import { ColorType } from '../src/config/StyleConfig';

const story = storiesOf('CompositeForm', module);
story.addDecorator(withInfo({ inline: true }));
const lengthValidator = <T extends any>(value: T) => value.length > 10 ? 'Value must not be greater than 10 characters' : undefined;

type User = {
  id: number,
  name: string,
  address: string,
  check: string,
  checks: number[],
  readonly: boolean,
  disabled: boolean,
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

class UserForm extends React.Component<{ user: User, onChange?: ValueChangeHandler<User>, type?: ColorType }> {

  render() {
    const user = this.props.user;
    const booleanOptions = [
      { value: true, label: 'true' },
      { value: false, label: 'false' },
    ];

    return (
      <CompositeForm<User> value={user} onChange={this.props.onChange} disabled={user.disabled} readonly={user.readonly}>
        <SelectBoxEntry<User, boolean>
          id="readonly"
          label="Readonly"
          value={user.readonly}
          options={booleanOptions}
          disabled={false}
          readonly={false}
        />
        <SelectBoxEntry<User, boolean>
          id="disabled"
          label="Disabled"
          value={user.disabled}
          options={booleanOptions}
          disabled={false}
          readonly={false}
        />
        <CheckListEntry<User, number> id="checks" label="Checks" value={user.checks} options={checkOptions}/>
        <SelectBoxEntry<User, string> id="check" label="Check" value={user.check} options={options}/>
        <RadioButtonsEntry<User, string> id="check" label="Check" value={user.check} options={options}/>
        <TextFormEntry<User> id="name" label="Name" value={user.name}/>
        <TextAreaEntry<User> id="address" label="Address" value={user.address}/>
      </CompositeForm>
    );
  }
}

const alwaysError = () => 'Error!';
type TestState = { users: User[], user: User, names: string[] };

class CompositeFormDemo extends React.Component<{ onChange?: ValueChangeHandler<User> }, TestState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      users: [
        {
          id: 1,
          name: 'test',
          address: 'string',
          check: 'test',
          checks: [1],
          readonly: false,
          disabled: false,
        },
      ],
      user: {
        id: 2,
        name: 'test',
        address: 'test',
        check: 'test',
        checks: [2],
        readonly: false,
        disabled: false,
      },
      names: ['test', 'test2'],
    };
  }

  onChange = (result: { users: User[], names: string[] }) => {
    console.log(result);
    this.setState(result);
  }

  render() {
    const user = this.state.user;
    const users = this.state.users;
    const names = this.state.names;

    return (
      <CompositeForm<TestState> value={this.state} onChange={this.onChange}>
        <CompositeFormEntry<TestState, User> id="user" value={this.state.user} label="User">
          <UserForm user={this.state.user}/>
        </CompositeFormEntry>
        <ListFormEntry<TestState, User>
          addText="Add User"
          id="users"
          label="Users"
          value={users}
          default={{ id: 2, name: '', address: '', check: '', checks: [], readonly: false, disabled: false }}
          keyParameter="id"
          type="secondary"
          deletable={true}
        >
          {props => <Paper><UserForm user={props.value} {...props}/></Paper>}
        </ListFormEntry>
        <ListFormEntry<TestState, string>
          id="names"
          label="Names"
          value={this.state.names}
          type="secondary"
        >
          {props => <TextForm {...props}/>}
        </ListFormEntry>
      </CompositeForm>
    );
  }
}

story.add('disabled', () => (
  <CompositeFormDemo />
));
