import CardMicroemprendimiento from './CardMicroemprendimiento';
import { Container } from '@mui/material';

// eslint-disable-next-line react/prop-types
export const MapMicroemprendimientos = ({ microemprendimientos }) => {
  const microemprendimientosMutable = [...microemprendimientos];

  const shuffledMicroemprendimientos = microemprendimientosMutable.sort(() => Math.random() - 0.5);

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
      {shuffledMicroemprendimientos?.map((microemprendimiento, index) => (
        <CardMicroemprendimiento
          key={index}
          microemprendimiento={microemprendimiento}
        />
      ))}
    </Container>
  );
};
