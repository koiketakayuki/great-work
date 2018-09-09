import * as React from 'react';
import { Row } from './layout/Row';
import { FixedCell, FlexCell } from './layout/Cell';
import { IconProps } from './Icon';
import { TextProps } from './Text';
import { ColorType, StyleConfig } from '../config/StyleConfig';
import { Container } from './layout/Container';
import { CursorProperty } from 'csstype';
import { StyleContext } from '../config/StyleContext';

export interface IconTextProps {
  icon: React.ReactElement<IconProps>;
  text: React.ReactElement<TextProps>;
  type?: ColorType;
  cursor?: CursorProperty;
  hover?: object;
  onClick?: React.MouseEventHandler;
  onKeyDown?: React.KeyboardEventHandler;
  tabIndex?: number;
  right?: boolean;
}

function getIconText(config: StyleConfig, props: IconTextProps) {
  const iconCell = (
    <FixedCell>
      <Row>
        {props.icon}
      </Row>
    </FixedCell>
  );

  return (
    <Row
      display="inline-flex"
      alignItems="center"
      color={config.getColor(props.type)}
      hover={props.hover}
      cursor={props.cursor}
      onClick={props.onClick}
      tabIndex={props.tabIndex}
      onKeyDown={props.onKeyDown}
    >
      {props.right ? undefined : iconCell}
      <FlexCell>
        <Container padding="0 4px">
          {props.text}
        </Container>
      </FlexCell>
      {props.right ? iconCell : undefined}
    </Row>
  );
}

export function IconText(props: IconTextProps) {
  return (
    <StyleContext.Consumer>
      {config => getIconText(config, props)}
    </StyleContext.Consumer>
  );
}
