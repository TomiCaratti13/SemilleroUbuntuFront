import { useFormik } from 'formik';
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
} from '@mui/material';
import formMicros from '../../../utils/schemas/schemaFormMicros';
import { UploadImages } from '../components/UploadImages';
import { useState } from 'react';
import categoriasAPI from '../../../utils/mocks/Categorias.json';

export const VerMicro = ({ microemprendimiento, setVer }) => {
  console.log('ACACACA', microemprendimiento);
  const [images, setImages] = useState([]);
  // Array Pais
  const paisAPI = [
    {
      id: 1,
      nombre: 'Argentina',
    },
    { id: 2, nombre: 'Brasil' },
    { id: 3, nombre: 'Chile' },
    { id: 4, nombre: 'Uruguay' },
  ];
  const [pais, setPais] = useState('');
  const handlePais = event => {
    setPais(event.target.value);
  };

  //Array Categorias importadas
  const [categoria, setCategoria] = useState('');
  const handleCategoria = event => {
    setCategoria(event.target.value);
  };

  //Array Provincias importadas
  const provinciasAPI = [
    { id: 1, nombre: 'Buenos Aires' },
    { id: 2, nombre: 'Córdoba' },
    { id: 3, nombre: 'Santa Fe' },
    { id: 4, nombre: 'Mendoza' },
  ];
  const [provincia, setProvincia] = useState('');
  const handleProvincia = event => {
    setProvincia(event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      nombre: '' || microemprendimiento.title,
      categoria: '' || microemprendimiento.category,
      subcategoria: '' || microemprendimiento.subcategory,
      pais: '' || microemprendimiento.pais,
      provincia: '' || microemprendimiento.provincia,
      ciudad: '' || microemprendimiento.ubication,
      descripcion: '' || microemprendimiento.description,
      masInfo: '' || microemprendimiento.moreinfo,
    },
    validationSchema: formMicros,
  });

  return (
    <>
      <Container
        component="form"
        onSubmit={formik.handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '100%',
          maxWidth: '600px',
          margin: '10px auto',
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
              : 'Se visualizará en el título de la publicación'
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
            value={formik.values.categoria}
            label="Categoría"
            onChange={e => {
              handleCategoria(e), formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}>
            {categoriasAPI.map(categoria => (
              <MenuItem
                key={categoria.identifier}
                value={categoria.identifier}>
                {categoria.title}
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
          label="Subcategoría*"
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
            value={formik.values.pais}
            label="País"
            onChange={e => {
              handlePais(e), formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}>
            {paisAPI.map(pais => (
              <MenuItem
                key={pais.id}
                value={pais.id}>
                {pais.nombre}
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
            value={formik.values.provincia}
            label="Provincia/Estado"
            onChange={e => {
              handleProvincia(e), formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}>
            {provinciasAPI.map(provincia => (
              <MenuItem
                key={provincia.id}
                value={provincia.id}>
                {provincia.nombre}
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
              {formik.values.descripcion.length}/300
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
              {formik.values.masInfo.length}/300
            </Typography>
          </Box>
        </Box>

        <UploadImages
          images={images}
          setImages={setImages}
          direction={'row'}
          zoom={true}
        />
      </Container>
    </>
  );
};
