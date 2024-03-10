import CardMicroemprendimiento from './CardMicroemprendimiento';
import { Container } from '@mui/material';

// eslint-disable-next-line react/prop-types
export const MapMicroemprendimientos = ({ microemprendimientos }) => (
  <Container
    component="section"
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '16px',
      padding: '0',
      margin: '0',
    }}>
    <Typography
      variant="h4"
      sx={{
        fontSize: '24px',
        lineHeight: '25px',
        fontWeight: 600,
        textAlign: 'center',
        width: '100%',
      }}>
      Categorías
    </Typography>
    <Typography
      variant="h3"
      sx={{
        fontSize: '20px',
        lineHeight: '30px',
        fontWeight: 500,
        color: 'azul.main',
        textAlign: 'center',
        textWrap: 'pretty',
      }}>
      Agroecología/Orgánicos/ Alimentación saludable
    </Typography>
    <Typography
      variant="h4"
      sx={{
        fontSize: '16px',
        lineHeight: '25px',
        fontWeight: 400,
        textAlign: 'center',
      }}>
      Conectate con Microemprendimientos que respetan la tierra y priorizan la
      salud, a través de prácticas agrícolas limpias y alimentos nutritivos.
    </Typography>
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '10px',
        width: '100%',
      }}>
      <VectorGreen text={true} />
    </Container>
    {microemprendimientos.map((microemprendimiento, index) => (
      <CardMicroemprendimiento
        key={index}
        title={microemprendimiento.title}
        category={microemprendimiento.category}
        subcategory={microemprendimiento.subcategory}
        ubication={microemprendimiento.ubication}
        img0={microemprendimiento.img0}
        img1={microemprendimiento.img1}
        img2={microemprendimiento.img2}
        description={microemprendimiento.description}
        moreinfo={microemprendimiento.moreinfo}
      />
    ))}
  </Container>
);
