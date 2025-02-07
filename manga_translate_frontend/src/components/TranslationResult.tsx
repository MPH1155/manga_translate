import React from 'react';
import { Paper, Box } from '@mui/material';

interface TranslationResultProps {
  imageUrl: string | null;
}

export const TranslationResult: React.FC<TranslationResultProps> = ({ imageUrl }) => {
  if (!imageUrl) return null;

  return (
    <Paper sx={{ mt: 2, p: 2 }}>
      <Box component="img" src={imageUrl} alt="Translated manga" sx={{ maxWidth: '100%' }} />
    </Paper>
  );
};