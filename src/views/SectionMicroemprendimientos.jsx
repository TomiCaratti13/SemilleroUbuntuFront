import publicaciones from '../utils/mocks/Publicaciones.json';
import { Publicaciones } from './Publicaciones';
import { SectionHero } from '../components/SectionHero';

export const SectionMicroemprendmientos = () => {
  const sectionPublicaiones = {
    category: 'MICROEMPRENDIMIENTOS',
    title: 'Invertí sostenible',
    description:
      'Explorá las categorías y encontrá la inversión sostenible que mejor se ajuste a tus metas financieras',
    img: '/webp/backgroundMicroemprendimiento.webp',
  };

  return (
    <>
      <SectionHero
        category={sectionPublicaiones.category}
        title={sectionPublicaiones.title}
        description={sectionPublicaiones.description}
        img={sectionPublicaiones.img}
      />
      <Publicaciones publicaciones={publicaciones} />
    </>
  );
};
