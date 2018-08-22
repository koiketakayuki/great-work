import * as React from 'react';
import { Section } from '../layout/Section';

export const FormItem = (props: { label: string, children: React.ReactNode }) =>
  <Section label={props.label}>{props.children}</Section>;
