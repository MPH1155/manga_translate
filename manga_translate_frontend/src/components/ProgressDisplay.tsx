import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

interface ProgressDisplayProps {
  progress: number;
  status: string;
}

export const ProgressDisplay: React.FC<ProgressDisplayProps> = ({ progress, status }) => {
    return (
      <Box sx={{ width: '100%', mt: 2, textAlign: 'center' }}>
        <CircularProgress 
         sx={{ color: '#2962ff' }}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
          <Typography variant="body2" color="text">
            {status}
          </Typography>
        </Box>
      </Box>
    );
  };