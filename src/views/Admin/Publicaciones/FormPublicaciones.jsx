import { useEffect, useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useAlertModal } from '../../../utils/hooks/useAlertModal';
import { AlertModal } from '../../../components/AlertModal';
import formPublicaciones from '../../../utils/schemas/schemaFormPublicaciones';
import { UploadImages } from '../components/UploadImages';
import {
  postFormularioPublicacion,
  postImagenesPublicacion,
} from '../../../utils/services/axiosConfig';
import { useSnackbar } from 'notistack';

const MAX_SIZE = 3 * 1024 * 1024; // 3 MB

export const FormPublicaciones = ({ publicacion, setCrear }) => {
  //Manejar alertas Snackbar
  const { enqueueSnackbar } = useSnackbar();
  const handleAlert = (mensaje, color) => {
    enqueueSnackbar(mensaje, {
      variant: color,
    });
  };

  const [images, setImages] = useState(publicacion.imagenes || []);

  useEffect(() => {
    formik.setFieldValue('imagenes', images);
  }, [images]);

  const formik = useFormik({
    initialValues: {
      titulo: publicacion.title || '',
      contenido: publicacion.description || '',
      imagenes: images,
    },
    validationSchema: formPublicaciones,
    onSubmit: async formData => {
      try {
        formik.setSubmitting(true);

        // Verificar que se haya subido al menos una imagen
        if (formData.imagenes.length === 0) {
          handleAlert('Debes subir al menos una imagen', 'error');
          formik.setSubmitting(false);
          return;
        }

        const formEnviar = {
          titulo: formData.titulo,
          descripcion: formData.contenido,
        };

        postFormularioPublicacion(formEnviar)
          .then(response => {
            if (response && response.status === 200) {
              //LLAMADO UNO POR UNO
              //     // Crear un array de promesas para la subida de las imágenes
              //     const uploadPromises = images.map((image, index) => {
              //       // Verificar el tamaño de la imagen
              //       if (image.size > MAX_SIZE) {
              //         // La imagen es demasiado grande
              //         throw new Error(
              //           `La imagen ${
              //             index + 1
              //           } es demasiado grande. El tamaño máximo permitido es ${
              //             MAX_SIZE / 1024 / 1024
              //           } MB.`
              //         );
              //       }
              //       const formData = new FormData();
              //       formData.append('imagenes', image, `image-${index}`);
              //       return postImagenesPublicacion(formData, response.data.body.id);
              //     });
              //     // Esperar a que todas las imágenes se hayan subido
              //     Promise.all(uploadPromises)
              //       .then(responses => {
              //         // Todas las imágenes se han subido
              //         if (responses && responses.length > 0) {
              //           openAlert(
              //             true,
              //             'Publicación creada',
              //             'La publicación se ha creado correctamente'
              //           );
              //         } else {
              //           openAlert(
              //             false,
              //             'Error al enviar el formulario',
              //             `Una imagen es demasiado grande. El tamaño máximo permitido es ${
              //               MAX_SIZE / 1024 / 1024
              //             } MB.`
              //           );
              //         }
              //       })

              //ENVIO ARRAY DE IMAGENES
              const formImages = new FormData();
              images.forEach((image, index) => {
                formImages.append('imagenes', image, `image-${index}`);
              });

              postImagenesPublicacion(formImages, response.data.body.id)
                .then(response => {
                  if (response && response.status === 200) {
                    openAlert(
                      true,
                      'Publicación creada',
                      'La publicación se ha creado correctamente'
                    );
                  } else {
                    openAlert(
                      false,
                      'Lo sentimos, la Publicación no pudo ser creada.',
                      `Por favor, volvé a intentarlo`
                    );
                  }
                })
                .catch(error => {
                  // Hubo un error al subir una o más imágenes
                  console.error('Error al enviar el formulario:', error);
                  openAlert(
                    false,
                    'Lo sentimos, la Publicación no pudo ser creada.',
                    `Por favor, volvé a intentarlo`
                  );
                });
            } else {
              openAlert(
                false,
                'Lo sentimos, la Publicación no pudo ser creada.',
                `Por favor, volvé a intentarlo`
              );
            }
          })
          .catch(error => {
            // Hubo un error al enviar el formulario
            console.error('Error al enviar el formulario:', error);
            openAlert(
              false,
              'Lo sentimos, la Publicación no pudo ser creada.',
              `Por favor, volvé a intentarlo`
            );
          });

        formik.setSubmitting(false);
      } catch (error) {
        formik.setSubmitting(false);
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
        setCrear={setCrear}
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
          margin: '0 auto',
          padding: '0',
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
              '& .MuiOutlinedInput-input': {
                fontWeight: '400',
              },

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
          direction={'column'}
          maxSize={MAX_SIZE}
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
