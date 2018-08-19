import * as React from 'react';
import { ButtonBase } from './ButtonBase';
import { ButtonSkinName, getSkin, ButtonSkin } from './ButtonSkin';
import { ButtonFrameName, ButtonFrame, getButtonFrame } from './ButtonFrame';
import { StyleConfig } from '../../config/StyleConfig';

export type ButtonProp = {
  onClick?: React.MouseEventHandler
  frame?: ButtonFrameName;
  skin?: ButtonSkinName;
  disabled?: boolean;
  config: StyleConfig
};

export class Button extends React.Component<ButtonProp> {

  get onClick(): React.MouseEventHandler | undefined {
    if (!this.props.disabled) {
      return this.props.onClick;
    }
  }

  render() {
    const skin: ButtonSkin = getSkin(this.props.config, this.props.skin, this.props.disabled);
    const frame: ButtonFrame = getButtonFrame(this.props.config, this.props.frame);

    return (
      <ButtonBase
        skin={skin}
        frame={frame}
        onClick={this.onClick}
      >{this.props.children}
      </ButtonBase>
    );
  }
}
