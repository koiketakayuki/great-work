import { configure } from '@storybook/react';

function loadStories() {
  require('../stories/Button.story');
  require('../stories/TextForm.story');
  require('../stories/PasswordForm.story');
  require('../stories/TextArea.story');
  require('../stories/CompositeForm.story');
}

configure(loadStories, module);
