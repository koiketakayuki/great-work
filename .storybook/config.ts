import { configure } from '@storybook/react';

function loadStories() {
  require('../stories/Paper.story');
  require('../stories/IconText.story');
  require('../stories/Button.story');
  require('../stories/CheckBox.story');
  require('../stories/TextForm.story');
  require('../stories/PasswordForm.story');
  require('../stories/TextArea.story');
  require('../stories/RadioButtons.story');
  require('../stories/CompositeForm.story');
}

configure(loadStories, module);
