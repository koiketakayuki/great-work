import { configure } from '@storybook/react';

function loadStories() {
  require('../stories/GreatWork');
}

configure(loadStories, module);
