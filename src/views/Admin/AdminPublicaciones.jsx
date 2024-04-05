import { Typography, Box } from '@mui/material';
import { ButtonBlue } from '../../components/ButtonBlue';
import { useState } from 'react';
import { MapPublicaciones } from '../../components/MapPublicaciones';
import { usePublicaciones } from '../../utils/hooks/usePublicaciones';

export const AdminPublicaciones = () => {
  const [crear, setCrear] = useState(false);
  const [editar, setEditar] = useState('asd');

  const publicaciones = usePublicaciones();
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
        {editar.length > 0 ? 'Carga de publicación' : 'Publicaciones'}
      </Typography>
      {editar.length > 0 ? (
        <>
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
                fontSize: '22px',
                lineHeight: '25px',
                fontWeight: 600,
                textAlign: 'center',
                width: '100%',
              }}>
              Completá los datos para crear una nueva publicación
            </Typography>
          </Box>
        </>
      ) : (
        <>
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
            <ButtonBlue
              text={'Crear publicacion'}
              width="100%"
              onClick={() => {
                setCrear(!crear);
              }}
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
              Publicaciones cargadas
            </Typography>
            <MapPublicaciones
              publicaciones={publicaciones}
              setEditar={setEditar}
              isAdmin={true}
            />
          </Box>
        </>
      )}
    </Box>
  );
};
