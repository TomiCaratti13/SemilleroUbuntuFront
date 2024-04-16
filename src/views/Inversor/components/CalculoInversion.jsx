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
import formContact from '../../../utils/schemas/schemaFormContact';
import { putFormulario } from '../../../utils/services/axiosConfig';


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

  // const cardMicro = {
  //   nombre: card?.nombre || 'Microemprendimiento',
  // }
  const { nombre } = card;

  const formik = useFormik({
    initialValues: {
      monto: '',
      costosGestion: '',
      totalAportar: '',
      riesgo: '',
      cuotas: '',
      cuotasFaltantes: '',
      retorno: '',
      ganancias: '',
      porMes: '',
      descripcion: 'Si decides optar por esta inversión, podrás empezar a cobrar a partir del poximo mes, durante 12 meses el monto de $57.452,89',
    },
    validationSchema: formContact,
    onSubmit: formData => {
      try {
        formik.setSubmitting(true);
        const formEnviar = {
          descripcion: formData.mensaje,
          usuarioSolicitante: {
            nombre: formData.nombre,
            email: formData.email,
            telefono: formData.telefono,
          },
          gestionado: true,
        };

        putFormulario(formEnviar, card.id)
          .then(response => {
            // console.log('RESPUESTA COMPONENETE', response);
            //MANEJO DE ALERTAS
            if (response && response.status === 200) {
              openAlert(true, 'Estado modificado con éxito');
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
              sx={{ color: 'gris.medio' }}
            />
            {nombre}
          </Typography>
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: 500,
              textAlign: 'center',
            }}>
            Formulario Inversión
          </Typography>
          <Typography
            sx={{
              width: '100%',
              fontSize: '12px',
              fontWeight: 500,
              lineHeight: '14px',
              color: 'nivel.medio',
            }}>
            Ingrese el monto que desea aportar a {nombre} y luego seleccione un nivel de Riesgo de Inversión, para realizar lo cálculos. Si está de acuerdo, dé a Invertir.
          </Typography>
        </Box>
        <TextField
          // #region MONTO 
          fullWidth
          id='monto'
          name='monto'
          label='Monto a Aportar'
          variant='outlined'
          value={formik.values.monto}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={formik.isSubmitting}
          error={formik.touched.nombre && Boolean(formik.errors.monto)}
          helperText={formik.touched.nombre && formik.errors.nombre}
          sx={{
            '& .MuiOutlinedInput-input': {
              fontWeight: '400',
            },

            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#090909',
              fontWeight: '400',
            },

            '& .MuiFormLabel-root': {
              color: theme =>
                formik.touched.nombre && formik.errors.nombre
                  ? theme.palette.gestion.error
                  : '#090909 !important',
              fontWeight: '400',
            },

            '& .MuiInputLabel-root.Mui-focused': {
              color: theme =>
                formik.touched.nombre && formik.errors.nombre
                  ? theme.palette.gestion.error
                  : `${theme.palette.primary.main} !important`,
            },

            '& .MuiFormHelperText-root': {
              color: theme =>
                formik.touched.nombre && formik.errors.nombre
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
        <FormControl>
          <InputLabel id='select-label' sx={{ fontWeight: '400' }}>Riesgo Inversión</InputLabel>
          <Select
            // #region RIESGO
            label='Riesgo Inversión'
            labelId='select-label'
            displayEmpty
            defaultValue='0'
            // onChange={formik.handleConsult}
            sx={{
              '& .MuiOutlinedInput-input': {
                display: 'flex',
                alignItems: 'center',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#090909',
                fontWeight: '400',
              },
              '& .MuiFormLabel-root': {
                color: theme =>
                  formik.touched.nombre && formik.errors.nombre
                    ? theme.palette.gestion.error
                    : '#090909 !important',
                fontWeight: '400',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: theme =>
                  formik.touched.nombre && formik.errors.nombre
                    ? theme.palette.gestion.error
                    : `${theme.palette.primary.main} !important`,
              },
              '& .MuiFormHelperText-root': {
                color: theme =>
                  formik.touched.nombre && formik.errors.nombre
                    ? theme.palette.gestion.error
                    : '#090909 !important',
                fontWeight: '400',
              },
              '& .Mui-disabled': {
                color: theme => `${theme.palette.primary.main} !important`,
              },
            }}
            InputProps={{
              id: 'uncontrolled-native',
              sx: {
                '& .Mui-disabled': {
                  WebkitTextFillColor: '#090909 !important',
                },
              },
            }}>
            <MenuItem value='0'>
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
                            : null
                          )
                        ),
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
          id='costosGestion'
          name='costosGestion'
          label='Costos de Gestión'
          variant='outlined'
          value={formik.values.costosGestion}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={formik.isSubmitting}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          sx={{
            '& .MuiOutlinedInput-input': {
              fontWeight: '400',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#090909',
            },

            '& .MuiFormLabel-root': {
              color: theme =>
                formik.touched.email && formik.errors.email
                  ? theme.palette.gestion.error
                  : '#090909 !important',
              fontWeight: '400',
            },

            '& .MuiInputLabel-root.Mui-focused': {
              color: theme =>
                formik.touched.email && formik.errors.email
                  ? theme.palette.gestion.error
                  : `${theme.palette.primary.main} !important`,
            },

            '& .MuiFormHelperText-root': {
              color: theme =>
                formik.touched.email && formik.errors.email
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
          id='totalAportar'
          name='totalAportar'
          label='Total a Aportar'
          variant='outlined'
          value={formik.values.totalAportar}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={formik.isSubmitting}
          error={formik.touched.telefono && Boolean(formik.errors.telefono)}
          helperText={
            formik.touched.telefono && formik.errors.telefono
              ? formik.errors.telefono
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
                formik.touched.telefono && formik.errors.telefono
                  ? theme.palette.gestion.error
                  : '#090909 !important',
              fontWeight: '400',
            },

            '& .MuiInputLabel-root.Mui-focused': {
              color: theme =>
                formik.touched.telefono && formik.errors.telefono
                  ? theme.palette.gestion.error
                  : `${theme.palette.primary.main} !important`,
            },

            '& .MuiFormHelperText-root': {
              color: theme =>
                formik.touched.telefono && formik.errors.telefono
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
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={formik.isSubmitting}
          error={formik.touched.telefono && Boolean(formik.errors.telefono)}
          helperText={
            formik.touched.telefono && formik.errors.telefono
              ? formik.errors.telefono
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
                formik.touched.telefono && formik.errors.telefono
                  ? theme.palette.gestion.error
                  : '#090909 !important',
              fontWeight: '400',
            },

            '& .MuiInputLabel-root.Mui-focused': {
              color: theme =>
                formik.touched.telefono && formik.errors.telefono
                  ? theme.palette.gestion.error
                  : `${theme.palette.primary.main} !important`,
            },

            '& .MuiFormHelperText-root': {
              color: theme =>
                formik.touched.telefono && formik.errors.telefono
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
          fullWidth
          id='cuotasFaltantes'
          name='cuotasFaltantes'
          label='Tasa de Retorno'
          variant='outlined'
          value={formik.values.cuotasFaltantes}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={formik.isSubmitting}
          error={formik.touched.telefono && Boolean(formik.errors.telefono)}
          helperText={
            formik.touched.telefono && formik.errors.telefono
              ? formik.errors.telefono
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
                formik.touched.telefono && formik.errors.telefono
                  ? theme.palette.gestion.error
                  : '#090909 !important',
              fontWeight: '400',
            },

            '& .MuiInputLabel-root.Mui-focused': {
              color: theme =>
                formik.touched.telefono && formik.errors.telefono
                  ? theme.palette.gestion.error
                  : `${theme.palette.primary.main} !important`,
            },

            '& .MuiFormHelperText-root': {
              color: theme =>
                formik.touched.telefono && formik.errors.telefono
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
          // #region RETORNO
          fullWidth
          id='retorno'
          name='retorno'
          label='Retorno Esperado'
          variant='outlined'
          value={formik.values.retorno}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={formik.isSubmitting}
          error={formik.touched.telefono && Boolean(formik.errors.telefono)}
          helperText={
            formik.touched.telefono && formik.errors.telefono
              ? formik.errors.telefono
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
                formik.touched.telefono && formik.errors.telefono
                  ? theme.palette.gestion.error
                  : '#090909 !important',
              fontWeight: '400',
            },

            '& .MuiInputLabel-root.Mui-focused': {
              color: theme =>
                formik.touched.telefono && formik.errors.telefono
                  ? theme.palette.gestion.error
                  : `${theme.palette.primary.main} !important`,
            },

            '& .MuiFormHelperText-root': {
              color: theme =>
                formik.touched.telefono && formik.errors.telefono
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
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={formik.isSubmitting}
          error={formik.touched.telefono && Boolean(formik.errors.telefono)}
          helperText={
            formik.touched.telefono && formik.errors.telefono
              ? formik.errors.telefono
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
                formik.touched.telefono && formik.errors.telefono
                  ? theme.palette.gestion.error
                  : '#090909 !important',
              fontWeight: '400',
            },

            '& .MuiInputLabel-root.Mui-focused': {
              color: theme =>
                formik.touched.telefono && formik.errors.telefono
                  ? theme.palette.gestion.error
                  : `${theme.palette.primary.main} !important`,
            },

            '& .MuiFormHelperText-root': {
              color: theme =>
                formik.touched.telefono && formik.errors.telefono
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
            inputProps={{
              maxLength: 300,
            }}
            onChange={e => {
              if (e.target.value.length <= 300) {
                setChars(e.target.value.length);
                formik.handleChange(e);
              }
            }}
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
