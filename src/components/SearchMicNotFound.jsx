import { Container, Typography } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';

export const SearchMicNotFound = () => {
  return (
    <Container
      component="section"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '24px 0px',
        width: '100%',
        bgcolor: 'gris.claro',
        borderRadius: '10px',
        height: '100%',
        mt: '60px',
      }}>
      <SearchOffIcon
        sx={{
          fontSize: '48px',
          color: 'azul.main',
          width: '100%',
        }}
      />
      <Typography
        sx={{
          fontSize: '18px',
          lineHeight: '25px',
          fontWeight: 600,
          textAlign: 'center',
          width: '100%',
          color: 'azul.main',
        }}>
        No se encontraron resultados para tu búsqueda
      </Typography>
      <Typography
        sx={{
          fontSize: '16px',
          lineHeight: '20px',
          fontWeight: 500,
          textAlign: 'center',
          width: '100%',
        }}>
        Intentá nuevamente con otra consulta
      </Typography>
    </Container>
  );
};
