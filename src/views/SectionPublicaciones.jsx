import publicaciones from '../utils/mocks/Publicaciones.json';
import { Publicaciones } from './Publicaciones';
import { SectionHero } from '../components/SectionHero';

export const SectionPublicaciones = () => {
  const sectionPublicaiones = {
    category: 'PUBLICACIONES',
    title: 'Explorando finanzas de impacto',
    description:
      'Conocé cómo decisiones financieras pueden impactar positivamente en la sociedad y el medio ambiente',
    img: '/webp/backgroundPublicacion.webp',
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
