import * as React from 'react';
import { Container } from './Container';
import { Heading } from '../atoms/Heading';
import { StyleConfig } from '../../config/StyleConfig';

export interface SectionProps {
  label: string;
  children: React.ReactNode;
  config: StyleConfig;
}

export const Section = (props: SectionProps) => (
  <div>
    <Heading level={5} config={props.config} tag="div">{props.label}</Heading>
    <Container padding="10px 0">
      {props.children}
    </Container>
  </div>
);
