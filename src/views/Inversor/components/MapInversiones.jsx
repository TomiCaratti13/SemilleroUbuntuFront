import { Typography, Box, Container, Button } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useMicro } from '../../../utils/hooks/useMicro'
import CircleIcon from '@mui/icons-material/Circle';


export const MapInversiones = ({ inversion, riesgo, onClick }) => {

  const microemprendimiento = useMicro();

  const inversionMap = {
    id: inversion.id,
    riesgo: inversion.riesgoId,
    micro: inversion.microId,
    monto: inversion.monto,
    aportado: inversion.aportar,
    cuotas: inversion.cuotas,
    cuotasFaltantes: inversion.cuotasFaltantes,
  };

  const obtenerNombreRiesgo = (id) => {
    const riesgoEncontrado = riesgo.find(r => r.id === id);
    return riesgoEncontrado ? riesgoEncontrado.nombre : null;
  };

  const obtenerNombreMicro = (id) => {
    const microEncontrado = microemprendimiento?.find(micro => micro.id === id);
    return microEncontrado ? microEncontrado.title : 'Microemprendimiento';
  };

  const nombreRiesgo = obtenerNombreRiesgo(inversionMap.riesgo);
  const nombreMicroemp = obtenerNombreMicro(inversionMap.micro);

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
            alignItems: 'center',
            gap: '4px',
            flexGrow: 1,
          }}>
          <CircleIcon
            fontSize='small'
            sx={{
              mt: '2px',
              color: nombreRiesgo === 'ALTO'
                ? 'nivel.alto'
                : (nombreRiesgo === 'MEDIO' 
                ? 'nivel.medio' 
                : (nombreRiesgo === 'BAJO' 
                ? 'nivel.bajo' 
                : null)),
            }}
          />
          {nombreMicroemp}
        </Typography>
        <Typography
          style={{
            fontSize: '14px',
            fontFamily: 'Lato',
            fontWeight: 700,
            lineHeight: '20px',
            color: 'negro',
            margin: '0',
            width: '100%',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 0',
          }}>
          {inversionMap.aportado}
          <span style={{fontWeight: 400}}>{`Cuotas: ${parseInt(inversionMap.cuotas) - parseInt(inversionMap.cuotasFaltantes)}/${inversionMap.cuotas}`}</span>
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
