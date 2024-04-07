import { useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useAlertModal } from '../../../utils/hooks/useAlertModal';
import { AlertModal } from '../../../components/AlertModal';
import formPublicaciones from '../../../utils/schemas/schemaFormPublicaciones';
import { UploadImages } from './UploadImages';

export const FormPublicaciones = ({ publicacion }) => {
  const [images, setImages] = useState(publicacion.images || []);

  const formik = useFormik({
    initialValues: {
      titulo: publicacion.title || '',
      contenido: publicacion.description || '',
    },
    validationSchema: formPublicaciones,
    onSubmit: formData => {
      try {
        formik.setSubmitting(true);

        const formEnviar = {
          descripcion: formData.contenido,
          usuarioSolicitante: {
            titulo: formData.titulo,
          },
        };

        enviarFormularioPublis(formEnviar, idMic)
          .then(response => {
            //MANEJO DE ALERTAS
            if (response && response.status === 200) {
              openAlert(
                true,
                'Formulario enviado con éxito',
                'Gracias por contactarnos, nos comunicaremos en breve'
              );
            } else {
              openAlert(
                false,
                'Error al enviar el formulario',
                'Por favor, volvé a intentarlo'
              );
            }
          })
          .catch(error => {
            console.error('Error al enviar el formulario:', error);
            openAlert(
              false,
              'Error al enviar el formulario',
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

  return (
    <>
      <AlertModal
        closeAlert={closeAlert}
        resendAlert={resendAlert}
        alert={alertModal}
      />
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
          id="titulo"
          name="titulo"
          label="Titulo*"
          variant="outlined"
          value={formik.values.titulo}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={formik.isSubmitting}
          error={formik.touched.titulo && Boolean(formik.errors.titulo)}
          helperText={
            formik.touched.titulo && formik.errors.titulo
              ? formik.errors.titulo
              : 'Se visualizará en el titulo de la publicación'
          }
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
                formik.touched.titulo && formik.errors.titulo
                  ? theme.palette.gestion.error
                  : '#090909 !important',
              fontWeight: '400',
            },

            '& .MuiInputLabel-root.Mui-focused': {
              color: theme =>
                formik.touched.titulo && formik.errors.titulo
                  ? theme.palette.gestion.error
                  : `${theme.palette.primary.main} !important`,
            },

            '& .MuiFormHelperText-root': {
              color: theme =>
                formik.touched.titulo && formik.errors.titulo
                  ? theme.palette.gestion.error
                  : '#090909 !important',
              fontWeight: '400',
              fontSize: '13px',
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
            id="contenido"
            name="contenido"
            label="Ingresá el contenido de la publicación*"
            variant="outlined"
            multiline
            rows={16}
            value={formik.values.contenido}
            inputProps={{
              maxLength: 2000,
            }}
            onChange={e => {
              if (e.target.value.length <= 2000) {
                formik.handleChange(e);
              }
            }}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
            error={formik.touched.contenido && Boolean(formik.errors.contenido)}
            helperText={formik.touched.contenido && formik.errors.contenido}
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#090909',
              },

              '& .MuiFormLabel-root': {
                color: theme =>
                  formik.touched.contenido && formik.errors.contenido
                    ? theme.palette.gestion.error
                    : '#090909 !important',
                fontWeight: '400',
              },

              '& .MuiInputLabel-root.Mui-focused': {
                color: theme =>
                  formik.touched.contenido && formik.errors.contenido
                    ? theme.palette.gestion.error
                    : `${theme.palette.primary.main} !important`,
              },

              '& .MuiFormHelperText-root': {
                color: theme =>
                  formik.touched.contenido && formik.errors.contenido
                    ? theme.palette.gestion.error
                    : '#090909 !important',
                fontWeight: '400',
                fontSize: '13px',
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
                formik.touched.contenido && formik.errors.contenido
                  ? theme.palette.gestion.error
                  : '#090909'
              }>
              Máximo 2000 caracteres
            </Typography>
            <Typography
              component="p"
              color={theme =>
                formik.touched.contenido && formik.errors.contenido
                  ? theme.palette.gestion.error
                  : '#090909'
              }>
              {formik.values.contenido.length}/2000
            </Typography>
          </Box>
        </Box>

        <UploadImages
          images={images}
          setImages={setImages}
        />

        <Button
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
            Crear publicación
          </Typography>
        </Button>
      </Container>
    </>
  );
};
