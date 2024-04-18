import CardMicroemprendimiento from './CardMicroemprendimiento';
import { Container } from '@mui/material';

// eslint-disable-next-line react/prop-types
export const MapMicroemprendimientos = ({ microemprendimientos }) => {
  const microemprendimientosMutable = [...microemprendimientos];

  return (
    <Container
      component="section"
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'top',
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
