import publicaciones from '../utils/mocks/Publicaciones.json';
import { MapPublicaciones } from './MapPublicaciones';
import { useSnackbar } from 'notistack';
import { SectionHero } from '../components/SectionHero';
import { Container, Typography, Box } from '@mui/material';
import Objetivos from '../components/Objetivos';
import CardCategoria from '../components/CardCategoria';


export const LandingPage = () => {

  const landingPage = {
    category: 'FINANCIAMIENTO SOSTENIBLE',
    title: 'Impulsamos el desarrollo de finanzas de impacto, liderando la transición hacia un modelo financiero sostenible',
    img: '/webp/backgroundLandingPage.webp',
  };

  const { enqueueSnackbar } = useSnackbar();
  const handleAlert = () => {
    enqueueSnackbar('Probando alertasssss', {
      variant: 'warning',
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        paddingBottom: '30px',
      }}>
      <SectionHero
        category={landingPage.category}
        title={landingPage.title}
        img={landingPage.img}
      />
      <Objetivos />
      <CardCategoria />
      <MapPublicaciones publicaciones={publicaciones} />
    </Box>
  );
};
