import { SectionHero } from '../components/SectionHero';
import { Container, Typography, Box } from '@mui/material';
import microemprendimientos from '../utils/mocks/Microemprendimientos.json';
import { MapMicroemprendimientos } from '../components/MapMicroemprendmientos';
import { VectorGreen } from '../components/VectorGreen';

export const SectionMicroemprendmientos = () => {
  const sectionPublicaiones = {
    category: 'MICROEMPRENDIMIENTOS',
    title: 'Invertí sostenible',
    description: 'Explorá las categorías y encontrá la inversión sostenible que mejor se ajuste a tus metas financieras',
    img: '/webp/backgroundMicroemprendimiento.webp',
  };

  return (
    <Box
      sx={{
        display: 'flex',
        overflow: 'hidden',
        flexDirection: 'column',
        gap: '30px',
        width: '100%',
        height: '100%',
        paddingBottom: '30px',
      }}>
      <SectionHero
        category={sectionPublicaiones.category}
        title={sectionPublicaiones.title}
        description={sectionPublicaiones.description}
        img={sectionPublicaiones.img}
      />
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          gap: '24px',
          display: 'flex',
          flexWrap: 'wrap',
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
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '10px',
            width: '100%',
          }}>
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
            Conectate con Microemprendimientos que respetan la tierra y
            priorizan la salud, a través de prácticas agrícolas limpias y
            alimentos nutritivos.
          </Typography>
          <VectorGreen text={true} />
          <MapMicroemprendimientos
            microemprendimientos={microemprendimientos}
          />
        </Container>
      </Box>
    </Box>
  );
};
