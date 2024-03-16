import CardMicroemprendimiento from './CardMicroemprendimiento';
import { Container } from '@mui/material';

// eslint-disable-next-line react/prop-types
export const MapMicroemprendimientos = ({ microemprendimientos }) => (
  <Container
    component="section"
    sx={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '16px',
      padding: '0',
      width: '100%',
    }}>
    {microemprendimientos.map((microemprendimiento, index) => (
      <CardMicroemprendimiento
        key={index}
        microemprendimiento={microemprendimiento}
      />
    ))}
  </Container>
);
