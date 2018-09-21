import * as React from 'react';
import { DisplayProperty, CursorProperty } from 'csstype';
import { StyleConfig, ColorType } from '../config/StyleConfig';
import { StyleContext } from '../config/StyleContext';
import { ElevationLevel, Elevation } from './wrapper/Elevation';

export interface PaperProps {
  display?: DisplayProperty;
  children?: React.ReactNode;
  elevation?: ElevationLevel;
  cursor?: CursorProperty;
  type?: ColorType;
  onClick?: React.MouseEventHandler;
  onKeyDown?: React.KeyboardEventHandler;
  tabIndex?: number;
}

function getPaper(config: StyleConfig, props: PaperProps) {
  const style = Object.assign(
    config.getColorContext(props.type || 'default'),
    {
      cursor: props.cursor,
    });
  return (
    <Elevation level={props.elevation || 2} display={props.display}>
      <div style={style} tabIndex={props.tabIndex} onClick={props.onClick} onKeyDown={props.onKeyDown}>{props.children}</div>
    </Elevation>
  );
}

export const Paper = (props: PaperProps) => (
  <StyleContext.Consumer>
    {config => getPaper(config, props)}
  </StyleContext.Consumer>
);
