import publicacionesAPI from '../utils/mocks/Publicaciones.json';
import { MapPublicaciones } from '../components/MapPublicaciones';
import { SectionHero } from '../components/SectionHero';
import { Box } from '@mui/material';
import { VectorGreen } from '../components/VectorGreen';

const publicaciones = publicacionesAPI.map(publicacion => {
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

const heroPublicaciones = {
  category: 'PUBLICACIONES',
  title: 'Explorando finanzas de impacto',
  description:
    'Conocé cómo decisiones financieras pueden impactar positivamente en la sociedad y el medio ambiente',
  img: '/backgroundPublicacion.webp',
};

export const SectionPublicaciones = () => {
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
        category={heroPublicaciones.category}
        title={heroPublicaciones.title}
        description={heroPublicaciones.description}
        img={heroPublicaciones.img}
      />
      <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
        <VectorGreen />
        <MapPublicaciones publicaciones={publicaciones} />
      </Box>
    </Box>
  );
};
