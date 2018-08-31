import * as React from 'react';
import { Row } from './layout/Row';
import { FixedCell, FlexCell } from './layout/Cell';
import { IconProps } from './Icon';
import { TextProps } from './Text';
import { ColorType } from '../config/StyleConfig';
import { Container } from './layout/Container';
import { CursorProperty } from 'csstype';

export interface IconTextProps {
  icon: React.ReactElement<IconProps>;
  text: React.ReactElement<TextProps>;
  type?: ColorType;
  cursor?: CursorProperty;
  hover?: object;
  onClick?: React.MouseEventHandler;
  onKeyDown?: React.KeyboardEventHandler;
  tabIndex?: number;
  left?: boolean;
}

export const IconText = (props: IconTextProps) => (
  <Row hover={props.hover} cursor={props.cursor} onClick={props.onClick} tabIndex={props.tabIndex} onKeyDown={props.onKeyDown}>
    <FixedCell>
      <Row>
        {props.icon}
      </Row>
    </FixedCell>
    <FlexCell>
      <Container padding="0 4px">
        {props.text}
      </Container>
    </FlexCell>
  </Row>
);
