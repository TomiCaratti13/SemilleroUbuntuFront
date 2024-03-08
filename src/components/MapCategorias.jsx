import CardCategoria from './CardCategoria';
import { Container, Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export const MapCategorias = ({ categorias }) => (
  <Container
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      gap: '4px',
    }}>
    <Typography
      variant="h3"
      sx={{
        fontSize: '16px',
        lineHeight: '25px',
        fontWeight: 600,
      }}>
      Microemprendimientos Ubuntu
    </Typography>
    <Typography
      variant="h4"
      sx={{
        fontSize: '22px',
        lineHeight: '25px',
        fontWeight: 600,
        mb: '12px',
      }}>
      Categorias
    </Typography>
    <Box>
      {categorias.map((categorias, index) => (
        <CardCategoria
          key={index}
          title={categorias.title}
          img={categorias.img}
        />
      ))}
    </Box>
    <Link to="/microemprendimientos">
      <Button
        sx={{
          width: '200px',
          height: '40px',
          my: '10px',
          justifyContent: 'space-evenly',
          borderRadius: '100px',
          textTransform: 'none',
          color: 'blanco.main',
          backgroundColor: 'azul.main',
          '&:hover': {
            backgroundColor: 'azul.main',
          },
        }}>
        <Typography
          sx={{
            fontWeight: '700',
            fontSize: '16px',
            lineHeight: '30px',
            textAlign: 'center',
          }}>
          Ver más Categorias
        </Typography>
      </Button>
    </Link>
  </Container>
);
