import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const ClassificationList = ({ classifications, setSelectedClassification }) => {
  return (
    <List>
      {classifications.map((classification, index) => (
        <ListItem button key={index} onClick={() => setSelectedClassification(classification)}>
          <ListItemText primary={classification.classification_name} />
        </ListItem>
      ))}
    </List>
  );
};

export default ClassificationList;
