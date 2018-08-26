import * as React from 'react';
import { Container } from './Container';
import { Heading } from '../Heading';

export interface SectionProps {
  label: string;
  children: React.ReactNode;
}

export const Section = (props: SectionProps) => (
  <Container>
    <Heading level={5} tag="div">{props.label}</Heading>
    <Container padding="10px 0">
      {props.children}
    </Container>
  </Container>
);
