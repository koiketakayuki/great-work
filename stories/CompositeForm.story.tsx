import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { CompositeForm } from '../src/components/form/CompositeForm';
import { TextFormEntry } from '../src/components/form/TextFormEntry';
import { TextAreaEntry } from '../src/components/form/TextAreaEntry';
import { ListFormEntry } from '../src/components/form/ListFormEntry';
import { Paper } from '../src/components/Paper';
import { TextForm } from '../src/components/form/TextForm';
import { ValueChangeHandler } from '../src/components/form/Form';
import { Validation } from '../src/components/form/Validation';
import { TextFormProps } from '../src/components/form/createTextForm';

const story = storiesOf('CompositeForm', module);
story.addDecorator(withInfo({ inline: true }));
const lengthValidator = (value: string) => value.length > 10 ? 'Value must not be greater than 10 characters' : undefined;

type User = {
  id: number,
  name: string;
  address: string;
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

class UserForm extends React.Component<{ user: User, onChange?: ValueChangeHandler<User> }> {

  render() {
    const user = this.props.user;

    return (
      <CompositeForm<User> value={user} onChange={this.props.onChange}>
        <TextFormEntry<User> id="name" label="Name" value={user.name}/>
        <TextAreaEntry<User> id="address" label="Address" value={user.address}/>
      </CompositeForm>
    );
  }
}

class CompositeFormDemo extends React.Component<{ onChange?: ValueChangeHandler<User> }, { users: User[], user: User, names: string[] }> {
  constructor(props: {}) {
    super(props);
    this.state = {
      users: [
        {
          id: 1,
          name: 'test',
          address: 'string',
        },
      ],
      user: {
        id: 2,
        name: 'test',
        address: 'test',
      },
      names: ['test', 'test2'],
    };
  }

  onChange = (result: { users: User[], names: string[] }) => {
    console.log(result);
    this.setState(result);
  }

  render() {
    const users = this.state.users;
    const names = this.state.names;
    return (
      <CompositeForm value={{ users, names }} onChange={this.onChange}>
        <ListFormEntry
          addText="Add User"
          id="users"
          label="Users"
          value={users}
          default={{ id: 2, name: '', address: '' }}
          keyParameter="id"
        >
          {props => <Paper><UserForm user={props.value} {...props}/></Paper>}
        </ListFormEntry>
        <ListFormEntry
          addText="Add name"
          id="names"
          label="Names"
          value={names}
          default="John"
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
