import * as React from 'react';
import { shallow } from 'enzyme';

import { Button, Paper } from '../src/components/GreatWork';
import { Container } from '../src/components/layout/Container';
import { ElevationLevel } from '../src/components/wrapper/Elevation';

describe('Button', () => {
  it('child element is rendered', () => {
    const childElement = 'test';
    const wrapper = shallow(<Button>{childElement}</Button>);
    expect(wrapper.find(Container).children().text()).toBe(childElement);
  });

  it('onClick is called when Button is clicked', () => {
    const onClickSpy = jest.fn();
    const wrapper = shallow(<Button onClick={onClickSpy}>test</Button>);
    wrapper.simulate('click');
    expect(onClickSpy).toBeCalled();
  });

  it('onClick is not called when Button is clicked and disabled', () => {
    const onClickSpy = jest.fn();
    const wrapper = shallow(<Button onClick={onClickSpy} disabled={true}>test</Button>);
    wrapper.simulate('click');
    expect(onClickSpy).not.toBeCalled();
  });

  it('has Container', () => {
    const wrapper = shallow(<Button>test</Button>);
    expect(wrapper.find(Container).length).toBe(1);
  });

  it('padding is passed to Container', () => {
    const padding = '8px';
    const wrapper = shallow(<Button padding={padding}>test</Button>);
    const container = wrapper.find(Container);
    expect(container.props().padding).toBe(padding);
  });

  it('has Paper', () => {
    const wrapper = shallow(<Button>test</Button>);
    expect(wrapper.find(Paper).length).toBe(1);
  });

  it('type is passed to Paper', () => {
    const type = 'secondary';
    const wrapper = shallow(<Button type={type}>test</Button>);
    expect(wrapper.find(Paper).props().type).toBe(type);
  });

  it('type passed to Paper becomes disabled when Button is disabled', () => {
    const type = 'secondary';
    const wrapper = shallow(<Button type={type} disabled={true}>test</Button>);
    expect(wrapper.find(Paper).props().type).toBe('disabled');
  });

  it('elevation is passed to Paper', () => {
    const elevationLevel: ElevationLevel = 4;
    const wrapper = shallow(<Button elevation={elevationLevel}>test</Button>);
    expect(wrapper.find(Paper).props().elevation).toBe(elevationLevel);
  });

  it('cursor is pointer', () => {
    const wrapper = shallow(<Button>test</Button>);
    expect(wrapper.find(Paper).props().cursor).toBe('pointer');
  });

  it('cursor becomes "not-allowed" when Button is disabled', () => {
    const wrapper = shallow(<Button disabled={true}>test</Button>);
    expect(wrapper.find(Paper).props().cursor).toBe('not-allowed');
  });
});
