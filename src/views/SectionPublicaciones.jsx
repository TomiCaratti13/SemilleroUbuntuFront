import { MapPublicaciones } from '../components/MapPublicaciones';
import { SectionHero } from '../components/SectionHero';
import { Box } from '@mui/material';
import { VectorGreen } from '../components/VectorGreen';
import { usePublicaciones } from '../utils/hooks/usePublicaciones';

const heroPublicaciones = {
  category: 'PUBLICACIONES',
  title: 'Explorando finanzas de impacto',
  description:
    'Conocé cómo decisiones financieras pueden impactar positivamente en la sociedad y el medio ambiente',
  img: '/backgroundPublicacion.webp',
};

export const SectionPublicaciones = () => {
  //Llamar a publicaciones
  const publicaciones = usePublicaciones();

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
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
            padding: '0 16px',
          }}>
          <MapPublicaciones publicaciones={publicaciones} />
        </Box>
      </Box>
    </Box>
  );
};
