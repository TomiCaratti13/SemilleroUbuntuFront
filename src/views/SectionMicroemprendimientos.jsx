import { SectionHero } from '../components/SectionHero';
import { Typography, Box } from '@mui/material';
import { VectorGreen } from '../components/VectorGreen';
import { MapCategorias } from '../components/MapCategorias';
import Categorias from '../utils/mocks/Categorias';

export const SectionMicroemprendmientos = () => {
  const sectionPublicaiones = {
    category: 'MICROEMPRENDIMIENTOS',
    title: 'Invertí sostenible',
    description:
      'Explorá las categorías y encontrá la inversión sostenible que mejor se ajuste a tus metas financieras',
    img: '/backgroundMicroemprendimiento.webp',
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
      }}>
      <SectionHero
        category={sectionPublicaiones.category}
        title={sectionPublicaiones.title}
        description={sectionPublicaiones.description}
        img={sectionPublicaiones.img}
      />
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          gap: '24px',
          display: 'flex',
          flexWrap: 'wrap',
        }}>
        <VectorGreen />
        <Typography
          variant="h4"
          sx={{
            fontSize: '24px',
            lineHeight: '25px',
            fontWeight: 600,
            textAlign: 'center',
            width: '100%',
          }}>
          Categorías
        </Typography>
        <MapCategorias categorias={Categorias} />
      </Box>
      {/* Necesito que categories sea un estado y al clieckear en un categoria cambie el componente por un mapeo de microemprendimientos que coinciden con nuestro nombre */}
    </Box>
  );
};
