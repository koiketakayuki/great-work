import * as React from 'react';
import { ContextValue, FormContext } from './FormContext';
import { IconButton } from '../IconButton';
import { Icon } from '../Icon';

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
        <div style={{ position: 'absolute', right: '0', top: '0' }}>
          <IconButton padding="12px 6px 0 0" icon={<Icon name="highlight_off"/>} type="error" onClick={props.onDelete}/>
        </div>
      </FormContext.Provider>
    </div>
  );
}
