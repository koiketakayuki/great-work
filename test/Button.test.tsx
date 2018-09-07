import * as React from 'react';
import { shallow } from 'enzyme';

import { Button } from '../src/components/GreatWork';

describe('Button', () => {
  test('onClick is called when Button is clicked', () => {
    const onClickSpy = jest.fn();
    const wrapper = shallow(<Button onClick={onClickSpy}>test</Button>);
    wrapper.simulate('click');
    expect(onClickSpy).toBeCalled();
  });

  test('onClick is not called when Button is clicked and disabled', () => {
    const onClickSpy = jest.fn();
    const wrapper = shallow(<Button onClick={onClickSpy} disabled={true}>test</Button>);
    wrapper.simulate('click');
    expect(onClickSpy).not.toBeCalled();
  });
});
