import { configure } from '@storybook/react';

function loadStories() {
  require('../stories/TextForm.story');
  require('../stories/PasswordForm.story');
  require('../stories/TextArea.story');
}

configure(loadStories, module);
