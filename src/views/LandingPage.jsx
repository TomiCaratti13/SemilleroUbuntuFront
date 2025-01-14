import Objetivos from '../components/Objetivos';
import { useSnackbar } from 'notistack';
import { SectionHero } from '../components/SectionHero';
import { Box, Container, Typography } from '@mui/material';
import { MapPublicaciones } from '../components/MapPublicaciones';
import { MapCategorias } from '../components/MapCategorias';
import { ButtonBlue } from '../components/ButtonBlue';
import { usePublicaciones } from '../utils/hooks/usePublicaciones';
import { useCategorias } from '../utils/hooks/useCategorias';

const heroLanding = {
  category: 'FINANCIAMIENTO SOSTENIBLE',
  title:
    'Impulsamos el desarrollo de finanzas de impacto, liderando la transición hacia un modelo financiero sostenible',
  img: '/backgroundLandingPage.webp',
};

function deleteAllCookies() {
  var cookies = document.cookie.split(';');
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf('=');
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
}

export const LandingPage = () => {
  //Limpiar usuario y token
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   deleteAllCookies();
  //   dispatch(clearToken());
  //   dispatch(addUser({ nombre: '', foto: '', isAdmin: false }));
  //   localStorage.clear();
  //   // window.location.href = `http://localhost:8080/logout`;
  // }, []);

  const publicaciones = usePublicaciones().sort(() => Math.random() - 0.5);
  const Categorias = useCategorias();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        paddingBottom: '30px',
      }}>
      <SectionHero
        category={heroLanding.category}
        title={heroLanding.title}
        img={heroLanding.img}
      />
      <Objetivos />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Typography
          variant="h3"
          sx={{
            fontSize: '16px',
            lineHeight: '25px',
            fontWeight: 600,
          }}>
          Microemprendimientos Ubuntu
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontSize: '22px',
            lineHeight: '25px',
            fontWeight: 600,
            mb: '12px',
          }}>
          Categorías
        </Typography>
        <MapCategorias categorias={Categorias} />
        <ButtonBlue
          text="Ver más Categorías"
          link="/microemprendimientos/categorias"
        />
      </Box>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '4px',
        }}>
        <Typography
          variant="h4"
          sx={{ fontSize: '16px', lineHeight: '25px', fontWeight: 600 }}>
          Publicaciones
        </Typography>
        <Typography
          variant="h3"
          sx={{ fontSize: '22px', lineHeight: '25px', fontWeight: 600 }}>
          Finanzas con impacto
        </Typography>
      </Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '16px',
          padding: '0 16px',
          width: '100%',
        }}>
        <MapPublicaciones
          publicaciones={publicaciones}
          cantidad={3}
        />
        <ButtonBlue
          text="Ver más Publicaciones"
          link="/publicaciones"
        />
      </Box>
    </Box>
  );
};
