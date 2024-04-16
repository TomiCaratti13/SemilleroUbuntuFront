import { Typography, Box, Container, Button } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CircleIcon from '@mui/icons-material/Circle';


export const MapMicroInv = ({ microemprendimiento, onClick }) => {
  const microMap = {
    nombre: microemprendimiento.nombre,
    ubication: `${microemprendimiento.provincia}, ${microemprendimiento.pais}`,
  };

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        bgcolor: 'gris.claro',
        borderRadius: '8px',
        p: '4px 8px',
        width: '100%',
        mb: '16px',
      }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          flexGrow: 1,
          p: '8px',
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
            fontSize='small'
            sx={{
              mt: '3px',
              color: 'gris.medio'
            }}
          />
          {microMap.nombre}
        </Typography>
        <Typography
          paragraph
          sx={{
            fontSize: '14px',
            fontFamily: 'Lato',
            fontWeight: 400,
            lineHeight: '20px',
            color: 'negro',
            margin: '0',
            width: '100%',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            margin: '6px 0',
          }}>
          <LocationOnOutlinedIcon />
          {microMap.ubication}
        </Typography>
      </Box>
      <Button
        onClick={onClick}
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
