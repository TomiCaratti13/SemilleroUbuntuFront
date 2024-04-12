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
  putFormularioPublicacion,
  putImagenesPublicacion,
} from '../../../utils/services/axiosConfig';
import { useSnackbar } from 'notistack';
import { capitalizeTrim } from '../../../utils/services/capitalize';
import { useSelector } from 'react-redux';

export const FormPublicaciones = ({ publicacion, setCrear, setEditar }) => {
  //Token obtenido al logearse
  const token = useSelector(state => state.token);

  const crearPublicacion = async (formEnviar, images) => {
    //Crear publicacion
    postFormularioPublicacion(formEnviar, token)
      .then(response => {
        if (response && response.status === 200) {
          //ENVIO ARRAY DE IMAGENES
          const formImages = new FormData();
          images.forEach((image, index) => {
            formImages.append('imagenes', image, `image-${index}`);
          });
          // Aquí necesitas esperar a que todas las imágenes se hayan agregado a formImages antes de llamar a putImagenesPublicacion
          Promise.all(formImages.getAll('imagenes')).then(() => {
            postImagenesPublicacion(formImages, response.data.body.id, token)
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
  };

  const editarPublicacion = async (formEnviar, images, idPubli) => {
    //Editar publicacion
    putFormularioPublicacion(formEnviar, idPubli, token)
      .then(response => {
        if (response && response.status === 200) {
          //ENVIO ARRAY DE IMAGENES
          const formImages = new FormData();

          // Creamos un array para almacenar todas las promesas
          const promises = [];

          images.forEach((image, index) => {
            if (image instanceof File) {
              formImages.append('imagenes', image, `image-${index}`);
            } else if (image.cloudinaryUrl) {
              // Agregamos la promesa al array
              promises.push(
                fetch(image.cloudinaryUrl)
                  .then(response => response.blob())
                  .then(blob => {
                    const file = new File([blob], `image-${index}.jpg`, {
                      type: 'image/jpeg',
                    });
                    formImages.append('imagenes', file, `image-${index}`);
                  })
              );
            }
          });

          // Aquí necesitas esperar a que todas las imágenes se hayan agregado a formImages antes de llamar a putImagenesPublicacion
          Promise.all(promises).then(() => {
            putImagenesPublicacion(formImages, idPubli, token)
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
  };

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

        console.log('Enviando formulario');
        // Verificar que se haya subido al menos una imagen
        if (formData.imagenes.length === 0) {
          handleAlert('Debes subir al menos una imagen', 'error');
          formik.setSubmitting(false);
          return;
        }

        const formEnviar = {
          titulo: capitalizeTrim(formData.titulo),
          descripcion: formData.contenido,
        };

        {
          publicacion.id !== undefined
            ? await editarPublicacion(
                formEnviar,
                formData.imagenes,
                publicacion.id
              )
            : await crearPublicacion(formEnviar, formData.imagenes);
        }

        console.log('formulario enviado');
        formik.setSubmitting(false);
      } catch (error) {
        formik.setSubmitting(false);
      }
    },
  });

  const [alertModal, openAlert, closeAlert, resendAlert] = useAlertModal(
    formik.handleSubmit
  );

  //Desabilitar boton de enviar
  const [sending, setSending] = useState(false);
  const [disabledButton, setDisableButton] = useState(false);
  useEffect(() => {
    if (
      Object.keys(formik.errors).length > 0 ||
      formik.isSubmitting ||
      images.length === 0 ||
      sending
    ) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  }, [formik.errors, formik.isSubmitting, images, sending]);

  const handleDisableButton = () => {
    setSending(true);
    handleAlert("La publicación se está enviando, por favor espera", "info");
    openAlert("loading", 'Publicación en proceso', 'Por favor, aguarde unos segundos');
  };

  return (
    <>
      <AlertModal
        closeAlert={closeAlert}
        resendAlert={resendAlert}
        alert={alertModal}
        setCrear={setCrear}
        setEditar={setEditar}
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
        />

        <Button
          type="submit"
          disabled={disabledButton}
          sx={{
            width: '100%',
            padding: '0 20px',
            height: '40px',
            my: '10px',
            justifyContent: 'space-evenly',
            borderRadius: '100px',
            color: 'blanco.main',
            backgroundColor: disabledButton ? 'gris.medio' : 'azul.main',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: 'azul.main',
            },
            '&:disabled': {
              brackgoundColor: 'gris.medio',
              color: 'gris.oscuro',
              cursor: 'not-allowed',
            },
          }}>
          <Typography
            onClick={handleDisableButton}
            sx={{
              fontWeight: '700',
              fontSize: '16px',
              lineHeight: '30px',
              textAlign: 'center',
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              '&:disabled': {
                color: theme => theme.palette.white,
                cursor: 'not-allowed',
              },
            }}>
            {publicacion.title ? 'Editar Publicación' : 'Crear Publicación'}
          </Typography>
        </Button>
      </Container>
    </>
  );
};
