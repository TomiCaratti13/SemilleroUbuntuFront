import CircleIcon from '@mui/icons-material/Circle';
import {
  Typography,
  Box,
  Container,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  ListItemIcon,
  Button,
} from '@mui/material';
import { AlertModal } from '../../../components/AlertModal';
import { useAlertModal } from '../../../utils/hooks/useAlertModal';
import { useFormik } from 'formik';
import { getCalculo, postInversion } from '../../../utils/services/axiosConfig';
import { useEffect, useState } from 'react';
import formInversion from '../../../utils/schemas/schemaFormInversion';
import { useSelector } from 'react-redux';

const ButtonInversion = ({ onClick, text }) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        minWidth: '120px',
        padding: '0 20px',
        height: '34px',
        borderRadius: '100px',
        color: 'blanco.main',
        backgroundColor: 'azul.main',
        textTransform: 'none',
        '&:hover': { backgroundColor: 'azul.main' },
      }}>
      <Typography
        sx={{
          fontWeight: '700',
          fontSize: '16px',
          lineHeight: '30px',
          textAlign: 'center',
        }}>
        {text}
      </Typography>
    </Button>
  )
}
// #region COMPONENTE
export const CalculoInversion = ({ card, setSelectedCard, setValue, riesgo }) => {

  const user = useSelector(state => state.user);
  const idUser = user.isAdmin ? user.id : 1;

  const cardMap = {
    idMicro: card?.id,
    nombre: card?.nombre,
  };

  const [calculo, setCalculo] = useState();
  const [idRiesgo, setIdRiesgo] = useState();
  const [montoCalculo, setMontoCalculo] = useState();

  const handleChangeMonto = (event) => {
    const { value } = event.target;
    const numberValue = parseInt(value.replace(/\D/g, ''), 10);
    setMontoCalculo(numberValue);
  };
  const handleChangeRiesgo = (event) => {
    const { value } = event.target;
    setIdRiesgo(value);
  };

  const calcular = () => {
    getCalculo(idRiesgo, montoCalculo).then(response => {
      const calculo = response;
      console.log(calculo);
      setCalculo(calculo);
    });
  }

  useEffect(() => {
    if (
      idRiesgo !== '0' && idRiesgo !== undefined
      && montoCalculo > 200 && montoCalculo < 1000000
    ) {
      calcular();
    } else if (
      idRiesgo === 0
    ) {
      setCalculo(null)
    }
  }, [idRiesgo, montoCalculo]);

  useEffect(() => {
    formik.setValues({
      ...formik.values,
      costo: calculo?.costo || '',
      total: calculo?.total || '',
      tasa: calculo?.tasa || '',
      retorno: calculo?.retorno || '',
      ganancias: calculo?.ganancias || '',
      cuotas: calculo?.cuotas || '',
      mensaje: calculo
        ? `Si decides optar por esta inversión, podrás empezar a cobrar a partir del próximo mes, durante ${calculo.cuotas} meses el monto de $${(calculo.ganancias / calculo.cuotas).toFixed(2)}`
        : '',
    });
  }, [calculo]);

  const formik = useFormik({
    initialValues: {
      monto: '$ ',
      // riesgo: 0,
      costo: '',
      total: '',
      cuotas: '',
      tasa: '',
      retorno: '',
      ganancias: '',
      mensaje: '',
    },
    validationSchema: formInversion,
    onSubmit: formData => {
      try {
        formik.setSubmitting(true);
        const formEnviar = {
          costo: formData.costo,
          total: formData.total,
          tasa: formData.tasa,
          retorno: formData.retorno,
          ganancias: formData.ganancias,
          cuotas: formData.cuotas,
        };
        postInversion(formEnviar, idUser, cardMap.idMicro, idRiesgo)
          .then(response => {
            // console.log('RESPUESTA COMPONENETE', response);
            if (response && response.status === 200 || response.status === 201) {
              openAlert(
                true,
                'Inversión creada con éxito');
            } else {
              openAlert(
                false,
                'Lo sentimos, No pudo realizarse la Inversión',
                'Por favor, volvé a intentarlo'
              );
            }
          })
          .catch(error => {
            console.error('Error al enviar el formulario:', error);
            openAlert(
              false,
              'Lo sentimos, No pudo realizarse la Inversión',
              'Por favor, volvé a intentarlo'
            );
          });
        formik.setSubmitting(false);
      } catch (error) {
        console.log('ingresooooooo');
        formik.setSubmitting(false);
        console.log(error);
      }
    },
  });

  const [alertModal, openAlert, closeAlert, resendAlert] = useAlertModal(
    formik.handleSubmit
  );

  // #region RETURN
  return (
    <>
      <AlertModal
        closeAlert={closeAlert}
        resendAlert={resendAlert}
        alert={alertModal}
        setSelectedContacto={setSelectedCard}
        setValue={setValue}
      />
      <Container
        component='form'
        onSubmit={formik.handleSubmit}
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
              color: 'azul.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
            }}>
            <CircleIcon
              fontSize='s'
              sx={{
                color: idRiesgo === 3 ?
                  'nivel.alto'
                  : (idRiesgo === 2 ?
                    'nivel.medio'
                    : (idRiesgo === 1 ?
                      'nivel.bajo'
                      : 'gris.medio')),
              }}
            />
            {cardMap.nombre}
          </Typography>
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: 500,
              textAlign: 'center',
            }}>
            Formulario para crear Inversión
          </Typography>
          <Typography
            sx={{
              width: '100%',
              fontSize: '13px',
              // fontWeight: 400,
              lineHeight: '14px',
              py: '6px',
              color: 'azul.main',
            }}>
            Ingrese el monto a invertir en {cardMap.nombre} y luego seleccione un nivel de Riesgo de Inversión
            para realizar lo cálculos. Si está de acuerdo, dé a Invertir.
          </Typography>
        </Box>
        <TextField
          // #region MONTO 
          fullWidth
          id='monto'
          name='monto'
          label='Monto a Invertir'
          variant='outlined'
          value={formik.values.monto}
          onChange={(event) => {
            formik.handleChange(event);
            handleChangeMonto(event);
          }}
          onBlur={formik.handleBlur}
          disabled={formik.isSubmitting}
          // error={formik.touched.monto && Boolean(formik.errors.monto)}
          // helperText={formik.touched.monto && formik.errors.monto}
          // sx={{
          //   '& .MuiOutlinedInput-input': {
          //     fontWeight: '400',
          //   },
          //   '& .MuiOutlinedInput-notchedOutline': {
          //     borderColor: '#090909',
          //   },

          //   '& .MuiFormLabel-root': {
          //     color: theme =>
          //       formik.touched.monto
          //         ? theme.palette.gestion.error
          //         : '#090909 !important',
          //     fontWeight: '400',
          //   },

          //   '& .MuiInputLabel-root.Mui-focused': {
          //     color: theme =>
          //       formik.touched.monto && formik.errors.monto
          //         ? theme.palette.gestion.error
          //         : `${theme.palette.primary.main} !important`,
          //   },

          //   '& .MuiFormHelperText-root': {
          //     color: theme =>
          //       formik.touched.monto && formik.errors.monto
          //         ? theme.palette.gestion.error
          //         : '#090909 !important',
          //     fontWeight: '400',
          //   },

          //   '& .Mui-disabled': {
          //     color: theme => `${theme.palette.primary.main} !important`,
          //   },
          // }}
          // InputProps={{
          //   sx: {
          //     '& .Mui-disabled': {
          //       WebkitTextFillColor: '#090909 !important',
          //     },
          //   },
          // }}
        />
        <FormControl>
          <InputLabel id='select-label' sx={{ fontWeight: '400' }}>Riesgo Inversión</InputLabel>
          <Select
            // #region RIESGO
            id='riesgo'
            label='Riesgo Inversión'
            labelId='select-label'
            displayEmpty
            defaultValue={0}
            onChange={handleChangeRiesgo}
          >
            <MenuItem value={0}>
              <ListItemIcon>
                <Typography
                  sx={{
                    fontWeight: '400',
                  }}>
                  Nivel de Riesgo
                </Typography>
              </ListItemIcon>
            </MenuItem>
            {riesgo.map((riesgo, index) => (
              <MenuItem
                key={index}
                value={riesgo.id}>
                <ListItemIcon>
                  <CircleIcon
                    fontSize='small'
                    sx={{
                      color: riesgo.nombre === 'ALTO' ?
                        'nivel.alto'
                        : (riesgo.nombre === 'MEDIO' ?
                          'nivel.medio'
                          : (riesgo.nombre === 'BAJO' ?
                            'nivel.bajo'
                            : null)),
                    }}
                  />
                  <Typography
                    sx={{
                      pl: '8px',
                      lineHeight: '20px',
                      fontWeight: '400',
                    }}>
                    {riesgo.nombre.charAt(0).toUpperCase() + riesgo.nombre.slice(1).toLowerCase()}
                  </Typography>
                </ListItemIcon>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          // #region COSTOS
          fullWidth
          id='costo'
          name='costo'
          label='Costos de Gestión'
          variant='outlined'
          value={formik.values.costo}
          onBlur={formik.handleBlur}
          disabled={formik.isSubmitting}
          error={formik.touched.costo && Boolean(formik.errors.costo)}
          helperText={
            formik.touched.costo && formik.errors.costo
              ? formik.errors.costo
              : null
          }
          sx={{
            '& .MuiOutlinedInput-input': {
              fontWeight: '400',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#090909',
            },

            '& .MuiFormLabel-root': {
              color: theme =>
                formik.touched.costo && formik.errors.costo
                  ? theme.palette.gestion.error
                  : '#090909 !important',
              fontWeight: '400',
            },

            '& .MuiInputLabel-root.Mui-focused': {
              color: theme =>
                formik.touched.costo && formik.errors.costo
                  ? theme.palette.gestion.error
                  : `${theme.palette.primary.main} !important`,
            },

            '& .MuiFormHelperText-root': {
              color: theme =>
                formik.touched.costo && formik.errors.costo
                  ? theme.palette.gestion.error
                  : '#090909 !important',
              fontWeight: '400',
            },

            '& .Mui-disabled': {
              color: theme => `${theme.palette.primary.main} !important`,
            },
          }}
          InputProps={{
            sx: {
              '& .Mui-disabled': {
                WebkitTextFillColor: '#090909 !important',
              },
            },
          }}
        />
        <TextField
          // #region APORTAR
          fullWidth
          id='total'
          name='total'
          label='Total a Aportar'
          variant='outlined'
          value={formik.values.total}
          onBlur={formik.handleBlur}
          disabled={formik.isSubmitting}
          error={formik.touched.total && Boolean(formik.errors.total)}
          helperText={
            formik.touched.total && formik.errors.total
              ? formik.errors.total
              : null
          }
          sx={{
            '& .MuiOutlinedInput-input': {
              fontWeight: '400',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#090909',
            },

            '& .MuiFormLabel-root': {
              color: theme =>
                formik.touched.total && formik.errors.total
                  ? theme.palette.gestion.error
                  : '#090909 !important',
              fontWeight: '400',
            },

            '& .MuiInputLabel-root.Mui-focused': {
              color: theme =>
                formik.touched.total && formik.errors.total
                  ? theme.palette.gestion.error
                  : `${theme.palette.primary.main} !important`,
            },

            '& .MuiFormHelperText-root': {
              color: theme =>
                formik.touched.total && formik.errors.total
                  ? theme.palette.gestion.error
                  : '#090909 !important',
              fontWeight: '400',
            },

            '& .Mui-disabled': {
              color: theme => `${theme.palette.primary.main} !important`,
            },
          }}
          InputProps={{
            sx: {
              '& .Mui-disabled': {
                WebkitTextFillColor: '#090909 !important',
              },
            },
          }}
        />
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <TextField
            // #region TASA 
            fullWidth
            id='tasa'
            name='tasa'
            label='Tasa Retorno'
            variant='outlined'
            value={formik.values.tasa}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
            error={formik.touched.tasa && Boolean(formik.errors.tasa)}
            helperText={
              formik.touched.tasa && formik.errors.tasa
                ? formik.errors.cuotas
                : null
            }
            sx={{
              '& .MuiOutlinedInput-input': {
                fontWeight: '400',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#090909',
              },

              '& .MuiFormLabel-root': {
                color: theme =>
                  formik.touched.tasa && formik.errors.tasa
                    ? theme.palette.gestion.error
                    : '#090909 !important',
                fontWeight: '400',
              },

              '& .MuiInputLabel-root.Mui-focused': {
                color: theme =>
                  formik.touched.tasa && formik.errors.tasa
                    ? theme.palette.gestion.error
                    : `${theme.palette.primary.main} !important`,
              },

              '& .MuiFormHelperText-root': {
                color: theme =>
                  formik.touched.tasa && formik.errors.tasa
                    ? theme.palette.gestion.error
                    : '#090909 !important',
                fontWeight: '400',
              },

              '& .Mui-disabled': {
                color: theme => `${theme.palette.primary.main} !important`,
              },
            }}
            InputProps={{
              sx: {
                '& .Mui-disabled': {
                  WebkitTextFillColor: '#090909 !important',
                },
              },
            }}
          />
          <TextField
            // #region CUOTAS
            fullWidth
            id='cuotas'
            name='cuotas'
            label='Cuotas'
            variant='outlined'
            value={formik.values.cuotas}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
            error={formik.touched.cuotas && Boolean(formik.errors.cuotas)}
            helperText={
              formik.touched.cuotas && formik.errors.cuotas
                ? formik.errors.cuotas
                : null
            }
            sx={{
              '& .MuiOutlinedInput-input': {
                fontWeight: '400',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#090909',
              },

              '& .MuiFormLabel-root': {
                color: theme =>
                  formik.touched.cuotas && formik.errors.cuotas
                    ? theme.palette.gestion.error
                    : '#090909 !important',
                fontWeight: '400',
              },

              '& .MuiInputLabel-root.Mui-focused': {
                color: theme =>
                  formik.touched.cuotas && formik.errors.cuotas
                    ? theme.palette.gestion.error
                    : `${theme.palette.primary.main} !important`,
              },

              '& .MuiFormHelperText-root': {
                color: theme =>
                  formik.touched.cuotas && formik.errors.cuotas
                    ? theme.palette.gestion.error
                    : '#090909 !important',
                fontWeight: '400',
              },

              '& .Mui-disabled': {
                color: theme => `${theme.palette.primary.main} !important`,
              },
            }}
            InputProps={{
              sx: {
                '& .Mui-disabled': {
                  WebkitTextFillColor: '#090909 !important',
                },
              },
            }}
          />
        </Box>
        <TextField
          // #region RETORNO
          fullWidth
          id='retorno'
          name='retorno'
          label='Retorno Esperado'
          variant='outlined'
          value={formik.values.retorno}
          onBlur={formik.handleBlur}
          disabled={formik.isSubmitting}
          error={formik.touched.retorno && Boolean(formik.errors.retorno)}
          helperText={
            formik.touched.retorno && formik.errors.retorno
              ? formik.errors.retorno
              : null
          }
          sx={{
            '& .MuiOutlinedInput-input': {
              fontWeight: '400',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#090909',
            },

            '& .MuiFormLabel-root': {
              color: theme =>
                formik.touched.retorno && formik.errors.retorno
                  ? theme.palette.gestion.error
                  : '#090909 !important',
              fontWeight: '400',
            },

            '& .MuiInputLabel-root.Mui-focused': {
              color: theme =>
                formik.touched.retorno && formik.errors.retorno
                  ? theme.palette.gestion.error
                  : `${theme.palette.primary.main} !important`,
            },

            '& .MuiFormHelperText-root': {
              color: theme =>
                formik.touched.retorno && formik.errors.retorno
                  ? theme.palette.gestion.error
                  : '#090909 !important',
              fontWeight: '400',
            },

            '& .Mui-disabled': {
              color: theme => `${theme.palette.primary.main} !important`,
            },
          }}
          InputProps={{
            sx: {
              '& .Mui-disabled': {
                WebkitTextFillColor: '#090909 !important',
              },
            },
          }}
        />
        <TextField
          // #region GANANCIAS
          fullWidth
          id='ganancias'
          name='ganancias'
          label='Ganancias Totales'
          variant='outlined'
          value={formik.values.ganancias}
          onBlur={formik.handleBlur}
          disabled={formik.isSubmitting}
          error={formik.touched.ganancias && Boolean(formik.errors.ganancias)}
          helperText={
            formik.touched.ganancias && formik.errors.ganancias
              ? formik.errors.ganancias
              : null
          }
          sx={{
            '& .MuiOutlinedInput-input': {
              fontWeight: '400',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#090909',
            },

            '& .MuiFormLabel-root': {
              color: theme =>
                formik.touched.ganancias && formik.errors.ganancias
                  ? theme.palette.gestion.error
                  : '#090909 !important',
              fontWeight: '400',
            },

            '& .MuiInputLabel-root.Mui-focused': {
              color: theme =>
                formik.touched.ganancias && formik.errors.ganancias
                  ? theme.palette.gestion.error
                  : `${theme.palette.primary.main} !important`,
            },

            '& .MuiFormHelperText-root': {
              color: theme =>
                formik.touched.ganancias && formik.errors.ganancias
                  ? theme.palette.gestion.error
                  : '#090909 !important',
              fontWeight: '400',
            },

            '& .Mui-disabled': {
              color: theme => `${theme.palette.primary.main} !important`,
            },
          }}
          InputProps={{
            sx: {
              '& .Mui-disabled': {
                WebkitTextFillColor: '#090909 !important',
              },
            },
          }}
        />
        <Box>
          <TextField
            // #region DESCRIPCION
            fullWidth
            id='mensaje'
            name='mensaje'
            label='Descripción'
            variant='outlined'
            multiline
            rows={4}
            value={formik.values.mensaje}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
            error={formik.touched.mensaje && Boolean(formik.errors.mensaje)}
            helperText={formik.touched.mensaje && formik.errors.mensaje}
            sx={{
              '& .MuiOutlinedInput-input': {
                fontWeight: '400',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#090909',
              },

              '& .MuiFormLabel-root': {
                color: theme =>
                  formik.touched.mensaje && formik.errors.mensaje
                    ? theme.palette.gestion.error
                    : '#090909 !important',
                fontWeight: '400',
              },

              '& .MuiInputLabel-root.Mui-focused': {
                color: theme =>
                  formik.touched.mensaje && formik.errors.mensaje
                    ? theme.palette.gestion.error
                    : `${theme.palette.primary.main} !important`,
              },

              '& .MuiFormHelperText-root': {
                color: theme =>
                  formik.touched.mensaje && formik.errors.mensaje
                    ? theme.palette.gestion.error
                    : '#090909 !important',
                fontWeight: '400',
              },

              '& .Mui-disabled': {
                color: '#090909 !important',
              },
            }}
            InputProps={{
              sx: {
                '& .Mui-disabled': {
                  WebkitTextFillColor: '#090909 !important',
                },
              },
            }}
          />
        </Box>
        <Box
          // #region BOTONES
          sx={{
            mt: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px'
          }}
        >
          <ButtonInversion
            text={'Volver'}
            onClick={() => { setSelectedCard(null) }}
          />
          <ButtonInversion
            text={'Invertir'}
            onClick={() => { formik.handleSubmit() }}
          />
        </Box>
      </Container >
    </>
  );
};