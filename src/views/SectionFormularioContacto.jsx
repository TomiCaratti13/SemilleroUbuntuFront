import { SectionHero } from '../components/SectionHero';
import { Typography, Box, TextField, Button } from '@mui/material';
import { useEffect, useState , useRef} from 'react';
import styled from '@mui/material/styles/styled';
import { useParams } from 'react-router-dom';
import { AlertModal } from '../components/AlertModal';
import { enviarFormulario } from '../utils/services/axiosConfig';
import { FormContact } from './Form/FormContact';

const heroForm = {
  category: 'CONTACTO',
  title:
    'Contactanos para obtener información detallada sobre cómo podés invertir en un futuro más sostenible',
  img: '/backgroundForm.webp',
};

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

  const [chars, setChars] = useState(0);

  const { id } = useParams();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleSubmit = () => {

  }

  // useEffect(() => {
  //   const enviarFormularioYManejarAlerta = async () => {
  //     let formulario = {
  //       nombre: useNombre.current.value,
  //     };
  
  //     const enviado = await enviarFormulario(formulario);

  //     if(enviado.status === 200){
  //       // Si la petición fue exitosa, mostrar alerta de éxito
  //     } else if(enviado) {
  //       // Si la petición falló, mostrar alerta de error y MENSAJE
  //     } else {
  //       // Si la petición falló, mostrar alerta de error
  //     }
  //   };
  
  //   enviarFormularioYManejarAlerta();
  // }, [onSubmit]);

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
        category={heroForm.category}
        title={heroForm.title}
        img={heroForm.img}
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
      <FormContact />
        {/* Alerta Exito  */}
        {/* <AlertModal
          open={open}
          setOpen={setOpen}
          success={true}
          title="Formulario enviado con éxito"
          info="Gracias por contactarnos, nos comunicaremos en breve"
        /> 
         Alerta Error 
        <AlertModal
          open={open}
          setOpen={setOpen}
          success={false}
          title="Error al enviar el formulario"
          info="Por favor, volvé a intentarlo."
        /> */}
    </Box>
  );
};
