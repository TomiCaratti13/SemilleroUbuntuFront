import { Typography, Box } from '@mui/material';
import { ButtonBlue } from '../../components/ButtonBlue';
import { useEffect, useState } from 'react';
import { MapPublicaciones } from '../../components/MapPublicaciones';
import { usePublicaciones } from '../../utils/hooks/usePublicaciones';
import { FormPublicaciones } from './Publicaciones/FormPublicaciones';

export const AdminPublicaciones = () => {
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
      <Typography
        variant="h4"
        onClick={() => setCrear(false)}
        sx={{
          fontSize: '28px',
          lineHeight: '35px',
          fontWeight: 700,
          textAlign: 'center',
          width: '100%',
          pt: '30px',
        }}>
        {crear
          ? editar.length !== 0
            ? 'Edición de publicación'
            : 'Carga de Publicación'
          : 'Publicaciones'}
      </Typography>
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
        {crear ? (
          <>
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
                ? 'Modificá los datos de la publicación'
                : 'Completá los datos para crear una nueva publicación'}
            </Typography>
            <FormPublicaciones publicacion={editar} />
          </>
        ) : (
          <>
            <ButtonBlue
              text={'Crear publicacion'}
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
              Publicaciones cargadas
            </Typography>
            <MapPublicaciones
              publicaciones={publicaciones}
              setEditar={setEditar}
              isAdmin={true}
            />
          </>
        )}
      </Box>
    </Box>
  );
};
