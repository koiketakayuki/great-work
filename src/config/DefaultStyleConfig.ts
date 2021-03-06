import { StyleConfig, ColorType, ColorContext } from './StyleConfig';
import { Color } from 'csstype';

export const DefaultStyleConfig: StyleConfig = {
  primary: '#00A5E1',
  secondary: '#47c747',
  white: '#ffffff',
  disabled: '#e8e8e8',
  error: '#ffedf2',
  fontColor: '#333333',
  disabledFontColor: '#888888',
  errorFontColor: '#ff0000',
  borderColor: 'red',
  heading1: '3.0rem',
  heading2: '2.2rem',
  heading3: '1.8rem',
  heading4: '1.4rem',
  heading5: '1.0rem',
  fontSizeLarge: '1.2rem',
  fontSizeMedium: '1.0rem',
  fontSizeSmall: '0.8rem',

  getColor(type?: ColorType): Color {
    if (type === 'primary') {
      return this.primary;
    }

    if (type === 'secondary') {
      return this.secondary;
    }

    if (type === 'error') {
      return this.errorFontColor;
    }

    if (type === 'disabled') {
      return this.disabledFontColor;
    }

    if (type === 'default') {
      return this.fontColor;
    }

    return 'inherit';
  },
  getColorContext(type: ColorType): ColorContext {
    if (type === 'primary') {
      return {
        color: this.white,
        backgroundColor: this.primary,
      };
    }

    if (type === 'secondary') {
      return {
        color: this.white,
        backgroundColor: this.secondary,
      };
    }

    if (type === 'error') {
      return {
        color: this.errorFontColor,
        backgroundColor: this.error,
      };
    }

    if (type === 'disabled') {
      return {
        color: this.disabledFontColor,
        backgroundColor: this.disabled,
      };
    }

    return {
      color: 'inherit',
      backgroundColor: 'transparent',
    };
  },
};
