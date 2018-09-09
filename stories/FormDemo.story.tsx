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
import { Container } from '../src/components/layout/Container';
import { Button } from '../src/components/Button';
import { IconButton } from '../src/components/IconButton';
import { Icon } from '../src/components/Icon';
import { DatePicker } from '../src/components/form/DatePicker';
import { range } from '../src/lib/util';

const story = storiesOf('FormDemo', module);
story.addDecorator(withInfo({ inline: true }));

const yearOptions = range(2000, 2018).map(y => ({ value: y, label: String(y) }));

interface User {
  id: number;
  image: string;
  name: string;
  password: string;
  birthdate: Date;
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

const booleanOptions: SelectOption<boolean>[] = [
  {
    value: true,
    label: 'true',
  },
  {
    value: false,
    label: 'false',
  },
];

class UserForm extends React.Component<FormProps<User> & { actions?: React.ReactNode }, { readonly: boolean, disabled: boolean }> {

  constructor(props: FormProps<User>) {
    super(props);
    this.state = {
      readonly: false,
      disabled: false,
    };
  }

  createOtherSkillForm = (index: number, props: FormProps<string>, onDelete: () => void) => {
    if (props.disabled || props.readonly) {
      return <TextForm {...props} key={index}/>;
    }

    return (
      <Row key={index}>
        <FlexCell>
          <TextForm {...props}/>
        </FlexCell>
        <FixedCell>
          <Container padding="0 10px">
            <Button type="error" onClick={onDelete}>Delete</Button>
          </Container>
        </FixedCell>
      </Row>
    );
  }

  onUserChange = (partial: Partial<User>) => {
    if (this.props.onChange) {
      const user: User = Object.assign({}, this.props.value, partial);
      this.props.onChange(user);
    }
  }

  onImageChange = (image: string) => this.onUserChange({ image });
  onNameChange = (name: string) => this.onUserChange({ name });
  onPasswordChange = (password: string) => this.onUserChange({ password });
  onBirthdateChange = (birthdate: Date) => this.onUserChange({ birthdate });
  onAgeChange = (age: number) => this.onUserChange({ age });
  onGenderChange = (gender: Gender) => this.onUserChange({ gender });
  onSkillsChange = (skills: Skill[]) => this.onUserChange({ skills });
  onOtherSkillsChange = (otherSkills: string[]) => this.onUserChange({ otherSkills });

  onReadonlyChange = (readonly: boolean) => this.setState({ readonly });
  onDisabledChange = (disabled: boolean) => this.setState({ disabled });

  render() {

    const props = this.props;

    return (
      <Paper>
        <Container>
          <div style={{ position: 'absolute', right: '12px', top: '12px', zIndex: 1 }}>
            {props.actions}
          </div>
          <FormContainer>
            <FormItem label="Readonly">
              <SelectBox<boolean>
                value={this.state.readonly}
                options={booleanOptions}
                onChange={this.onReadonlyChange}
                disabled={false}
                readonly={false}
              />
            </FormItem>
            <FormItem label="Disabled">
              <SelectBox<boolean>
                value={this.state.disabled}
                options={booleanOptions}
                onChange={this.onDisabledChange}
                disabled={false}
                readonly={false}
              />
            </FormItem>
            <FormItem label="Image">
              <ImageForm
                value={this.props.value.image}
                onChange={this.onImageChange}
                type={this.props.type}
                readonly={this.props.readonly || this.state.readonly}
                disabled={this.props.disabled || this.state.disabled}
              />
            </FormItem>
            <FormItem label="Name">
              <TextForm
                value={this.props.value.name}
                onChange={this.onNameChange}
                type={this.props.type}
                readonly={this.props.readonly || this.state.readonly}
                disabled={this.props.disabled || this.state.disabled}
              />
            </FormItem>
            <FormItem label="Password">
              <PasswordForm
                value={this.props.value.password}
                onChange={this.onPasswordChange}
                type={this.props.type}
                readonly={this.props.readonly || this.state.readonly}
                disabled={this.props.disabled || this.state.disabled}
              />
            </FormItem>
            <FormItem label="Birthdate">
              <DatePicker
                value={this.props.value.birthdate}
                onChange={this.onBirthdateChange}
                yearOptions={yearOptions}
                type={this.props.type}
                readonly={this.props.readonly || this.state.readonly}
                disabled={this.props.disabled || this.state.disabled}
              />
            </FormItem>
            <FormItem label="Age">
              <SelectBox<number>
                value={this.props.value.age}
                options={ageOptions}
                onChange={this.onAgeChange}
                type={this.props.type}
                readonly={this.props.readonly || this.state.readonly}
                disabled={this.props.disabled || this.state.disabled}
              />
            </FormItem>
            <FormItem label="Gender">
              <RadioButtons<Gender>
                value={this.props.value.gender}
                options={genderOptions}
                onChange={this.onGenderChange}
                type={this.props.type}
                readonly={this.props.readonly || this.state.readonly}
                disabled={this.props.disabled || this.state.disabled}
              />
            </FormItem>
            <FormItem label="Skills">
              <CheckList<Skill>
                value={this.props.value.skills}
                options={skillOptions}
                onChange={this.onSkillsChange}
                type={this.props.type}
                readonly={this.props.readonly || this.state.readonly}
                disabled={this.props.disabled || this.state.disabled}
              />
            </FormItem>
            <FormItem label="Other Skills">
              <ListForm<string>
                value={this.props.value.otherSkills}
                onChange={this.onOtherSkillsChange}
                createChildForm={this.createOtherSkillForm}
                addText="Add Skill"
                default=""
                type={this.props.type}
                readonly={this.props.readonly || this.state.readonly}
                disabled={this.props.disabled || this.state.disabled}
              />
            </FormItem>
          </FormContainer>
        </Container>
      </Paper>
    );
  }
}

const defaultUserProfile: User = {
  id: 0,
  image: 'https://wallpaperbrowse.com/media/images/3848765-wallpaper-images-download.jpg',
  name: 'John',
  password: 'secret',
  birthdate: new Date(),
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

  createUserForm = (_: number, props: FormProps<User>, onDelete: () => void) => (
    <UserForm
      key={props.value.id}
      {...props}
      actions={<IconButton icon={<Icon name="highlight_off"/>} onClick={onDelete} type="error"/>}
    />
  )

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
      />
    );
  }
}

story.add('disabled', () => (
  <FormDemo />
));
