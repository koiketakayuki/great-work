import { Color, CursorProperty } from 'csstype';
import { StyleConfig } from '../../config/StyleConfig';

export type ButtonSkinName = 'primary' | 'secondary';

export interface ButtonSkin {
  color: Color;
  backgroundColor: Color;
  cursor: CursorProperty;
  ':hover'?: object;
}

function getPrimarySkin(config: StyleConfig): ButtonSkin {
  return {
    color: config.white,
    backgroundColor: config.primary,
    cursor: 'pointer',
    ':hover': {
      opacity: 0.8,
    },
  };
}

function getSecondarySkin(config: StyleConfig): ButtonSkin {
  return {
    color: config.white,
    backgroundColor: config.secondary,
    cursor: 'pointer',
    ':hover': {
      opacity: 0.8,
    },
  };
}

function getDisabledSkin(config: StyleConfig): ButtonSkin {
  return {
    color: config.white,
    backgroundColor: config.disabled,
    cursor: 'not-allowed',
  };
}

export function getSkin(config: StyleConfig, skinName?: ButtonSkinName, disabled?: boolean): ButtonSkin {
  if (disabled) {
    return getDisabledSkin(config);
  }

  if (skinName === 'secondary') {
    return getSecondarySkin(config);
  }

  return getPrimarySkin(config);
}
