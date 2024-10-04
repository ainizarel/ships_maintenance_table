import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Collapse,
  IconButton,
  Typography,
  Paper,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const MaintenanceTable = ({ maintenanceData }) => {
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [openDetails, setOpenDetails] = useState({});

  const getFilteredData = (level) => {
    if (level === 1) {
      return maintenanceData.map(item => ({
        ...item,
        details: [], // Empty details for level 1
      }));
    } else if (level === 2) {
      return maintenanceData.map(item => ({
        ...item,
        details: item.details, // Show all details for level 2
      }));
    }
    return maintenanceData; // Show all for level 3 and above
  };

  const filteredData = getFilteredData(selectedLevel);

  const handleToggleDetails = (id) => {
    setOpenDetails(prev => ({
      ...prev,
      [id]: !prev[id], // Toggle the open state for this row
    }));
  };

  return (
    <Paper elevation={2} style={{ padding: '16px' }}>
      <Typography variant="h5" gutterBottom>
        Maintenance Records
      </Typography>
      <Box mb={2}>
        <Button variant="contained" color="primary" onClick={() => setSelectedLevel(1)} style={{ marginRight: '8px' }}>
          Basic Detail
        </Button>
        <Button variant="contained" color="secondary" onClick={() => setSelectedLevel(2)}>
          More Detail
        </Button>
      </Box>

      {filteredData.length === 0 ? (
        <Typography variant="body1">No maintenance records available.</Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((maintenance) => (
              <React.Fragment key={maintenance.id}>
                <TableRow>
                  <TableCell>{maintenance.id}</TableCell>
                  <TableCell>{maintenance.status}</TableCell>
                  <TableCell>{maintenance.description}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleToggleDetails(maintenance.id)}>
                      <ExpandMoreIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4} style={{ paddingBottom: 0, paddingTop: 0 }}>
                    <Collapse in={openDetails[maintenance.id]} timeout="auto" unmountOnExit>
                      <Box margin={1}>
                        <Typography variant="subtitle1">Details</Typography>np
                        {maintenance.details.map((detail, index) => (
                          <Box key={index} style={{ padding: '8px 0' }}>
                            <Typography variant="body2"><strong>Date:</strong> {detail.date}</Typography>
                            <Typography variant="body2"><strong>Note:</strong> {detail.note}</Typography>
                          </Box>
                        ))}
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
};

export default MaintenanceTable;
