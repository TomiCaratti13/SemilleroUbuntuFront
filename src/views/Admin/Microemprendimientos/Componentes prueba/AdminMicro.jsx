import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { ButtonBlue } from '../../../../components/ButtonBlue';
import { FormMicro } from '../FormMicro';
import { usePublicaciones } from '../../../../utils/hooks/usePublicaciones';
import { MapPublicaciones } from '../../../../components/MapPublicaciones';

export function AdminMicro() {
  const [crear, setCrear] = useState(false);
  const [editar, setEditar] = useState([]);

  const publicaciones = usePublicaciones();

  const handdleCrear = () => {
    setEditar([]);
    setCrear(true);
    console.log('crear', crear);
  };

  useEffect(() => {
    if (editar.length !== 0) {
      setCrear(true);
    }
  }, [editar]);

  return (
    <Box
      sx={{
        display: 'flex',
        overflow: 'hidden',
        flexDirection: 'column',
        gap: '16px',
        width: '100%',
        height: '100%',
        paddingBottom: '30px',
      }}>
      <Outlet />
    </Box>
  );
}
