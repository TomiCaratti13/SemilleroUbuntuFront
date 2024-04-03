import CardPublicaciones from './CardPublicacion';
import { Container } from '@mui/material';

export const MapPublicaciones = ({ publicaciones, cantidad }) => {
  const publicacionesMutable = [...publicaciones];

  return (
    <Container
      component="section"
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        placeItems: 'center',
        gap: '16px',
        width: '100%',
      }}>
      {publicacionesMutable
        //Convertimos Date a fechas para poder ordenarlas
        ?.sort((a, b) => {
          const dateA = new Date(a.date.split('/').reverse().join('-'));
          const dateB = new Date(b.date.split('/').reverse().join('-'));
          return dateB - dateA;
        })
        ?.slice(0, cantidad)
        ?.map((publicacion, index) => (
          <CardPublicaciones
            key={index}
            publicacion={publicacion}
          />
        ))}
    </Container>
  );
};
