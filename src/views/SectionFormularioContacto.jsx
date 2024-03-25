import { SectionHero } from '../components/SectionHero';
import { Typography, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { FormContact } from './Form/FormContact';

const heroForm = {
  category: 'CONTACTO',
  title:
    'Contactanos para obtener información detallada sobre cómo podés invertir en un futuro más sostenible',
  img: '/backgroundForm.webp',
};

export const SectionFormularioContacto = () => {
  const { nombre, id } = useParams();

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
          {nombre}
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
      <FormContact idMic={id} />
    </Box>
  );
};
