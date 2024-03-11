import { SectionHero } from '../components/SectionHero';
import { Typography, Box, TextField, Button } from '@mui/material';
import React, { useState } from 'react';
import styled from '@mui/material/styles/styled';
import { useParams } from 'react-router-dom';
import { AlertForm } from '../components/AlertForm';

const CssTextField = styled(TextField)({
  '& label': {
    color: '#093c59',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#090909',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#090909',
      color: '#ff4c0d',
    },
    '&:hover fieldset': {
      borderColor: '#093c59',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#093c59',
    },
  },
});

export const SectionFormularioContacto = () => {
  const sectionForm = {
    category: 'CONTACTO',
    title:
      'Contactanos para obtener información detallada sobre cómo podés invertir en un futuro más sostenible',
    img: '/backgroundForm.webp',
  };

  const [chars, setChars] = useState(0);

  const { id } = useParams();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      sx={{
        display: 'flex',
        overflow: 'hidden',
        flexDirection: 'column',
        gap: '30px',
        width: '100%',
        height: '100%',
        paddingBottom: '30px',
      }}>
      <SectionHero
        category={sectionForm.category}
        title={sectionForm.title}
        img={sectionForm.img}
      />
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          padding: '0 16px',
        }}>
        <Typography
          variant="h4"
          sx={{
            fontSize: '22px',
            lineHeight: '30px',
            fontWeight: 500,
            textAlign: 'center',
            width: '100%',
          }}>
          Por favor, completá el formulario. Nos comunicaremos en breve.
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontSize: '20px',
            lineHeight: '25px',
            fontWeight: 600,
            textAlign: 'center',
            width: '100%',
            color: 'azul.main',
          }}>
          {id}
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontSize: '16px',
            lineHeight: '25px',
            fontWeight: 400,
            textAlign: 'center',
            width: '100%',
          }}>
          Vas a contactar a Ubuntu para recibir más información acerca del
          Microemprendimiento seleccionado.{' '}
        </Typography>
      </Box>
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          padding: '0 16px',
          '& .MuiTextField-root': {
            width: '100%',
            padding: '0',
            '&::placeholder': {
              color: 'azul.main',
              fontSize: '16px',
              fontWeight: 700,
            },
          },
        }}
        noValidate
        autoComplete="off">
        <CssTextField
          id="Apellido y Nombre"
          label="Apellido y Nombre"
          required
        />
        <CssTextField
          id="Correo electrónico"
          label="Correo electrónico"
          required
          type="email"
        />
        <CssTextField
          id="Teléfono"
          label="Teléfono"
          required
          helperText="Con el siguiente formato +54 9 261 002 002"
        />
        <Box>
          <CssTextField
            id="Mensaje"
            label="Mensaje"
            multiline
            required
            rows={6}
            inputProps={{
              maxLength: 300,
            }}
            onChange={e => {
              if (e.target.value.length <= 300) {
                setChars(e.target.value.length);
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
          onClick={handleOpen}
          // type="submit"
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
        <AlertForm
          open={open}
          setOpen={setOpen}
          success={false}
        />
      </Box>
    </Box>
  );
};
