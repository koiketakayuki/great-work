import * as React from 'react';
import { FormItem } from './FormItem';
import { FormContext, ContextValue } from './FormContext';
import { Row } from '../layout/Row';
import { FlexCell, FixedCell } from '../layout/Cell';
import { Button } from '../Button';

interface ListFormEntryProps<T> {
  id: string;
  value: T[];
  label: string;
  default: T;
  disabled?: boolean;
  readonly?: boolean;
  children: (element: T, onChange: (value: T) => void, disabled?: boolean, readonly?: boolean)
    => React.ReactNode;
}

export class ListFormEntry<T> extends React.Component<ListFormEntryProps<T>> {

  getMappingFunction = (context: ContextValue<T[]>) => {
    return (value: T) => {
      const index = this.props.value.indexOf(value);
      const onChange = (newValue: T) => {
        const length = this.props.value.length;
        const newList = [];

        for (let i = 0; i < length; i = i + 1) {
          if (i !== index) {
            newList.push(this.props.value[i]);
          } else {
            newList.push(newValue);
          }
        }
        context.update(this.props.id, newList, false);
      };
      return (
        <Row>
          <FlexCell>
            {this.props.children(value, onChange, this.props.disabled, this.props.readonly)}
          </FlexCell>
          <FixedCell>
            <Button type="error">Delete</Button>
          </FixedCell>
        </Row>
      );
    };
  }

  onAdd (context: ContextValue<T[]>): () => void {
    return () => {
      const newList: T[] = this.props.value.concat([this.props.default]);
      context.update(this.props.id, newList, false);
    };
  }

  getListForm(context: ContextValue<T[]>) {
    return (
      <FormItem label={this.props.label}>
        {this.props.value.map(this.getMappingFunction(context))}
        <Button type="primary" onClick={this.onAdd(context)}>Add</Button>
      </FormItem>
    );
  }

  render() {
    return (
      <FormContext.Consumer>
        {context => this.getListForm(context)}
      </FormContext.Consumer>
    );
  }
}
