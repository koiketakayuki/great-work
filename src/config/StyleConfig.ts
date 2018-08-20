import { Color, FontSizeProperty } from 'csstype';

export type ColorType = 'primary' | 'secondary' | 'error' | 'disabled' | 'default';
export type ColorContext = { color: Color; backgroundColor: Color };

export interface StyleConfig {
  primary: Color;
  secondary: Color;
  white: Color;
  disabled: Color;
  error: Color;
  fontColor: Color;
  disabledFontColor: Color;
  errorFontColor: Color;
  borderColor: Color;
  heading1: FontSizeProperty<string>;
  heading2: FontSizeProperty<string>;
  heading3: FontSizeProperty<string>;
  heading4: FontSizeProperty<string>;
  heading5: FontSizeProperty<string>;
  fontSizeLarge: FontSizeProperty<string>;
  fontSizeMedium: FontSizeProperty<string>;
  fontSizeSmall: FontSizeProperty<string>;

  getColor(type?: ColorType): Color;
  getColorContext(type?: ColorType): ColorContext;
}
