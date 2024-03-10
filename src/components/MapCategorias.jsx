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
      {categorias.map((categorias, index) => (
        <CardCategoria
          key={index}
          title={categorias.title}
          identifier={categorias.identifier}
          img={categorias.img}
        />
      ))}
    </Box>
  </Container>
);
