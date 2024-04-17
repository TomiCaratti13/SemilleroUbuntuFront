import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  useMediaQuery,
} from '@mui/material';
import { useFormik } from 'formik';
import { useAlertModal } from '../../../utils/hooks/useAlertModal';
import { AlertModal } from '../../../components/AlertModal';
import { UploadImages } from '../components/UploadImages';
import formMicros from '../../../utils/schemas/schemaFormMicros';
import {
  getAllProvincias,
  getCategorias,
  getPais,
  getProvinciasPais,
  postFormularioMicro,
  postImagenesMicro,
  putFormularioMicro,
  putImagenesMicro,
} from '../../../utils/services/axiosConfig';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { clearToken } from '../../../utils/redux/tokenSlice';
import { addUser } from '../../../utils/redux/userSlice';
import { useLogout } from '../../../utils/hooks/useLogout';

export const FormMicro = ({ microemprendimiento, setCrear, setEditar }) => {
  const token = useSelector(state => state.token);
  const crearMicro = async (formEnviar, images, paisId, provinciaId) => {
    //Crear publicacion
    postFormularioMicro(formEnviar, paisId, provinciaId, token)
      .then(response => {
        if (response && (response.status === 200 || response.status === 201)) {
          //ENVIO ARRAY DE IMAGENES
          const formImages = new FormData();
          images.forEach((image, index) => {
            formImages.append('imagenes', image, `image-${index}`);
          });
          // Aquí necesitas esperar a que todas las imágenes se hayan agregado a formImages antes de llamar a putImagenesPublicacion
          Promise.all(formImages.getAll('imagenes')).then(() => {
            postImagenesMicro(formImages, response.data, token)
              .then(response => {
                if (
                  response &&
                  (response.status === 200 || response.status === 201)
                ) {
                  openAlert(true, 'Microemprendimiento cargado con éxito');
                } else {
                  openAlert(
                    false,
                    'Lo sentimos, el Microemprendimiento no pudo ser cargado.',
                    `Por favor, volvé a intentarlo`
                  );
                }
              })
              .catch(error => {
                // Hubo un error al subir una o más imágenes
                console.error('Error al enviar el formulario:', error);
                openAlert(
                  false,
                  'Lo sentimos, el Microemprendimiento no pudo ser cargado.',
                  `Por favor, volvé a intentarlo`
                );
              });
          });
        } else {
          openAlert(
            false,
            'Lo sentimos, el Microemprendimiento no pudo ser cargado.',
            `Por favor, volvé a intentarlo`
          );
        }
      })
      .catch(error => {
        // Hubo un error al enviar el formulario
        console.error('Error al enviar el formulario:', error);
        openAlert(
          false,
          'Lo sentimos, el Microemprendimiento no pudo ser cargado.',
          `Por favor, volvé a intentarlo`
        );
      });
  };

  const editarMicro = async (
    formEnviar,
    images,
    idMicro,
    idProvincia,
    idPais
  ) => {
    //Editar publicacion
    putFormularioMicro(formEnviar, idMicro, idProvincia, idPais, token)
      .then(response => {
        if (response && (response.status === 200 || response.status === 204)) {
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
            putImagenesMicro(formImages, idMicro, token)
              .then(response => {
                if (
                  response &&
                  (response.status === 200 || response.status === 204)
                ) {
                  openAlert(true, 'Cambios guardados con éxito');
                } else {
                  openAlert(
                    false,
                    'Lo sentimos, los cambios no pudieron ser guardados.',
                    `Por favor, volvé a intentarlo`
                  );
                }
              })
              .catch(error => {
                // Hubo un error al subir una o más imágenes
                console.error('Error al enviar el formulario:', error);
                openAlert(
                  false,
                  'Lo sentimos, los cambios no pudieron ser guardados.',
                  `Por favor, volvé a intentarlo`
                );
              });
          });
        } else {
          openAlert(
            false,
            'Lo sentimos, los cambios no pudieron ser guardados.',
            `Por favor, volvé a intentarlo`
          );
        }
      })
      .catch(error => {
        // Hubo un error al enviar el formulario
        console.error('Error al enviar el formulario:', error);
        openAlert(
          false,
          'Lo sentimos, los cambios no pudieron ser guardados.',
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

  //Llamar informacion de los selects
  const [images, setImages] = useState(microemprendimiento.imagenes || []);
  const [categorias, setCategorias] = useState([]);
  const [paises, setPaises] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const closeSesion = useLogout();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [provinciasData, paisData, categoriasData] = await Promise.all([
          getAllProvincias(token),
          getPais(token),
          getCategorias(token),
        ]);

        if (
          provinciasData.status === 403 ||
          paisData.status === 403 ||
          categoriasData.status === 403
        ) {
          closeSesion();
        }

        setProvincias(provinciasData.data);
        setPaises(paisData.data);
        setCategorias(categoriasData);

        if (microemprendimiento) {
          if (categoriasData.length > 0) {
            formik.setFieldValue(
              'categoria',
              microemprendimiento.rubroId || ''
            );
          }
          if (paisData.data.length > 0) {
            formik.setFieldValue('pais', microemprendimiento.paisId || '');
          }
        }

        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [, microemprendimiento]);

  useEffect(() => {
    formik.setFieldValue('imagenes', images);
  }, [images]);

  const formik = useFormik({
    initialValues: {
      nombre: microemprendimiento.title || '',
      categoria: '',
      subcategoria: microemprendimiento.subcategory || '',
      pais: '',
      provincia: '',
      ciudad: microemprendimiento.ciudad || '',
      descripcion: microemprendimiento.description || '',
      masInfo: microemprendimiento.moreinfo || '',
      imagenes: images,
    },
    validationSchema: formMicros,
    onSubmit: async formData => {
      try {
        formik.setSubmitting(true);

        // Verificar que se haya subido al menos una imagen
        if (formData.imagenes.length <= 0) {
          handleAlert('Debes subir al menos una imagen', 'error');
          formik.setSubmitting(false);
          return;
        }

        const formEnviar = {
          nombre: formData.nombre,
          descripcion: formData.descripcion,
          masInformacion: formData.masInfo,
          ciudad: formData.ciudad,
          rubro: {
            id: formData.categoria,
          },
          subRubro: formData.subcategoria,
        };

        console.log(formData, images);
        {
          microemprendimiento.id
            ? editarMicro(
                formEnviar,
                formData.imagenes,
                microemprendimiento.id,
                formData.provincia,
                formData.pais
              )
            : crearMicro(
                formEnviar,
                formData.imagenes,
                formData.pais,
                formData.provincia
              );
        }

        formik.setSubmitting(false);
      } catch (error) {
        formik.setSubmitting(false);
        console.log(error);
      }
    },
  });

  useEffect(() => {
    if (formik.values.pais) {
      getProvinciasPais(formik.values.pais, token).then(provincias => {
        setProvincias(provincias.data);
        //Verifica que haya micro, haya provincias, y el id de la provincia este en el array sino ""
        if (
          microemprendimiento &&
          provincias.data.length > 0 &&
          provincias.data.find(
            provincia => provincia.id === microemprendimiento.provinciaId
          )
        ) {
          formik.setFieldValue('provincia', microemprendimiento.provinciaId);
        } else {
          formik.setFieldValue('provincia', '');
        }
      });
    }
  }, [formik.values.pais]);

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
    openAlert(
      'loading',
      'Microemprendimiento en proceso',
      'Por favor, aguarde unos segundos'
    );
  };

  const isSmallScreen = useMediaQuery('(max-width: 570px)');

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
        {/* FORMULARIO NOMBRE */}
        <TextField
          fullWidth
          id="nombre"
          name="nombre"
          label="Nombre del Microemprendimiento*"
          variant="outlined"
          value={formik.values.nombre}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={formik.isSubmitting}
          error={formik.touched.nombre && Boolean(formik.errors.nombre)}
          helperText={
            formik.touched.nombre && formik.errors.nombre
              ? formik.errors.nombre
              : 'Se visualizará en el título de la Microemprendimiento'
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

        {/* FORMULARIO CATEGORIAS */}
        <FormControl
          fullWidth
          error={formik.touched.categoria && Boolean(formik.errors.categoria)}
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
                formik.touched.categoria && formik.errors.categoria
                  ? theme.palette.gestion.error
                  : '#090909 !important',
              fontWeight: '400',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: theme =>
                formik.touched.categoria && formik.errors.categoria
                  ? theme.palette.gestion.error
                  : `${theme.palette.primary.main} !important`,
            },
            '& .MuiFormHelperText-root': {
              color: theme =>
                formik.touched.categoria && formik.errors.categoria
                  ? theme.palette.gestion.error
                  : '#090909 !important',
              fontWeight: '400',
              fontSize: '13px',
            },
            '& .Mui-disabled': {
              color: theme => `${theme.palette.primary.main} !important`,
            },
          }}>
          <InputLabel
            sx={{ fontWeight: 400, color: 'negro.main' }}
            id="demo-simple-select-label">
            Categoría*
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="categoria"
            name="categoria"
            value={formik.values.categoria || ''}
            label="Categoría"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}>
            {categorias.map(categoria => (
              <MenuItem
                key={categoria.id}
                value={categoria.id || ''}>
                {categoria.nombre || ''}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>
            {formik.touched.categoria && formik.errors.categoria
              ? formik.errors.categoria
              : 'Seleccioná la categoría del Microemprendimiento'}
          </FormHelperText>
        </FormControl>

        {/* FORMULARIO Subcategoria */}
        <TextField
          fullWidth
          id="subcategoria"
          name="subcategoria"
          label="Subcategoría"
          variant="outlined"
          value={formik.values.subcategoria}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={formik.isSubmitting}
          error={
            formik.touched.subcategoria && Boolean(formik.errors.subcategoria)
          }
          helperText={
            formik.touched.subcategoria && formik.errors.subcategoria
              ? formik.errors.subcategoria
              : 'Escribí la subcategoría del Microemprendimiento'
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
                formik.touched.subcategoria && formik.errors.subcategoria
                  ? theme.palette.gestion.error
                  : '#090909 !important',
              fontWeight: '400',
            },

            '& .MuiInputLabel-root.Mui-focused': {
              color: theme =>
                formik.touched.subcategoria && formik.errors.subcategoria
                  ? theme.palette.gestion.error
                  : `${theme.palette.primary.main} !important`,
            },

            '& .MuiFormHelperText-root': {
              color: theme =>
                formik.touched.subcategoria && formik.errors.subcategoria
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

        {/* FORMULARIO PAIS */}
        <FormControl
          fullWidth
          error={formik.touched.pais && Boolean(formik.errors.pais)}
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
                formik.touched.pais && formik.errors.pais
                  ? theme.palette.gestion.error
                  : '#090909 !important',
              fontWeight: '400',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: theme =>
                formik.touched.pais && formik.errors.pais
                  ? theme.palette.gestion.error
                  : `${theme.palette.primary.main} !important`,
            },
            '& .MuiFormHelperText-root': {
              color: theme =>
                formik.touched.pais && formik.errors.pais
                  ? theme.palette.gestion.error
                  : '#090909 !important',
              fontWeight: '400',
              fontSize: '13px',
            },
            '& .Mui-disabled': {
              color: theme => `${theme.palette.primary.main} !important`,
            },
          }}>
          <InputLabel
            sx={{ fontWeight: 400, color: 'negro.main' }}
            id="demo-simple-select-label">
            País*
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="pais"
            name="pais"
            value={formik.values.pais || ''}
            label="País"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}>
            {paises.map(p => (
              <MenuItem
                key={p.id}
                value={p.id || ''}>
                {p.nombre || ''}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>
            {formik.touched.pais && formik.errors.pais
              ? formik.errors.pais
              : 'Seleccioná un País de la lista'}
          </FormHelperText>
        </FormControl>

        {/* FORMULARIO Provincias */}
        <FormControl
          fullWidth
          error={formik.touched.provincia && Boolean(formik.errors.provincia)}
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
                formik.touched.provincia && formik.errors.provincia
                  ? theme.palette.gestion.error
                  : '#090909 !important',
              fontWeight: '400',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: theme =>
                formik.touched.provincia && formik.errors.provincia
                  ? theme.palette.gestion.error
                  : `${theme.palette.primary.main} !important`,
            },
            '& .MuiFormHelperText-root': {
              color: theme =>
                formik.touched.provincia && formik.errors.provincia
                  ? theme.palette.gestion.error
                  : '#090909 !important',
              fontWeight: '400',
              fontSize: '13px',
            },
            '& .Mui-disabled': {
              color: theme => `${theme.palette.primary.main} !important`,
            },
          }}>
          <InputLabel
            sx={{ fontWeight: 400, color: 'negro.main' }}
            id="demo-simple-select-label">
            Provincia/Estado*
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="provincia"
            name="provincia"
            value={formik.values.provincia || ''}
            label="Provincia/Estado"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}>
            {provincias.map(provincia => (
              <MenuItem
                key={provincia.id}
                value={provincia.id || ''}>
                {provincia.nombre || ''}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>
            {formik.touched.provincia && formik.errors.provincia
              ? formik.errors.provincia
              : 'Seleccioná una Provincia/Estado de la lista'}
          </FormHelperText>
        </FormControl>

        {/* FORMULARIO ciudad */}
        <TextField
          fullWidth
          id="ciudad"
          name="ciudad"
          label="Ciudad*"
          variant="outlined"
          value={formik.values.ciudad}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={formik.isSubmitting}
          error={formik.touched.ciudad && Boolean(formik.errors.ciudad)}
          helperText={
            formik.touched.ciudad && formik.errors.ciudad
              ? formik.errors.ciudad
              : 'Sin abreviaturas, nombre completo'
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
                formik.touched.ciudad && formik.errors.ciudad
                  ? theme.palette.gestion.error
                  : '#090909 !important',
              fontWeight: '400',
            },

            '& .MuiInputLabel-root.Mui-focused': {
              color: theme =>
                formik.touched.ciudad && formik.errors.ciudad
                  ? theme.palette.gestion.error
                  : `${theme.palette.primary.main} !important`,
            },

            '& .MuiFormHelperText-root': {
              color: theme =>
                formik.touched.ciudad && formik.errors.ciudad
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

        {/* Field Descripcion */}
        <Box>
          <TextField
            fullWidth
            id="descripcion"
            name="descripcion"
            label="Descripción del Microemprendimiento*"
            variant="outlined"
            multiline
            rows={5}
            value={formik.values.descripcion}
            inputProps={{
              maxLength: 300,
            }}
            onChange={e => {
              if (e.target.value.length <= 300) {
                formik.handleChange(e);
              }
            }}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
            error={
              formik.touched.descripcion && Boolean(formik.errors.descripcion)
            }
            helperText={formik.touched.descripcion && formik.errors.descripcion}
            sx={{
              '& .MuiOutlinedInput-input': {
                fontWeight: '400',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#090909',
              },

              '& .MuiFormLabel-root': {
                color: theme =>
                  formik.touched.descripcion && formik.errors.descripcion
                    ? theme.palette.gestion.error
                    : '#090909 !important',
                fontWeight: '400',
              },

              '& .MuiInputLabel-root.Mui-focused': {
                color: theme =>
                  formik.touched.descripcion && formik.errors.descripcion
                    ? theme.palette.gestion.error
                    : `${theme.palette.primary.main} !important`,
              },

              '& .MuiFormHelperText-root': {
                color: theme =>
                  formik.touched.descripcion && formik.errors.descripcion
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
                formik.touched.descripcion && formik.errors.descripcion
                  ? theme.palette.gestion.error
                  : '#090909'
              }>
              Máximo 300 caracteres
            </Typography>
            <Typography
              component="p"
              color={theme =>
                formik.touched.descripcion && formik.errors.descripcion
                  ? theme.palette.gestion.error
                  : '#090909'
              }>
              {formik.values.descripcion?.length}/300
            </Typography>
          </Box>
        </Box>

        {/* Field Mas Informacion */}
        <Box>
          <TextField
            fullWidth
            id="masInfo"
            name="masInfo"
            label="Más información del Microemprendedor*"
            variant="outlined"
            multiline
            rows={5}
            value={formik.values.masInfo}
            inputProps={{
              maxLength: 300,
            }}
            onChange={e => {
              if (e.target.value.length <= 300) {
                formik.handleChange(e);
              }
            }}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
            error={formik.touched.masInfo && Boolean(formik.errors.masInfo)}
            helperText={formik.touched.masInfo && formik.errors.masInfo}
            sx={{
              '& .MuiOutlinedInput-input': {
                fontWeight: '400',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#090909',
              },

              '& .MuiFormLabel-root': {
                color: theme =>
                  formik.touched.masInfo && formik.errors.masInfo
                    ? theme.palette.gestion.error
                    : '#090909 !important',
                fontWeight: '400',
              },

              '& .MuiInputLabel-root.Mui-focused': {
                color: theme =>
                  formik.touched.masInfo && formik.errors.masInfo
                    ? theme.palette.gestion.error
                    : `${theme.palette.primary.main} !important`,
              },

              '& .MuiFormHelperText-root': {
                color: theme =>
                  formik.touched.masInfo && formik.errors.masInfo
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
                formik.touched.masInfo && formik.errors.masInfo
                  ? theme.palette.gestion.error
                  : '#090909'
              }>
              Máximo 300 caracteres
            </Typography>
            <Typography
              component="p"
              color={theme =>
                formik.touched.masInfo && formik.errors.masInfo
                  ? theme.palette.gestion.error
                  : '#090909'
              }>
              {formik.values.masInfo?.length}/300
            </Typography>
          </Box>
        </Box>

        <UploadImages
          images={images}
          setImages={setImages}
          direction={'row'}
        />

        <Box
          sx={{
            display: 'flex',
            flexDirection: isSmallScreen ? 'column-reverse' : 'row',
            gap: isSmallScreen ? '0' : '20px',
          }}>
          <Button
            onClick={() => {
              setEditar([]);
              setCrear(false);
            }}
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
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              Volver
            </Typography>
          </Button>

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
              {microemprendimiento.title
                ? 'Editar Microemprendimiento'
                : 'Crear Microemprendimiento'}
            </Typography>
          </Button>
        </Box>
      </Container>
    </>
  );
};
