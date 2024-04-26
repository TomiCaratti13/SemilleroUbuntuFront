import CircleIcon from '@mui/icons-material/Circle';
import { Typography, Box, Container, TextField, Button } from '@mui/material';

// #region EXPORT
export const DetalleInversion = ({ inversion, setSelectedCard }) => {

  const invMap = {
    // monto: inversion?.monto,
    // costosGestion: inversion?.costo,
    // totalAportado: inversion?.aportar,
    // riesgo: inversion?.riesgo,
    // cuotas: inversion?.cuotas,
    // cuotasFaltantes: inversion?.cuotasFaltantes,
    // retorno: inversion?.retorno,
    // ganancias: inversion?.ganancias,
    // porMes: inversion?.montoPorMes,

    // id_inver: inversion?.id_inver,
    monto: inversion?.monto,
    cuotas: inversion?.cuotas,
    costo: inversion?.costo,
    retorno: inversion?.retorno,
    ganancias: inversion?.ganancias,
    montomensual: inversion?.montomensual,
    cuotasFaltantes: inversion?.cuotasFaltantes,
    fechaCreacion: inversion?.fechaCreacion,
    riesgo: inversion?.riesgo,
    microemp: inversion?.microEmprendimiento,
    estado: inversion?.estado
  }

  const formatearFecha = (fecha) => {
    if (!fecha) return '';
    const [año, mes, dia] = fecha;
    const mesFormateado = mes < 10 ? '0' + mes : mes;
    const diaFormateado = dia < 10 ? '0' + dia : dia;
    return `${diaFormateado}/${mesFormateado}/${año}`;
  };

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
                color: invMap?.riesgo === 'ALTO'
                  ? 'nivel.alto'
                  : (invMap?.riesgo === 'MEDIO'
                    ? 'nivel.medio'
                    : (invMap?.riesgo === 'BAJO'
                      ? 'nivel.bajo'
                      : null)),
              }}
            />
            {invMap?.microemp}
          </Typography>
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: 700,
              textAlign: 'center',
              p: '10px 0 6px 0',
            }}>
            Detalles de la Inversión
          </Typography>
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: 500,
              textAlign: 'center',
            }}>
            Fecha: {formatearFecha(invMap?.fechaCreacion)}
          </Typography>
        </Box>
        <TextField
          // #region APORTADO
          label='Total Aportado'
          variant='outlined'
          value={(invMap?.monto + invMap?.costo).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
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
          value={invMap?.costo.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
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
          value={invMap?.monto.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
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
            value={invMap?.cuotas}
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
            value={invMap?.cuotasFaltantes}
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
          value={invMap?.montomensual.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
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
          value={invMap?.retorno.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
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
          value={invMap?.ganancias.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
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
