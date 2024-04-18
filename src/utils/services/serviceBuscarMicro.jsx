import { buscarMicroemprendimientos } from './axiosConfig';

export const serviceBuscarMicro = async search => {
  const buscarMic = await buscarMicroemprendimientos(search);
  const setMic = buscarMic
    ?.map(microemprendimiento => {
      return {
        id: microemprendimiento.id,
        title: microemprendimiento.nombre,
        description: microemprendimiento.descripcion,
        moreinfo: microemprendimiento.masInformacion,
        category: microemprendimiento.rubro,
        subcategory: microemprendimiento.subRubro,
        ubication: `${microemprendimiento.ciudad}, ${microemprendimiento.provincia}, ${microemprendimiento.pais}`,
        imagenes: microemprendimiento.imagenes,
        pais: microemprendimiento.pais,
        provincia: microemprendimiento.provincia,
        ciudad: microemprendimiento.ciudad,
        paisId: microemprendimiento.paisId,
        provinciaId: microemprendimiento.provinciaId,
        rubroId: microemprendimiento.rubroId,
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
