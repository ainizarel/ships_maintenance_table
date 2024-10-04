import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const ComponentList = ({ subcomponents, setSelectedComponent }) => {
  return (
    <List>
      {subcomponents.map((component, index) => (
        <ListItem button key={index} onClick={() => setSelectedComponent(component)}>
          <ListItemText primary={component.component_name} />
        </ListItem>
      ))}
    </List>
  );
};

export default ComponentList;
