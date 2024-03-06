import React from 'react';
import { Box } from '@mui/material';

export const VectorGreen = ({ text }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        zIndex: '-1',
        width: '100%',
        top: text ? '100px' : '0px',
      }}>
      <svg
        style={{ position: 'absolute', overflow: 'hidden' }}
        width="100%"
        viewBox="0 0 361 620">
        <path
          d="M361 183C189.669 191.629 104.632 167.382 0 0V550C0 550 361 706 361 550V183Z"
          fill="#226516"
        />
      </svg>
    </Box>
  );
};
