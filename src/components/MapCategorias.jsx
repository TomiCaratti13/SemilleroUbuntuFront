
import CardCategoria from './CardCategoria';
import { Container, Box } from '@mui/material';

export const MapCategorias = ({ categorias }) => (
  <Container
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      gap: '4px',
    }}>
    <Box>
      {categorias?.map((categoria, index) => (
        <CardCategoria
          key={index}
          title={categoria.title}
          identifier={categoria.identifier}
          img={categoria.img}
        />
      ))}
    </Box>
  </Container>
);
