import * as React from 'react';
import { create } from 'react-test-renderer';
import { GreatWork } from '../src/components/GreatWork';

test('Say my name, say my name...', () => {
  const tree1 = create(
      <GreatWork name="Ryutaro" />,
  ).toJSON();
  expect(tree1).toMatchSnapshot();
});
