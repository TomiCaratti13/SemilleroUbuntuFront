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
export const CalculoInversion = ({ card, setSelectedCard, setValue, value, riesgo }) => {

  const formik = useFormik({
    initialValues: {
      monto: card?.usuarioSolicitante?.nombre || '',
      costosGestion: card?.usuarioSolicitante?.email || '',
      totalAportar: card?.usuarioSolicitante?.telefono || '',
      riesgo: card?.usuarioSolicitante?.nombre || '',
      cuotas: card?.usuarioSolicitante?.nombre || '',
      cuotasFaltantes: card?.usuarioSolicitante?.nombre || '',
      retorno: card?.usuarioSolicitante?.nombre || '',
      ganancias: card?.usuarioSolicitante?.nombre || '',
      porMes: card?.usuarioSolicitante?.nombre || '',
      descripcion: card?.usuarioSolicitante?.nombre || 'Si decides optar por esta inversión, podrás empezar a cobrar a partir del poximo mes, durante 12 meses el monto de $57.452,89',
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
        // onBack={onBack}
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
        <Container
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            width: '100%',
            maxWidth: '600px',
            margin: 'auto',
          }}>
          <Typography
            sx={{
              fontSize: '18px',
              lineHeight: '19px',
              fontWeight: 700,
              color: 'azul.main',
              padding: value === '2' ? '27px 0 8px 0' : null,
              display: 'flex',
              gap: '4px',
              justifyContent: 'center',
              width: '100%',
            }}>
            {value === '2' ? (<CircleIcon
              fontSize='small'
              sx={{
                color: card.gestionado
                  ? 'gestion.exito'
                  : 'gestion.nogestionada',
              }}
            />) : null}
            {card.nombre ? card.nombre : 'Microemp'}
          </Typography>
          {value === '2' ?
            (<Typography
              sx={{
                fontSize: '14px',
                lineHeight: '1px',
                fontWeight: 700,
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                m: '-8px 0 8px 0'
              }}
            >
              N°: {card.id}
            </Typography>)
            : null
          }
          <Typography
            sx={{
              fontSize: '14px',
              mt: '16px',
              fontWeight: 400,
              display: 'flex',
              gap: '4px',
              flexGrow: 1,
              justifyContent: 'center',
              width: '100%',
            }}>
            Formulario de Cálculo Inversión
          </Typography>
        </Container>
        <TextField
          // #region MONTO 
          fullWidth
          id='monto'
          name='monto'
          label='Monto a Invertir'
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
        <FormControl
        // #region RIESGO
        >
          <InputLabel id='select-label'>Riesgo Inversion</InputLabel>
          <Select
            label='Riesgo Inversion'
            labelId='select-label'
            displayEmpty
            defaultValue='0'
            // onChange={formik.handleConsult}
            inputProps={{
              id: 'uncontrolled-native',
            }}
            sx={{

              '& .MuiOutlinedInput-input': {
                display: 'flex',
                alignItems: 'center',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#090909',
              },

              '& .MuiFormLabel-root': {
                color: theme =>
                  formik.touched.telefono && formik.errors.telefono
                    ? theme.palette.gestion.error
                    : '#090909 !important',
                fontWeight: '800',
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
          >
            <MenuItem value='0'>
              <ListItemIcon>
                <Typography
                  sx={{
                    fontWeight: '400',
                  }}>
                  Seleccione un Nivel de Riesgo
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
                      color: riesgo.nombre === 'ALTO'
                        ? 'nivel.alto'
                        : (riesgo.nombre === 'MEDIO'
                          ? 'nivel.medio'
                          : (riesgo.nombre === 'BAJO'
                            ? 'nivel.bajo'
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
        {(value === '2' ? (
          <TextField
            fullWidth
            id='cuotasFaltantes'
            name='cuotasFaltantes'
            label='Cuotas Faltantes'
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
        ) : (null))}
        {(value === '1' ? (
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
        ) : (null))}
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
        {(value === '2' ? (
          <TextField
            // #region POR MES
            fullWidth
            id='porMes'
            name='porMes'
            label='Retorno Mensual'
            variant='outlined'
            value={formik.values.porMes}
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
        ) : (
          <Box>
            <TextField
              // #region DESCRIPCION
              fullWidth
              id='mensaje'
              name='mensaje'
              label='Descripcion'
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
        ))}
        <Box
          sx={{
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
