import { Color, FontSizeProperty } from 'csstype';

export interface StyleConfig {
  primary: Color;
  secondary: Color;
  white: Color;
  disabled: Color;
  fontSizeLarge: FontSizeProperty<string>;
  fontSizeMedium: FontSizeProperty<string>;
  fontSizeSmall: FontSizeProperty<string>;
}
