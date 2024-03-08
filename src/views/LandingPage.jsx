import publicaciones from '../utils/mocks/Publicaciones.json';
import categorias from '../utils/mocks/Categorias.json';
import { useSnackbar } from 'notistack';
import { SectionHero } from '../components/SectionHero';
import { Box, Container, Typography } from '@mui/material';
import Objetivos from '../components/Objetivos';
import { MapPublicaciones } from '../components/MapPublicaciones';
import { MapCategorias } from '../components/MapCategorias';


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
      <MapCategorias categorias={categorias} />
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '4px',
        }}>
        <Typography
          variant="h4"
          sx={{ fontSize: '16px', lineHeight: '25px', fontWeight: 600 }}>
          Publicaciones
        </Typography>
        <Typography
          variant="h3"
          sx={{ fontSize: '22px', lineHeight: '25px', fontWeight: 600 }}>
          Finanzas con impacto
        </Typography>
      </Container>
      <MapPublicaciones publicaciones={publicaciones} />
    </Box>
  );
};
