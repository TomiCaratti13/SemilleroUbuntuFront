import { useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import formContact from '../../utils/schemas/schemaFormContact';
import { enviarFormulario } from '../../utils/services/axiosConfig';

export const FormContact = ({ idMic, setSuccess }) => {
  const [chars, setChars] = useState(0);
  const formik = useFormik({
    initialValues: {
      nombre: '',
      email: '',
      telefono: '',
      mensaje: '',
    },
    validationSchema: formContact,
    onSubmit: formData => {
      // console.log(formData);
      const formEnviar = {
        descripcion: formData.mensaje,
        usuarioSolicitante: {
          nombre: formData.nombre,
          email: formData.email,
          telefono: formData.telefono
        }
      };
      console.log(formEnviar);

      enviarFormulario(formEnviar,idMic).then((response) => {
        console.log(response);
        // setSuccess(true);
      });
    },
  });
  return (
    <Container
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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            padding: '0 15px',
            '& p': {
              fontSize: '13px',
              lineHeight: '1.66',
              fontWeight: 400,
              marginTop: '3px',
              padding: '0',
            },
          }}>
          <Typography
            component="p"
            color={theme =>
              formik.touched.mensaje && formik.errors.mensaje
                ? theme.palette.gestion.error
                : '#090909'
            }>
            Máximo 300 caracteres
          </Typography>
          <Typography
            component="p"
            color={theme =>
              formik.touched.mensaje && formik.errors.mensaje
                ? theme.palette.gestion.error
                : '#090909'
            }>
            {chars}/300
          </Typography>
        </Box>
      </Box>
      <Button
        // onClick={handleSubmit}
        type="submit"
        sx={{
          width: '100%',
          padding: '0 20px',
          height: '40px',
          my: '10px',
          justifyContent: 'space-evenly',
          borderRadius: '100px',
          color: 'blanco.main',
          backgroundColor: 'azul.main',
          textTransform: 'none',
          '&:hover': {
            backgroundColor: 'azul.main',
          },
        }}>
        <Typography
          sx={{
            fontWeight: '700',
            fontSize: '16px',
            lineHeight: '30px',
            textAlign: 'center',
          }}>
          Enviar
        </Typography>
      </Button>
    </Container>
  );
};
