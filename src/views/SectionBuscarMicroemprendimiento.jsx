import { Typography, Box, Container } from '@mui/material';
import { SearchBar } from '../components/SearchBar';
import { MapMicroemprendimientos } from '../components/MapMicroemprendmientos';
import MicroemprendmientosAPI from '../utils/mocks/Microemprendimientos.json';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const SectionBuscarMicroemprendimiento = () => {
  const [filteredMicroemprendimientos, setFilteredMicroemprendimientos] =
    useState([]);
  const { search } = useParams();

  useEffect(() => {

    //Filtramos los microemprendmientos por el parametro de busqueda
    const filtrados = MicroemprendmientosAPI.filter(
      mic =>
        mic.title.toLowerCase().includes(search?.toLowerCase()) ||
        mic.description?.toLowerCase().includes(search?.toLowerCase()) ||
        mic.category?.toLowerCase().includes(search?.toLowerCase()) ||
        mic.subcategory?.toLowerCase().includes(search?.toLowerCase())
    );

    //Ordenamos los microemprendimientos por coincidencia en el titulo y categoria
    const ordenados = filtrados.sort((a, b) => {
      const aTitle = a.title.toLowerCase().includes(search?.toLowerCase())
        ? 1
        : 0;
      const bTitle = b.title.toLowerCase().includes(search?.toLowerCase())
        ? 1
        : 0;
      const aCategory = a.category
        ?.toLowerCase()
        .includes(search?.toLowerCase())
        ? 1
        : 0;
      const bCategory = b.category
        ?.toLowerCase()
        .includes(search?.toLowerCase())
        ? 1
        : 0;
      //   const aSubcategory = a.subcategory?.toLowerCase().includes(search?.toLowerCase()) ? 1 : 0;
      //   const bSubcategory = b.subcategory?.toLowerCase().includes(search?.toLowerCase()) ? 1 : 0;

      return bTitle - aTitle || bCategory - aCategory;
      //    || bSubcategory - aSubcategory;
    });

    setFilteredMicroemprendimientos(ordenados);
  }, [search]);

  return (
    <Box
      sx={{
        display: 'flex',
        overflow: 'hidden',
        flexDirection: 'column',
        gap: '20px',
        width: '100%',
        height: '100%',
        paddingBottom: '30px',
      }}>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '24px 16px 0 16px',
          gap: '35px',
        }}>
        <SearchBar color={'gris.claro'} />
      </Container>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          padding: '0 16px',
        }}>
        <Typography
          variant="h4"
          sx={{
            fontSize: '24px',
            lineHeight: '30px',
            fontWeight: 700,
            textAlign: 'center',
            width: '100%',
          }}>
          Resultados de tu búsqueda
        </Typography>
        <MapMicroemprendimientos
          microemprendimientos={filteredMicroemprendimientos}
        />
      </Box>
    </Box>
  );
};
