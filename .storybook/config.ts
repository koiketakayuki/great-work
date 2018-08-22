import { configure } from '@storybook/react';

function loadStories() {
  require('../stories/Form.story');
}

configure(loadStories, module);
