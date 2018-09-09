import * as React from 'react';
import { mount } from 'enzyme';
import { TextForm } from '../src/components/GreatWork';

describe('TextForm', () => {
  it('has input text tag', () => {
    const wrapper = mount(<TextForm value="before"/>);
    expect(wrapper.find('input[type="text"]').length).toBe(1);
  });

  it('doesn\'t have input tag when readonly', () => {
    const wrapper = mount(<TextForm value="before" readonly={true}/>);
    expect(wrapper.find('input[type="text"]').length).toBe(0);
  });

  it('onChange is called when value is changed', () => {
    const afterValue = 'after';
    const onChangeSpy = jest.fn();
    const wrapper = mount(<TextForm value="before" onChange={onChangeSpy}/>);

    wrapper.find('input').simulate('change', { target: { value: afterValue } });
    expect(onChangeSpy).toBeCalledWith(afterValue);
  });

  it('onChange is not called when value is changed but TextForm is disabled', () => {
    const afterValue = 'after';
    const onChangeSpy = jest.fn();
    const wrapper = mount(<TextForm value="before" onChange={onChangeSpy} disabled={true}/>);

    wrapper.find('input').simulate('change', { target: { value: afterValue } });
    expect(onChangeSpy).not.toBeCalled();
  });
});
