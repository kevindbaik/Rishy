import React from 'react';
import { Box, Fade } from '@mui/material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Fade in={value === index} timeout={1000}>
            <div>{children}</div>
          </Fade>
        </Box>
      )}
    </div>
  );
}

export default TabPanel;
