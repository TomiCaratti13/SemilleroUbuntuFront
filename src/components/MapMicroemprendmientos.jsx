import CardMicroemprendimiento from './CardMicroemprendimiento';
import { Container } from '@mui/material';

// eslint-disable-next-line react/prop-types
export const MapMicroemprendimientos = ({ microemprendimientos }) => {
  const microemprendimientosMutable = [...microemprendimientos];

  return (
    <Container
      component="section"
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '16px',
        padding: '0',
        width: '100%',
      }}>
      {microemprendimientosMutable?.reverse().map((microemprendimiento, index) => (
        <CardMicroemprendimiento
          key={index}
          microemprendimiento={microemprendimiento}
        />
      ))}
    </Container>
  );
};
