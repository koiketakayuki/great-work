import { StyleConfig } from '../../config/StyleConfig';
import { FontSizeProperty, PaddingProperty, LineHeightProperty, CursorProperty } from 'csstype';

export type ButtonFrameName = 'small' | 'medium' | 'large';

export interface ButtonFrame {
  fontSize: FontSizeProperty<string>;
  padding: PaddingProperty<string>;
  lineHeight: LineHeightProperty<string>;
}

function getSmallButtonFrame(config: StyleConfig): ButtonFrame {
  return {
    padding: '4px 10px',
    lineHeight: '10px',
    fontSize: config.fontSizeSmall,
  };
}

function getMediumButtonFrame(config: StyleConfig): ButtonFrame {
  return {
    padding: '4px 10px',
    lineHeight: '10px',
    fontSize: '14px',
  };
}
function getLargeButtonFrame(config: StyleConfig): ButtonFrame {
  return {
    padding: '4px 10px',
    lineHeight: '10px',
    fontSize: '14px',
  };
}

export function getButtonFrame(config: StyleConfig, frameName?: ButtonFrameName) {
  if (frameName === 'small') {
    return getSmallButtonFrame(config);
  }

  if (frameName === 'large') {
    return getLargeButtonFrame(config);
  }

  return getMediumButtonFrame(config);
}
