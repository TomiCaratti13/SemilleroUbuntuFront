import { Typography, Box, Container } from '@mui/material';
import { SearchBar } from '../components/SearchBar';
import { MapMicroemprendimientos } from '../components/MapMicroemprendmientos';
import { useParams } from 'react-router-dom';
import { useBuscarMic } from '../utils/hooks/useBuscarMic';

export const SectionBuscarMicroemprendimiento = () => {
  const { search } = useParams();

  //Llamar buscarMicroemprendimientos
  const micEncontrados = useBuscarMic(search);

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
        <MapMicroemprendimientos microemprendimientos={micEncontrados} />
      </Box>
    </Box>
  );
};
