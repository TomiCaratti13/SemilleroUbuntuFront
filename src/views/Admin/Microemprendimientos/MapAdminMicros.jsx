import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { ButtonBlue } from '../../../components/ButtonBlue';
import { MapPublicaciones } from '../../../components/MapPublicaciones';
import { usePublicaciones } from '../../../utils/hooks/usePublicaciones';

export const MapAdminMicros = () => {
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
        Microemprendimientos
      </Typography>
      <ButtonBlue
        text={'Crear Microemprendimiento'}
        width="100%"
        onClick={handdleCrear}
      />
      <Typography
        variant="h4"
        sx={{
          fontSize: '22px',
          lineHeight: '25px',
          fontWeight: 600,
          textAlign: 'center',
          width: '100%',
        }}>
        Microemprendimientos Cargados
      </Typography>
      <MapPublicaciones
        publicaciones={publicaciones}
        isAdmin={true}
      />
    </Box>
  );
};
