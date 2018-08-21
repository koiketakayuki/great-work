import * as React from 'react';
import { Row } from '../layout/Row';
import { FixedCell, FlexCell } from '../layout/Cell';
import { Icon } from './Icon';
import { Text } from './Text';
import { StyleConfig } from '../../config/StyleConfig';
import { Container } from '../layout/Container';
import { CursorProperty, Color } from 'csstype';

export interface IconTextProps {
  icon: string;
  text: string;
  color?: Color;
  cursor?: CursorProperty;
  hover?: object;
  onClick?: React.MouseEventHandler;
  config: StyleConfig;
}

export const IconText = (props: IconTextProps) => (
  <Row hover={props.hover} cursor={props.cursor} onClick={props.onClick}>
    <FixedCell>
      <Row>
        <Icon name={props.icon} config={props.config} color={props.color}/>
      </Row>
    </FixedCell>
    <FlexCell>
      <Container padding="0 4px">
        <Text config={props.config} color={props.color}>{props.text}</Text>
      </Container>
    </FlexCell>
  </Row>
);
