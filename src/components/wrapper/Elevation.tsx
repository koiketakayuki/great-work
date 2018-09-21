import * as React from 'react';
import { DisplayProperty } from 'csstype';

export interface ElevationProps {
  level: ElevationLevel;
  children: React.ReactNode;
  display?: DisplayProperty;
}

export const Elevation = (props: ElevationProps) => {
  const style = Object.assign(
    {
      display: props.display,
    },
    getStyle(props.level));

  return (
    <div style={style}>
      {props.children}
    </div>
  );
};

export type ElevationLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

const LEVEL1_STYLE = {
  boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)',
};

const LEVEL2_STYLE = {
  boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
};

const LEVEL3_STYLE = {
  boxShadow: '0px 1px 8px 0px rgba(0, 0, 0, 0.2), 0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 3px 3px -2px rgba(0, 0, 0, 0.12)',
};

const LEVEL4_STYLE = {
  boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
};

const LEVEL5_STYLE = {
  boxShadow: '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12)',
};

const LEVEL6_STYLE = {
  boxShadow: '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)',
};

const LEVEL7_STYLE = {
  boxShadow: '0px 4px 5px -2px rgba(0, 0, 0, 0.2), 0px 7px 10px 1px rgba(0, 0, 0, 0.14), 0px 2px 16px 1px rgba(0, 0, 0, 0.12)',
};

const LEVEL8_STYLE = {
  boxShadow: '0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)',
};

function getStyle(level: ElevationLevel): object {
  if (level === 1) {
    return LEVEL1_STYLE;
  }

  if (level === 2) {
    return LEVEL2_STYLE;
  }

  if (level === 3) {
    return LEVEL3_STYLE;
  }

  if (level === 4) {
    return LEVEL4_STYLE;
  }

  if (level === 5) {
    return LEVEL5_STYLE;
  }

  if (level === 6) {
    return LEVEL6_STYLE;
  }

  if (level === 7) {
    return LEVEL7_STYLE;
  }

  if (level === 8) {
    return LEVEL8_STYLE;
  }

  return {};
}
