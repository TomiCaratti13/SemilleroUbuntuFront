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
      width: '100%',
    }}>
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
