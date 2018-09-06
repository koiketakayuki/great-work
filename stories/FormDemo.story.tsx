import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { FormContainer } from '../src/components/form/FormContainer';
import { FormItem } from '../src/components/form/FormItem';
import { ImageForm } from '../src/components/form/ImageForm';
import { TextForm } from '../src/components/form/TextForm';
import { PasswordForm } from '../src/components/form/PasswordForm';
import { SelectBox } from '../src/components/form/SelectBox';
import { CheckList } from '../src/components/form/CheckList';
import { RadioButtons } from '../src/components/form/RadioButtons';
import { ListForm } from '../src/components/form/ListForm';
import { FormProps, SelectOption } from '../src/components/form/Form';
import { Row } from '../src/components/layout/Row';
import { Paper } from '../src/components/Paper';
import { FlexCell, FixedCell } from '../src/components/layout/Cell';

const story = storiesOf('FormDemo', module);
story.addDecorator(withInfo({ inline: true }));

interface User {
  id: number;
  image: string;
  name: string;
  password: string;
  age: number;
  gender: Gender;
  skills: Skill[];
  otherSkills: string[];
}

interface FormState {
  users: User[];
}

type Gender = 'Male' | 'Female' | 'Other' | 'Prefer not to say';
const genders: Gender[] = ['Male', 'Female', 'Other', 'Prefer not to say'];
const genderOptions: SelectOption<Gender>[] = genders.map((g: Gender) => ({ value: g, label: g }));

type Skill = 'Lisp' | 'Haskell' | 'C' | 'C++' | 'Java' | 'Ruby' | 'Python';
const skills: Skill[] = ['Lisp', 'Haskell', 'C', 'C++', 'Java', 'Ruby', 'Python'];
const skillOptions: SelectOption<Skill>[] = skills.map((s: Skill) => ({ value: s, label: s }));

const lengthValidator = (value: string) => value.length > 10 ? 'error' : undefined;
const ageOptions = [
  {
    value: 10,
    label: '10',
  },
  {
    value: 20,
    label: '20',
  },
  {
    value: 30,
    label: '30',
  },
  {
    value: 40,
    label: '40',
  },
];

class UserForm extends React.Component<FormProps<User>> {

  createOtherSkillForm = (props: FormProps<string>) => <TextForm {...props}/>;

  onUserChange = (partial: Partial<User>) => {
    if (this.props.onChange) {
      const user: User = Object.assign({}, this.props.value, partial);
      this.props.onChange(user);
    }
  }

  onImageChange = (image: string) => this.onUserChange({ image });
  onNameChange = (name: string) => this.onUserChange({ name });
  onPasswordChange = (password: string) => this.onUserChange({ password });
  onAgeChange = (age: number) => this.onUserChange({ age });
  onGenderChange = (gender: Gender) => this.onUserChange({ gender });
  onSkillsChange = (skills: Skill[]) => this.onUserChange({ skills });
  onOtherSkillsChange = (otherSkills: string[]) => this.onUserChange({ otherSkills });

  render() {
    return (
      <Paper>
        <FormContainer>
          <div>{this.props.value.id}</div>
          <FormItem label="Image">
            <ImageForm value={this.props.value.image} onChange={this.onImageChange}/>
          </FormItem>
          <FormItem label="Name">
            <TextForm value={this.props.value.name} onChange={this.onNameChange}/>
          </FormItem>
          <FormItem label="Password">
            <PasswordForm value={this.props.value.password} onChange={this.onPasswordChange}/>
          </FormItem>
          <FormItem label="Age">
            <SelectBox<number>
              value={this.props.value.age}
              options={ageOptions}
              onChange={this.onAgeChange}
            />
          </FormItem>
          <FormItem label="Gender">
            <RadioButtons<Gender>
              value={this.props.value.gender}
              options={genderOptions}
              onChange={this.onGenderChange}
            />
          </FormItem>
          <FormItem label="Skills">
            <CheckList<Skill>
              value={this.props.value.skills}
              options={skillOptions}
              onChange={this.onSkillsChange}
            />
          </FormItem>
          <FormItem label="Other Skills">
            <ListForm<string>
              value={this.props.value.otherSkills}
              onChange={this.onOtherSkillsChange}
              createChildForm={this.createOtherSkillForm}
              addText="Add Skill"
              default=""
              deletable={true}
            />
          </FormItem>
        </FormContainer>
      </Paper>
    );
  }
}

const defaultUserProfile: User = {
  id: 0,
  image: 'https://wallpaperbrowse.com/media/images/3848765-wallpaper-images-download.jpg',
  name: 'John',
  password: 'secret',
  age: 20,
  gender: 'Male',
  skills: [],
  otherSkills: [],
};

class FormDemo extends React.Component<{}, FormState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      users: [defaultUserProfile],
    };
  }

  createUserForm = (props: FormProps<User>) => <UserForm {...props}/>;
  onUsersChange = (users: User[]) => {
    console.log(users);
    this.setState({ users });
  }

  getDefaultValue = () => {
    const maxId = this.state.users.reduce((acc, user) => Math.max(acc, user.id), 0);
    return Object.assign({}, defaultUserProfile, { id: maxId + 1 });
  }

  render() {
    return (
      <ListForm<User>
        value={this.state.users}
        onChange={this.onUsersChange}
        createChildForm={this.createUserForm}
        addText="Add User"
        default={this.getDefaultValue}
        deletable={true}
        keyParameter="id"
      />
    );
  }
}

story.add('disabled', () => (
  <FormDemo />
));
