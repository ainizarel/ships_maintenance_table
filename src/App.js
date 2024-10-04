// src/App.js
import React, { useState, useEffect } from 'react';
import ShipList from './components/ShipList';
import ClassificationList from './components/ClassificationList';
import ComponentList from './components/ComponentList';
import MaintenanceTable from './components/MaintenanceTable';
import { Container, Grid, Typography, Paper, Box, Table, TableBody, TableRow, TableCell} from '@mui/material';
import EngineeringIcon from '@mui/icons-material/Engineering';

const App = () => {
  const [ships, setShips] = useState([]);
  const [selectedShip, setSelectedShip] = useState(null);
  const [selectedClassification, setSelectedClassification] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState(null);

  useEffect(() => {
    const fetchShipData = async () => {
      try {
        const response = await fetch('/data/ships.json'); // Update path for public/data
        const data = await response.json();
        setShips(data); // Set ships data in state
      } catch (error) {
        console.error('Error fetching ship data:', error);
      }
    };

    fetchShipData(); // Call the function to fetch data
  }, []);

  const handleShipSelection = (ship) => {
    setSelectedShip(ship);
    setSelectedClassification(null); // Reset classification when a new ship is selected
    setSelectedComponent(null); // Reset component when a new ship is selected
  };

  const handleClassificationSelection = (classification) => {
    setSelectedClassification(classification);
    setSelectedComponent(null); // Reset component when a new classification is selected
  };

  const handleComponentSelection = (component) => {
    setSelectedComponent(component); // Set selected component
  };

  return (
    <Container>
    <Box
      sx={{
        background: 'linear-gradient(90deg, #1e3c72 0%, #2a69ac 100%)', // Gradient background
        padding: '16px',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        color: '#fff', // White text color
        boxShadow: 3, // Shadow for depth
      }}
    >
      <EngineeringIcon sx={{ marginRight: '8px', fontSize: '40px' }} /> {/* Icon */}
      <Typography variant="h4" gutterBottom>
        Ship Maintenance Dashboard
      </Typography>
    </Box>
      <Grid container spacing={2}>
        {/* Left Column: Ship and Classification List */}
        <Grid item xs={12} md={6}> 
        <Paper 
          elevation={2} 
          style={{ 
            padding: '16px', 
            backgroundColor: '#f0f4f8', // Light background color for the Paper
            marginTop: '16px', // Margin at the top for spacing
            borderRadius: '8px', // Optional: rounded corners for the Paper
          }}
        >
          <Typography variant="h5" gutterBottom style={{ color: '#2a69ac' }}> {/* Custom color for the title */}
            Ships
          </Typography>
          <ShipList ships={ships} setSelectedShip={handleShipSelection} />
        </Paper>

        <Paper 
          elevation={1} 
          style={{ 
            marginTop: '16px', 
            padding: '16px', 
            backgroundColor: '#f0f4f8', // Light background color
            borderRadius: '8px' // Optional: rounded corners for the Paper
          }}
        >
          <Typography variant="h5" gutterBottom style={{ color: '#2a69ac' }}>
            Classifications
          </Typography>
          {selectedShip ? (
            selectedShip.classifications && selectedShip.classifications.length > 0 ? (
              <ClassificationList
                classifications={selectedShip.classifications}
                setSelectedClassification={handleClassificationSelection}
              />
            ) : (
              <Typography variant="body1" style={{ color: '#f44336', marginTop: '16px' }}>
                No classifications available for the selected ship. Please select a different ship.
              </Typography>
            )
          ) : (
            <Typography variant="body1" style={{ color: '#f44336', marginTop: '16px' }}>
              No ship selected. Please click on a ship to see classifications.
            </Typography>
          )}
        </Paper>



        {selectedClassification && !selectedComponent && (
          <Paper 
            elevation={1} 
            style={{ 
              marginTop: '16px', 
              padding: '16px', 
              backgroundColor: '#f0f4f8', // Light background color
              borderRadius: '8px' // Optional: rounded corners for the Paper
            }}
          >
            <Typography variant="h5" gutterBottom style={{ color: '#2a69ac' }}>
              Components
            </Typography>
            {selectedClassification.subcomponents && selectedClassification.subcomponents.length > 0 ? (
              <ComponentList
                subcomponents={selectedClassification.subcomponents}
                setSelectedComponent={handleComponentSelection}
              />
            ) : (
              <Typography variant="body1" style={{ color: '#f44336', marginTop: '16px' }}>
                No components available for the selected classification. Please select a different classification.
              </Typography>
            )}
          </Paper>
        )}

        </Grid>

        {/* Right Column: Maintenance Table */}
        <Grid item xs={12} md={6}>
          <Paper elevation={2} style={{ padding: '16px', marginTop: '16px', backgroundColor: '#003366' }}>
            <Typography variant="h5" gutterBottom style={{ color: '#fff' }}>
              Maintenance Records
            </Typography>
            {selectedComponent && selectedComponent.maintenance && selectedComponent.maintenance.length > 0 ? (
              <MaintenanceTable maintenanceData={selectedComponent.maintenance} />
            ) : (
              <Table style={{ width: '100%', backgroundColor: '#003366', color: '#fff' }}>
                <TableBody>
                  <TableRow>
                    <TableCell style={{ textAlign: 'center', color: '#fff' }}>
                      No data available for maintenance records.
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            )}
          </Paper>
        </Grid>



      </Grid>
    </Container>
  );
};


export default App;
