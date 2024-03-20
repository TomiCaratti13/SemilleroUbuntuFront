import { useState } from 'react';

import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { useFormik } from 'formik';
import formContact from '../../utils/schemas/schemaFormContact';
import * as yup from 'yup';

export const FormContact = ({ nameMicro, alert }) => {
  const [chars, setChars] = useState(0);
  const formik = useFormik({
    initialValues: {
      nombre: '',
      email: 'asda@gaskdla.com',
      telefono: '2313',
      mensaje: 'Hola mundo',
    },
    validationSchema: formContact,
    onSubmit: formData => {
      console.log(formData);
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
        error={formik.errors.nombre}
      />
      <TextField
        fullWidth
        id="email"
        name="email"
        label="Correo electrónico"
        variant="outlined"
        value={formik.values.email}
        onChange={formik.handleChange}
      />
      <TextField
        fullWidth
        id="telefono"
        name="telefono"
        label="Teléfono"
        variant="outlined"
        helperText="Con el siguiente formato +54 9 261 002 002"
        value={formik.values.telefono}
        onChange={formik.handleChange}
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
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            padding: '0 16px',
            '& p': {
              fontSize: '13px',
              lineHeight: '1.66',
              fontWeight: 300,
              marginTop: '3px',
              padding: '0',
            },
          }}>
          <Typography
            component="p"
            sx={{ fontSize: '16px', lineHeight: '25px' }}>
            Máximo 300 caracteres
          </Typography>
          <Typography
            component="p"
            sx={{ fontSize: '16px', lineHeight: '25px' }}>
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
