import { SectionHero } from '../components/SectionHero';
import { Box } from '@mui/material';
import microemprendimientos from '../utils/mocks/Microemprendimientos.json';
import { MapMicroemprendimientos } from '../components/MapMicroemprendmientos';
import { VectorGreen } from '../components/VectorGreen';

export const SectionMicroemprendmientos = () => {
  const sectionPublicaiones = {
    category: 'MICROEMPRENDIMIENTOS',
    title: 'Invertí sostenible',
    description:
      'Explorá las categorías y encontrá la inversión sostenible que mejor se ajuste a tus metas financieras',
    img: '/webp/backgroundMicroemprendimiento.webp',
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
        <MapMicroemprendimientos microemprendimientos={microemprendimientos} />
      </Box>
    </Box>
  );
};
