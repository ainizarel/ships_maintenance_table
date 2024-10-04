import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const ShipList = ({ ships, setSelectedShip }) => {
  return (
    <List>
      {ships.map((ship) => (
        <ListItem button key={ship.ship_id} onClick={() => setSelectedShip(ship)}>
          <ListItemText primary={ship.ship_name} />
        </ListItem>
      ))}
    </List>
  );
};

export default ShipList;
