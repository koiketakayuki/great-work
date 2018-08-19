import { Color, FontSizeProperty } from 'csstype';

export interface StyleConfig {
  primary: Color;
  secondary: Color;
  white: Color;
  disabled: Color;
  fontColor: Color;
  disabledFontColor: Color;
  heading1: FontSizeProperty<string>;
  heading2: FontSizeProperty<string>;
  heading3: FontSizeProperty<string>;
  heading4: FontSizeProperty<string>;
  heading5: FontSizeProperty<string>;
  fontSizeLarge: FontSizeProperty<string>;
  fontSizeMedium: FontSizeProperty<string>;
  fontSizeSmall: FontSizeProperty<string>;
}
