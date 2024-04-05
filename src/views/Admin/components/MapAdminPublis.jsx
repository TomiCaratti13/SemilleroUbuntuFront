import { Typography, Box } from '@mui/material';
import { ButtonBlue } from '../../components/ButtonBlue';

export const MapAdminPublis = () => {
  return (
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
        Publicaciones
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
            pt: '30px',
          }}>
          Publicaciones cargadas
        </Typography>
        <MapPublicaciones
          publicaciones={publicaciones}
          setEditar={setEditar}
          isAdmin={true}
        />
      </Box>
  )
}
