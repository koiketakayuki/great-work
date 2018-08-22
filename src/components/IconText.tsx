import * as React from 'react';
import { Row } from './layout/Row';
import { FixedCell, FlexCell } from './layout/Cell';
import { Icon } from './Icon';
import { Text } from './Text';
import { ColorType } from '../config/StyleConfig';
import { Container } from './layout/Container';
import { CursorProperty } from 'csstype';

export interface IconTextProps {
  icon: string;
  text: string;
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
        <Icon name={props.icon} type={props.type}/>
      </Row>
    </FixedCell>
    <FlexCell>
      <Container padding="0 4px">
        <Text type={props.type}>{props.text}</Text>
      </Container>
    </FlexCell>
  </Row>
);
