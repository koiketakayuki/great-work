import * as React from 'react';
import { ContextValue, FormContext } from './FormContext';
import { IconButton } from '../IconButton';

interface ListItemProps<C> {
  context: ContextValue<C>;
  onDelete: () => void;
  children: React.ReactNode;
}

export function ListItem<C>(props: ListItemProps<C>) {
  return (
    <div style={{ position: 'relative' }}>
      <FormContext.Provider value={props.context}>
        {props.children}
        <div style={{ position: 'absolute', right: '6px', top: '12px' }}>
          <IconButton name="highlight_off" type="error" onClick={props.onDelete}/>
        </div>
      </FormContext.Provider>
    </div>
  );
}
