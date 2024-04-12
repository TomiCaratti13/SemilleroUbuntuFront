import { SectionHero } from '../components/SectionHero';
import { Typography, Box } from '@mui/material';
import { VectorGreen } from '../components/VectorGreen';
import { MapCategorias } from '../components/MapCategorias';
import { MapMicroemprendimientos } from '../components/MapMicroemprendmientos';
import { useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useCategorias } from '../utils/hooks/useCategorias';
import { useMicro } from '../utils/hooks/useMicro';

const heroMicroemprendimiento = {
  category: 'MICROEMPRENDIMIENTOS',
  title: 'Invertí sostenible',
  description:
    'Explorá las categorías y encontrá la inversión sostenible que mejor se ajuste a tus metas financieras',
  img: '/backgroundMicroemprendimiento.webp',
};

export const SectionMicroemprendmientos = () => {

  const categorias = useCategorias();
  const microemprendimientos = useMicro();
  const { categoryUrl } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const getTitle = () => {
    if (categoryUrl !== 'categorias') {
      const category = categorias.find(
        categoria => categoria.identifier === categoryUrl
      );
      return category ? category.title : '';
    }
    return '';
  }
  
  const title = getTitle(categoryUrl);

  useEffect(() => {
  }, [categoryUrl, location.pathname]);

  return (
    <Box
      sx={{
        display: 'flex',
        overflow: 'hidden',
        flexDirection: 'column',
        gap: '30px',
        width: '100%',
        minHeight: '100vh',
        paddingBottom: '30px',
      }}>
      <SectionHero
        category={heroMicroemprendimiento.category}
        title={heroMicroemprendimiento.title}
        description={heroMicroemprendimiento.description}
        img={heroMicroemprendimiento.img}
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
        <Typography
          onClick={() => {
            navigate('/microemprendimientos/categorias');
          }}
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
        <VectorGreen text={location.pathname === '/microemprendimientos/categorias' ? false : true} />
        {location.pathname === '/microemprendimientos/categorias' ? (
          <MapCategorias categorias={categorias} />
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              width: '100%',
              padding: '0 16px',
            }}>
            <Typography
              variant="h4"
              sx={{
                fontSize: '20px',
                lineHeight: '30px',
                fontWeight: 500,
                textAlign: 'center',
                width: '100%',
                color: 'azul.main',
                textWrap: 'balance',
              }}>
              {title}
            </Typography>
            <MapMicroemprendimientos
              microemprendimientos={microemprendimientos.filter(
                microemprendimiento => microemprendimiento.identifier === categoryUrl
              )}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};
