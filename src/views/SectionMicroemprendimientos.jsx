import { SectionHero } from '../components/SectionHero';
import { Typography, Box } from '@mui/material';
import { VectorGreen } from '../components/VectorGreen';
import { MapCategorias } from '../components/MapCategorias';
import { MapMicroemprendimientos } from '../components/MapMicroemprendmientos';
import categoriasAPI from '../utils/mocks/Categorias';
import microemprendmietosAPI from '../utils/mocks/Microemprendimientos';
import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getCategorias } from '../utils/services/axiosConfig';
import { getPublicaciones } from '../utils/services/axiosConfig';
import { addCategory } from '../utils/redux/categorySlice';
import { useDispatch, useSelector } from 'react-redux';


//Si usamos redux esto ya estaria en el store
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
const Microemprendimientos = microemprendmietosAPI.map(microemprendimiento => {
  return {
    title: microemprendimiento.title,
    category: microemprendimiento.category,
    subcategory: microemprendimiento.subcategory,
    ubication: microemprendimiento.ubication,
    img0: microemprendimiento.img0,
    img1: microemprendimiento.img1,
    img2: microemprendimiento.img2,
    description: microemprendimiento.description,
    moreinfo: microemprendimiento.moreinfo,
  }
});

const heroPublicaciones = {
  category: 'MICROEMPRENDIMIENTOS',
  title: 'Invertí sostenible',
  description:
    'Explorá las categorías y encontrá la inversión sostenible que mejor se ajuste a tus metas financieras',
  img: '/backgroundMicroemprendimiento.webp',
};

export const SectionMicroemprendmientos = () => {
  const [categoryURL, setCategoryURL] = useState('');
  const Categorias = useSelector(state => state.category.lista);

  const { categoryUrl } = useParams();
  const location = useLocation();

  const dispatch = useDispatch();
  useEffect(() => {
    //async
    const categoriasAPI = getCategorias();
    const categoriasRedux = categoriasAPI?.map(categoria => {
      return {
        title: categoria.title,
        identifier: categoria.identifier,
        cantidad: categoria.cantidad,
        img: categoria.img,
        description: categoria.description,
      };
    })
    dispatch(addCategory(categoriasRedux));
    getPublicaciones();
  },[])

  //Se busca en la lista de categorías la que coincida con el identificador de la url y se setea la categoria en el estado categoryURL
  useEffect(() => {
    setCategoryURL('');
    if (categoryUrl !== 'categorias') {
      const category = Categorias.filter(
        categoria => categoria.identifier === categoryUrl
      )[0];
      setCategoryURL({ ...category });
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
        category={heroPublicaciones.category}
        title={heroPublicaciones.title}
        description={heroPublicaciones.description}
        img={heroPublicaciones.img}
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
            setCategoryURL('');
            window.location.href = '/microemprendimientos/categorias';
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
        <VectorGreen text={categoryURL === '' ? false : true} />
        {location.pathname === '/microemprendimientos/categorias' ||
        categoryURL === '' ? (
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
              {categoryURL.title}
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
              {categoryURL.description}
            </Typography>
            <MapMicroemprendimientos
              microemprendimientos={Microemprendimientos.filter(
                microemprendimiento =>
                  microemprendimiento.category === categoryURL.title
              )}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};
