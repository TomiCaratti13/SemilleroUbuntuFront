import { Typography, Box } from '@mui/material';
import { ButtonBlue } from '../../components/ButtonBlue';
import { useEffect, useState } from 'react';
import { MapPublicaciones } from '../../components/MapPublicaciones';
import { usePublicaciones } from '../../utils/hooks/usePublicaciones';
import { FormMicro } from './Microemprendimientos/FormMicro';

export const AdminMicroemprendimientos = () => {
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
            ? 'Edición de Microemprendimiento'
            : 'Carga de Microemprendimiento'
          : 'Microemprendimientos'}
      </Typography>
      {crear ? (
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
              {editar.length !== 0
                ? 'Editá el formulario de carga del Microemprendmiento'
                : 'Completá los datos para crear un nuevo Microemprendimiento'}
            </Typography>
            <FormMicro microemprendimiento={editar} />
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
              setEditar={setEditar}
              isAdmin={true}
            />
          </Box>
        </>
      )}
    </Box>
  );
};
