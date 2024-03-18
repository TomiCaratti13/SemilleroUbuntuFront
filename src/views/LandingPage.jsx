import publicacionesAPI from '../utils/mocks/Publicaciones.json';
import categoriasAPI from '../utils/mocks/Categorias.json';
import Objetivos from '../components/Objetivos';
import { useSnackbar } from 'notistack';
import { SectionHero } from '../components/SectionHero';
import { Box, Container, Typography } from '@mui/material';
import { MapPublicaciones } from '../components/MapPublicaciones';
import { MapCategorias } from '../components/MapCategorias';
import { ButtonBlue } from '../components/ButtonBlue';

//Preguntar si meter esto en redux para hacer menos llamadas a la api
const Categorias = categoriasAPI.map(categoria => {
  return {
    title: categoria.title,
    identifier: categoria.identifier,
    cantidad: categoria.cantidad,
    img: categoria.img,
    description: categoria.description,
  };
});

//Preguntar si meter esto en redux para hacer menos llamadas a la api
const Publicaciones = publicacionesAPI.map(publicacion => {
  return {
    title: publicacion.title,
    visualizaciones: publicacion.visualizaciones,
    date: publicacion.date,
    img0: publicacion.img0,
    img1: publicacion.img1,
    img2: publicacion.img2,
    description: publicacion.description,
  };
});

const heroLanding = {
  category: 'FINANCIAMIENTO SOSTENIBLE',
  title:
    'Impulsamos el desarrollo de finanzas de impacto, liderando la transición hacia un modelo financiero sostenible',
  img: '/backgroundLandingPage.webp',
};

export const LandingPage = () => {

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
        category={heroLanding.category}
        title={heroLanding.title}
        img={heroLanding.img}
      />
      <Objetivos />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Typography
          variant="h3"
          sx={{
            fontSize: '16px',
            lineHeight: '25px',
            fontWeight: 600,
          }}>
          Microemprendimientos Ubuntu
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontSize: '22px',
            lineHeight: '25px',
            fontWeight: 600,
            mb: '12px',
          }}>
          Categorias
        </Typography>
        <MapCategorias categorias={Categorias} />
        <ButtonBlue
          text="Ver más Categorias"
          link="/microemprendimientos/categorias"
        />
      </Box>
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
      <Box>
        <MapPublicaciones
          publicaciones={Publicaciones}
          cantidad={3}
        />
        <ButtonBlue
          text="Ver más Publicaciones"
          link="/publicaciones"
        />
      </Box>
    </Box>
  );
};
