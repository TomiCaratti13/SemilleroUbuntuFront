import { useState } from 'react';
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
} from '@mui/material';
import { AlertModal } from '../../../components/AlertModal';
import { useAlertModal } from '../../../utils/hooks/useAlertModal';
import { useFormik } from 'formik';
import formContact from '../../../utils/schemas/schemaFormContact';
import { putFormulario } from '../../../utils/services/axiosConfig';

export const DetalleContacto = ({
  contacto,
  setSelectedContacto,
  setValue,
}) => {
  //Arreglo fecha Unix
  let timestamp = contacto.fechaCreacion;
  let date = new Date(timestamp);
  const contactoFecha = date.toLocaleDateString('es-AR', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  const formik = useFormik({
    initialValues: {
      nombre: contacto?.usuarioSolicitante?.nombre || '',
      email: contacto?.usuarioSolicitante?.email || '',
      telefono: contacto?.usuarioSolicitante?.telefono || '',
      mensaje: contacto?.descripcion || '',
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

        putFormulario(formEnviar, contacto.id)
          .then(response => {
            // console.log('RESPUESTA COMPONENETE', response);
            //MANEJO DE ALERTAS
            if (response && response.status === 200) {
              openAlert(true, 'Estado modificado con éxito');
            } else {
              openAlert(
                false,
                'Lo sentimos, el Estado no pudo ser cambiado',
                'Por favor, volvé a intentarlo'
              );
            }
          })
          .catch(error => {
            console.error('Error al enviar el formulario:', error);
            openAlert(
              false,
              'Lo sentimos, el Estado no pudo ser cambiado',
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

  const [isFocused, setIsFocused] = useState(false);
  return (
    <>
      <AlertModal
        closeAlert={closeAlert}
        resendAlert={resendAlert}
        alert={alertModal}
        setSelectedContacto={setSelectedContacto}
        setValue={setValue}
      />
      <Container
        // onBack={onBack}
        component="form"
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
              lineHeight: '24px',
              fontWeight: 700,
              color: 'negro.main',
              padding: '0 0 8px 0',
              display: 'flex',
              gap: '4px',
              flexGrow: 1,
              justifyContent: 'center',
              width: '100%',
            }}>
            <CircleIcon
              sx={{
                color: contacto.gestionado
                  ? 'gestion.exito'
                  : 'gestion.nogestionada',
              }}
            />
            {contacto.gestionado ? 'Gestionada' : 'No gestionada'}
          </Typography>
          {contacto.gestionado ? null : (
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
              <FormControl
                sx={{
                  width: '200px',
                  bgcolor: 'gris.claro',
                  border: 'none',
                }}>
                {!isFocused && (
                  <InputLabel id="demo-simple-select-label">Estado</InputLabel>
                )}
                <Select
                  labelId="demo-simple-select-label"
                  displayEmpty
                  defaultValue=""
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onChange={formik.handleSubmit}
                  inputProps={{
                    id: 'uncontrolled-native',
                  }}>
                  <MenuItem value="20">
                    <ListItemIcon>
                      <CircleIcon
                        sx={{
                          color: 'gestion.exito',
                        }}
                      />
                      <Typography
                        sx={{
                          pl: '8px',
                        }}>
                        Gestionada
                      </Typography>
                    </ListItemIcon>
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}
          <Typography
            sx={{
              fontSize: '22px',
              lineHeight: '24px',
              fontWeight: 700,
              color: 'azul.main',
              display: 'flex',
              gap: '4px',
              flexGrow: 1,
              justifyContent: 'center',
              width: '100%',
            }}>
            {contacto.microemprendimiento}
            {contacto.id}
          </Typography>
          <Typography
            sx={{
              fontSize: '16px',
              lineHeight: '24px',
              fontWeight: 400,
              color: 'azul.main',
              display: 'flex',
              gap: '4px',
              flexGrow: 1,
              justifyContent: 'center',
              width: '100%',
            }}>
            Fecha de solicitud: {contactoFecha}
          </Typography>
        </Container>
        <TextField
          fullWidth
          id="nombre"
          name="nombre"
          label="Nombre y Apellido"
          variant="outlined"
          value={formik.values.nombre}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={formik.isSubmitting}
          error={formik.touched.nombre && Boolean(formik.errors.nombre)}
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
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Correo electrónico"
          variant="outlined"
          value={formik.values.email}
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
          fullWidth
          id="telefono"
          name="telefono"
          label="Teléfono"
          variant="outlined"
          value={formik.values.telefono}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={formik.isSubmitting}
          error={formik.touched.telefono && Boolean(formik.errors.telefono)}
          helperText={
            formik.touched.telefono && formik.errors.telefono
              ? formik.errors.telefono
              : 'Con el siguiente formato +54 9 261 002 002'
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
            fullWidth
            id="mensaje"
            name="mensaje"
            label="Mensaje"
            variant="outlined"
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
      </Container>
    </>
  );
};
