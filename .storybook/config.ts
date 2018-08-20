import { configure } from '@storybook/react';

function loadStories() {
  require('../stories/Text.story');
  require('../stories/Heading.story');
  require('../stories/Link.story');
  require('../stories/CheckBox.story');
  require('../stories/TextForm.story');
  require('../stories/Icon.story');
  require('../stories/IconText.story');
}

configure(loadStories, module);
