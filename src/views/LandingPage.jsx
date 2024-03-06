import publicaciones from '../utils/mocks/Publicaciones.json';
import { Publicaciones } from './Publicaciones';
import { useSnackbar } from 'notistack';
import { SectionHero } from '../components/SectionHero';

export const LandingPage = () => {
  const landingPage = {
    category: 'FINANCIAMIENTO SOSTENIBLE',
    title:
      'Impulsamos el desarrollo de finanzas de impacto, liderando la transición hacia un modelo financiero sostenible',
    img: '/webp/backgroundLandingPage.webp',
  };

  const { enqueueSnackbar } = useSnackbar();
  const handleAlert = () => {
    enqueueSnackbar('Probando alertasssss', {
      variant: 'warning',
    });
  };

  return (
    <>
      <SectionHero
        category={landingPage.category}
        title={landingPage.title}
        img={landingPage.img}
      />
      <button onClick={handleAlert}>LANZAR ALERTA</button>
      <Publicaciones publicaciones={publicaciones} />
    </>
  );
};
