import publicaciones from '../utils/mocks/Publicaciones.json';
import { MapPublicaciones } from '../components/MapPublicaciones';
import { SectionHero } from '../components/SectionHero';
import { Box } from '@mui/material';
import { VectorGreen } from '../components/VectorGreen';

export const SectionPublicaciones = () => {
  const sectionPublicaiones = {
    category: 'PUBLICACIONES',
    title: 'Explorando finanzas de impacto',
    description: 'Conocé cómo decisiones financieras pueden impactar positivamente en la sociedad y el medio ambiente',
    img: '/webp/backgroundPublicacion.webp',
  };

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
        category={sectionPublicaiones.category}
        title={sectionPublicaiones.title}
        description={sectionPublicaiones.description}
        img={sectionPublicaiones.img}
      />
      <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
        <VectorGreen />
        <MapPublicaciones publicaciones={publicaciones} />
      </Box>
    </Box>
  );
};
