import CircleIcon from '@mui/icons-material/Circle';
import { Typography, Box, Container, TextField, Button } from '@mui/material';
import { useMicro } from '../../../utils/hooks/useMicro';

// #region EXPORT
export const DetalleInversion = ({ card, setSelectedCard, riesgo }) => {

  const microemprendimiento = useMicro();

  const obtenerNombreMicro = (id) => {
    const microEncontrado = microemprendimiento?.find(micro => micro.id === id);
    return microEncontrado ? microEncontrado.title : 'Microemprendimiento';
  };
  const obtenerNivelRiesgo = (id) => {
    const riesgoEncontrado = riesgo.find(r => r.id === id);
    return riesgoEncontrado ? riesgoEncontrado.nombre : null;
  };

  const nombreMicroemp = obtenerNombreMicro(card?.microId);
  const nombreRiesgo = obtenerNivelRiesgo(card?.riesgoId);

  const inversionMap = {
    monto: card?.monto,
    costosGestion: card?.costo,
    totalAportado: card?.aportar,
    riesgo: card?.riesgo,
    cuotas: card?.cuotas,
    cuotasFaltantes: card?.cuotasFaltantes,
    retorno: card?.retorno,
    ganancias: card?.ganancias,
    porMes: card?.montoPorMes,
  }
  // #region RETURN
  return (
    <>
      <Container
        component='form'
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '100%',
          maxWidth: '600px',
          margin: 'auto',
        }}>
        {/* <Container
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            width: '100%',
            maxWidth: '600px',
            margin: 'auto',
          }}>
          <Typography
            // #region NOMBRE
            sx={{
              fontSize: '18px',
              lineHeight: '22px',
              fontWeight: 700,
              color: 'azul.main',
              padding: '27px 0 8px 0',
              display: 'flex',
              gap: '4px',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <CircleIcon */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            width: '100%',
            maxWidth: '600px',
            margin: 'auto',
          }}>
          <Typography
            sx={{
              fontSize: '18px',
              fontWeight: 700,
              pt: '36px',
              color: 'azul.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
            }}>
            <CircleIcon
              fontSize='small'
              sx={{
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
            sx={{
              fontSize: '16px',
              fontWeight: 500,
              textAlign: 'center',
              pb: '18px',
            }}>
            Detalles de la Inversión
          </Typography>
        </Box>
        <TextField
          // #region APORTAR
          label='Total Aportado'
          variant='outlined'
          value={inversionMap.totalAportado}
          disabled={true}
          sx={{
            '& .MuiOutlinedInput-input': {
              fontWeight: '400',
            },
            '& .Mui-disabled': {
              color: theme => `${theme.palette.primary.main} !important`,
              fontWeight: '400',
            },
          }}
          InputProps={{
            sx: {
              '& .Mui-disabled': {
                WebkitTextFillColor: '#090909 !important',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: theme => `${theme.palette.primary.main} !important`,
              },
            },
          }}
        />
        <TextField
          // #region COSTOS
          label='Costos de Gestión'
          variant='outlined'
          value={inversionMap.costosGestion}
          disabled={true}
          sx={{
            '& .MuiOutlinedInput-input': {
              fontWeight: '400',
            },
            '& .Mui-disabled': {
              color: theme => `${theme.palette.primary.main} !important`,
              fontWeight: '400',
            },
          }}
          InputProps={{
            sx: {
              '& .Mui-disabled': {
                WebkitTextFillColor: '#090909 !important',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: theme => `${theme.palette.primary.main} !important`,
              },
            },
          }}
        />
        <TextField
          // #region MONTO
          label='Monto Invertido'
          variant='outlined'
          value={inversionMap.monto}
          disabled={true}
          sx={{
            '& .MuiOutlinedInput-input': {
              fontWeight: '400',
            },
            '& .Mui-disabled': {
              color: theme => `${theme.palette.primary.main} !important`,
              fontWeight: '400',
            },
          }}
          InputProps={{
            sx: {
              '& .Mui-disabled': {
                WebkitTextFillColor: '#090909 !important',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: theme => `${theme.palette.primary.main} !important`,
              },
            },
          }}
        />
        <Box
          // #region CUOTAS
          sx={{
            width: '100%',
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}
        >
          <TextField
            label='Cuotas'
            variant='outlined'
            value={inversionMap.cuotas}
            disabled={true}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-input': {
                fontWeight: '400',
              },
              '& .Mui-disabled': {
                color: theme => `${theme.palette.primary.main} !important`,
                fontWeight: '400',
              },
            }}
            InputProps={{
              sx: {
                '& .Mui-disabled': {
                  WebkitTextFillColor: '#090909 !important',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme => `${theme.palette.primary.main} !important`,
                },
              },
            }}
          />
          <TextField
            label='Faltantes'
            variant='outlined'
            value={inversionMap.cuotasFaltantes}
            disabled={true}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-input': {
                fontWeight: '400',
              },
              '& .Mui-disabled': {
                color: theme => `${theme.palette.primary.main} !important`,
                fontWeight: '400',
              },
            }}
            InputProps={{
              sx: {
                '& .Mui-disabled': {
                  WebkitTextFillColor: '#090909 !important',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme => `${theme.palette.primary.main} !important`,
                },
              },
            }}
          />
        </Box>
        <TextField
          // #region POR MES
          label='Retorno Mensual'
          variant='outlined'
          value={inversionMap.porMes}
          disabled={true}
          sx={{
            '& .MuiOutlinedInput-input': {
              fontWeight: '400',
            },
            '& .Mui-disabled': {
              color: theme => `${theme.palette.primary.main} !important`,
              fontWeight: '400',
            },
          }}
          InputProps={{
            sx: {
              '& .Mui-disabled': {
                WebkitTextFillColor: '#090909 !important',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: theme => `${theme.palette.primary.main} !important`,
              },
            },
          }}
        />
        <TextField
          // #region RETORNO
          label='Retorno Esperado'
          variant='outlined'
          value={inversionMap.retorno}
          disabled={true}
          sx={{
            '& .MuiOutlinedInput-input': {
              fontWeight: '400',
            },
            '& .Mui-disabled': {
              color: theme => `${theme.palette.primary.main} !important`,
              fontWeight: '400',
            },
          }}
          InputProps={{
            sx: {
              '& .Mui-disabled': {
                WebkitTextFillColor: '#090909 !important',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: theme => `${theme.palette.primary.main} !important`,
              },
            },
          }}
        />
        <TextField
          // #region GANANCIAS
          label='Ganancia Neta'
          variant='outlined'
          value={inversionMap.ganancias}
          disabled={true}
          sx={{
            '& .MuiOutlinedInput-input': {
              fontWeight: '400',
            },
            '& .Mui-disabled': {
              color: theme => `${theme.palette.primary.main} !important`,
              fontWeight: '400',
            },
          }}
          InputProps={{
            sx: {
              '& .Mui-disabled': {
                WebkitTextFillColor: '#090909 !important',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: theme => `${theme.palette.primary.main} !important`,
              },
            },
          }}
        />
        <Box
          // #region BOTON
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Button
            onClick={() => setSelectedCard(null)}
            sx={{
              mt: '8px',
              minWidth: '120px',
              padding: '0 20px',
              height: '34px',
              borderRadius: '100px',
              color: 'blanco.main',
              backgroundColor: 'azul.main',
              textTransform: 'none',
              '&:hover': { backgroundColor: 'azul.main' },
            }}
          >
            <Typography
              sx={{
                fontWeight: '700',
                fontSize: '16px',
                lineHeight: '30px',
                textAlign: 'center',
              }}>
              Volver
            </Typography>
          </Button>
        </Box>
      </Container >
    </>
  );
};
