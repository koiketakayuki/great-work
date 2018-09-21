import * as React from 'react';

export interface RippleProps {
  initialRadius: number;
  duration?: number;
  onClick?: React.MouseEventHandler;
}

export interface RippleState {
  x: number;
  y: number;
  isSpreading: boolean;
}

export class Ripple extends React.Component<RippleProps, RippleState> {

  private ref: React.RefObject<HTMLDivElement>;

  static defaultProps = {
    duration: 300,
  };

  constructor(props: RippleProps) {
    super(props);
    this.ref = React.createRef<HTMLDivElement>();
    this.state = {
      x: 0,
      y: 0,
      isSpreading: false,
    };
  }

  endEffect = () => {
    this.setState({ isSpreading: false });
  }

  onClick = (e: React.MouseEvent) => {
    if (this.state.isSpreading) {
      this.endEffect();
      return;
    }

    if (this.ref.current) {
      const x = e.pageX - this.ref.current.offsetLeft;
      const y = e.pageY - this.ref.current.offsetTop;
      this.setState({ x, y, isSpreading: true });
    }

    setTimeout(this.endEffect, this.props.duration ? this.props.duration * 2 : 0);

    if (this.props.onClick) {
      this.props.onClick(e);
    }
  }

  render() {
    const child = this.props.children;
    const initialRadius = this.props.initialRadius;
    const duration = this.props.duration;

    const ripple = this.state.isSpreading ? (
      <RippleEffect
        scale={20}
        center={{ x: this.state.x, y: this.state.y }}
        initialRadius={initialRadius}
        duration={duration}
      />
    ) : undefined;

    return (
      <div ref={this.ref} style={{ position: 'relative', overflow: 'hidden' }} onClick={this.onClick}>
        {ripple}
        {child}
      </div>
    );
  }
}

interface RippleEffectProps {
  initialRadius: number;
  scale: number;
  center: {
    x: number,
    y: number,
  };
  duration?: number;
}

class RippleEffect extends React.Component<RippleEffectProps, { isSpreading: boolean }> {

  constructor(props: RippleEffectProps) {
    super(props);
    this.state = { isSpreading: false };
  }

  startEffect = () => {
    this.setState({ isSpreading: true });
  }

  componentDidMount() {
    setTimeout(this.startEffect, 1);
  }

  render() {
    const radius = `${this.props.initialRadius}px`;
    const style: React.CSSProperties = {
      position: 'absolute',
      top: this.props.center.y,
      left: this.props.center.x,
      borderRadius: '50%',
      width: radius,
      height: radius,
      transform: this.state.isSpreading ? `scale(${this.props.scale})` : 'scale(1)',
      opacity: this.state.isSpreading ? 0 : 0.35,
      background: 'white',
      pointerEvents: 'none',
      transition: `transform ${this.props.duration}ms,opacity ${this.props.duration}ms ease-out ${this.props.duration}ms`,
    };

    return (
      <span style={style}/>
    );

  }
}
