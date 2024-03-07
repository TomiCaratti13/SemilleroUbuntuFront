import CardPublicacion from '../components/CardPublicacion';
import { Container } from '@mui/material';

// eslint-disable-next-line react/prop-types
export const MapPublicaciones = ({ publicaciones }) => (
  <Container
    component="section"
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '16px',
    }}>
    {publicaciones
      //Convertimos Date a fechas para poder ordenarlas
      // eslint-disable-next-line react/prop-types
      .sort((a, b) => {
        const dateA = new Date(a.date.split('/').reverse().join('-'));
        const dateB = new Date(b.date.split('/').reverse().join('-'));
        return dateB - dateA;
      })
      .map((publicacion, index) => (
        <CardPublicacion
          key={index}
          title={publicacion.title}
          date={publicacion.date}
          img0={publicacion.img0}
          img1={publicacion.img1}
          img2={publicacion.img2}
          description={publicacion.description}
        />
      ))}
  </Container>
);
