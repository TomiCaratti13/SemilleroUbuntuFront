import { SectionHero } from '../components/SectionHero';
import { Typography, Box } from '@mui/material';
import { VectorGreen } from '../components/VectorGreen';
import { MapCategorias } from '../components/MapCategorias';
import { MapMicroemprendimientos } from '../components/MapMicroemprendmientos';
import Categorias from '../utils/mocks/Categorias';
import Microemprendmietos from '../utils/mocks/Microemprendimientos';
import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

export const SectionMicroemprendmientos = () => {
  const sectionPublicaiones = {
    category: 'MICROEMPRENDIMIENTOS',
    title: 'Invertí sostenible',
    description:
      'Explorá las categorías y encontrá la inversión sostenible que mejor se ajuste a tus metas financieras',
    img: '/backgroundMicroemprendimiento.webp',
  };

  const [categoryToMap, setCategoryToMap] = useState('');

  const { categoryUrl } = useParams();
  const location = useLocation();

  //Se busca en la lista de categorías la que coincida con el identificador de la url y se setea la categoria en el estado categoryToMap
  useEffect(() => {
    if (categoryUrl !== 'categorias') {
      const category = Categorias.filter(
        categoria => categoria.identifier === categoryUrl
      )[0];
      setCategoryToMap({ ...category });
    }
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
        <Typography
          onClick={() => setCategoryToMap('')}
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
        <VectorGreen text={categoryToMap === '' ? false : true} />
        {location.pathname === '/microemprendimientos/categorias' ||
        categoryToMap === '' ? (
          <>
            <MapCategorias categorias={Categorias} />
          </>
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
              {categoryToMap.title}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontSize: '16px',
                lineHeight: '25px',
                fontWeight: 400,
                textAlign: 'center',
                width: '100%',
                padding: '0 16px',
              }}>
              {categoryToMap.description}
            </Typography>
            <MapMicroemprendimientos
              microemprendimientos={Microemprendmietos.filter(
                microemprendimiento =>
                  microemprendimiento.category === categoryToMap.title
              )}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};
