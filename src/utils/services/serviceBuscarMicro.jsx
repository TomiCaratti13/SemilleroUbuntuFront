import { buscarMicroemprendimientos } from './axiosConfig';

export const serviceBuscarMicro = async search => {
  const buscarMic = await buscarMicroemprendimientos(search);
  const setMic = buscarMic
    ?.map(microemprendimiento => {
      return {
        title: microemprendimiento.nombre,
        category: microemprendimiento.rubro,
        subcategory: microemprendimiento.subRubro,
        ubication: `${microemprendimiento.ciudad}, ${microemprendimiento.provincia}, ${microemprendimiento.pais}`,
        img0: microemprendimiento.img0,
        img1: microemprendimiento.img1,
        img2: microemprendimiento.img2,
        description: microemprendimiento.descripcion,
        moreinfo: microemprendimiento.masInformacion,
        id: microemprendimiento.id,
      };
    })
    .sort((a, b) => {
      const aTitle = a.title.toLowerCase().includes(search?.toLowerCase())
        ? 1
        : 0;
      const bTitle = b.title.toLowerCase().includes(search?.toLowerCase())
        ? 1
        : 0;
      const aCategory = a.category
        ?.toLowerCase()
        .includes(search?.toLowerCase())
        ? 1
        : 0;
      const bCategory = b.category
        ?.toLowerCase()
        .includes(search?.toLowerCase())
        ? 1
        : 0;

      return bTitle - aTitle || bCategory - aCategory;
    });

  return setMic;
};
