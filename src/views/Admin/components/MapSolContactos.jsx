import { Typography, Box, Container, Button } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CircleIcon from '@mui/icons-material/Circle';
import { Link } from 'react-router-dom';

export const MapSolContactos = ({ contacto , onClick}) => {

  const contactoMap = {
    nombre: contacto.microemprendimiento,
    fecha: contacto.fechaCreacion,
    gestionado: contacto.gestionado,
  }

  return (
    <Container
      onClick={onClick}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        bgcolor: 'gris.claro',
        borderRadius: '8px',
        p: '8px 8px 8px 16px',
        width: '100%',
        gap: '8px',
        mb: '16px',
      }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          flexGrow: 1,
          p: "8px"
        }}>
        <Typography
          sx={{
            fontSize: '18px',
            lineHeight: '24px',
            fontWeight: 600,
            borderBottom: '1px solid',
            color: 'azul.main',
            padding: '0 0 8px 0',
            display: 'flex',
            gap: '4px',
            flexGrow: 1,
          }}>
          <CircleIcon
            sx={{
              color: contactoMap.gestionado
                ? 'gestion.exito'
                : 'gestion.nogestionada',
            }}
          />
          {contactoMap.nombre}
        </Typography>
        <Typography
          style={{
            fontSize: '16px',
            lineHeight: '24px',
            fontWeight: 400,
            flexGrow: 1,
          }}>
          {contactoMap.fecha}
        </Typography>
      </Box>
      <Button
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          textDecoration: 'none',
        }}>
          <ArrowForwardIosIcon
            sx={{
              color: 'negro.main',
              height: '24px',
              width: '24px',
            }}
          />
      </Button>
    </Container>
  );
};
