import { configure } from '@storybook/react';

function loadStories() {
  require('../stories/TextForm.story');
}

configure(loadStories, module);
