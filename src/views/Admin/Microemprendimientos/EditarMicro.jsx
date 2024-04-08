import React from 'react';
import { Box, Typography } from '@mui/material';
import { FormMicro } from './FormMicro';

export const EditarMicro = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        overflow: 'hidden',
        flexDirection: 'column',
        gap: '20px',
        width: '100%',
        height: '100%',
        padding: '0 16px',
      }}>
      <Typography
        variant="h4"
        sx={{
          fontSize: '28px',
          lineHeight: '35px',
          fontWeight: 700,
          textAlign: 'center',
          width: '100%',
          pt: '30px',
        }}>
        Edición ded Microemprendimiento
      </Typography>
      <Typography
        variant="h4"
        sx={{
          fontSize: '22px',
          lineHeight: '25px',
          fontWeight: 600,
          textAlign: 'center',
          width: '100%',
        }}>
        {editar.length !== 0
          ? 'Editá el formulario de carga del Microemprendmiento'
          : 'Completá los datos para crear un nuevo Microemprendimiento'}
      </Typography>
      <FormMicro microemprendimiento={editar} />
    </Box>
  );
};
