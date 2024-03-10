import { SectionHero } from '../components/SectionHero';
import { Typography, Box } from '@mui/material';
import { VectorGreen } from '../components/VectorGreen';
import { MapCategorias } from '../components/MapCategorias';
import { MapMicroemprendimientos } from '../components/MapMicroemprendmientos';
import Categorias from '../utils/mocks/Categorias';
import Microemprendmietos from '../utils/mocks/Microemprendimientos';
import { useState } from 'react';

export const SectionMicroemprendmientos = () => {
  const sectionPublicaiones = {
    category: 'MICROEMPRENDIMIENTOS',
    title: 'Invertí sostenible',
    description:
      'Explorá las categorías y encontrá la inversión sostenible que mejor se ajuste a tus metas financieras',
    img: '/backgroundMicroemprendimiento.webp',
  };
  //Existe un pequeño drill prop en el componente MapCategoriasy CardCategoria que se encarga de cambiar el estado de toMap
  const [toMap, setToMap] = useState('');

  console.log(toMap);
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
        {
          /*Cuando toMap cambie el componente debe cambiar */
          toMap === '' ? (
            <>
              <VectorGreen/>
              <MapCategorias
                categorias={Categorias}
                setToMap={setToMap}
              />
            </>
          ):(
            <>
              <VectorGreen text={true}/>
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
                {toMap}
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontSize: '16px',
                  lineHeight: '25px',
                  fontWeight: 400,
                  textAlign: 'center',
                  width: '100%',
                  padding: "0 16px"
                }}>
                {Categorias.filter((categoria) => categoria.title === toMap)[0].description}
              </Typography>
            </>
          ) 
        }
      </Box>
    </Box>
  );
};
