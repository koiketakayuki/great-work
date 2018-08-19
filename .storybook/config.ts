import { configure } from '@storybook/react';

function loadStories() {
  require('../stories/GreatWork');
  require('../stories/Text.story');
  require('../stories/Heading.story');
  require('../stories/Link.story');
}

configure(loadStories, module);
