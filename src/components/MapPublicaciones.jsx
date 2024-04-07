import { useState } from 'react';
import CardPublicaciones from './CardPublicacion';
import { Container } from '@mui/material';

export const MapPublicaciones = ({
  publicaciones,
  cantidad,
  setEditar,
  isAdmin,
}) => {
  const publicacionesMutable = [...publicaciones];
  const [activePopperId, setActivePopperId] = useState(null);

  const handlePopper = id => {
    setActivePopperId(activePopperId === id ? null : id);
  };
  return (
    <Container
      component="section"
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        placeItems: 'center',
        gap: '16px',
        width: '100%',
        padding: '0',
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
            setEditar={setEditar}
            handlePopper={handlePopper}
            isActive={activePopperId === publicacion.id}
            isAdmin={isAdmin}
          />
        ))}
    </Container>
  );
};
