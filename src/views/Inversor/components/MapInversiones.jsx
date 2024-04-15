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
    cuotas: inversion.cuotas,
    cuotasFaltantes: inversion.cuotasFaltantes,
  };

  const obtenerNivelRiesgo = (id) => {
    const riesgoEncontrado = riesgo.find(r => r.id === id);
    return riesgoEncontrado ? riesgoEncontrado.nivel : null;
  };

  const obtenerNombreMicro = (id) => {
    const microEncontrado = microemprendimiento?.find(micro => micro.id === id);
    return microEncontrado ? microEncontrado.title : 'Microemp';
  };

  const nivelRiesgo = obtenerNivelRiesgo(inversionMap.riesgo);
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
        gap: '8px',
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
              color: nivelRiesgo === 'alto'
                ? 'nivel.alto'
                : (nivelRiesgo === 'medio' 
                ? 'nivel.medio' 
                : (nivelRiesgo === 'bajo' 
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
            fontWeight: 500,
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
          {/* <span>{inversionMap.id}</span> */}
          {inversionMap.monto}
          <span>{`Cuotas: ${parseInt(inversionMap.cuotas) - parseInt(inversionMap.cuotasFaltantes)}/${inversionMap.cuotas}`}</span>
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
