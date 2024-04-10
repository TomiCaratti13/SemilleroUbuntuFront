import { addMicro } from '../redux/microSlice';
import { store } from '../redux/store';
import { getMicroemprendimientos } from './axiosConfig';

export const serviceMicro = async () => {
  const microStorage = store.getState().microemprendimiento.microLista;

  const generarIdentifier = (rubro) => {
    const normalizado = rubro.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const primera = normalizado.split(' ')[0];
    const sinBarra = primera.split('/')[0];
    const minuscula = sinBarra.toLowerCase();
    const sinÑ = minuscula.replace(/ñ/g, 'n');
    return sinÑ;
  };
  if (microStorage.length === 0) {

    const microAPI = await getMicroemprendimientos();
    const microRedux = microAPI?.map(microemprendimiento => {
      const identifier = generarIdentifier(microemprendimiento.rubro);
      return {
        id: microemprendimiento.id,
        title: microemprendimiento.nombre,
        description: microemprendimiento.descripcion,
        moreinfo: microemprendimiento.masInformacion,
        category: microemprendimiento.rubro,
        identifier: identifier,
        subcategory: microemprendimiento.subRubro,
        ubication: `${microemprendimiento.ciudad}, ${microemprendimiento.provincia}, ${microemprendimiento.pais}`,
        // img0: microemprendimiento.img0,
        // img1: microemprendimiento.img1,
        // img2: microemprendimiento.img2,
      };
    });

    //Guardar publicaciones en el estado de redux
    microRedux.forEach(micro => {
      store.dispatch(addMicro(micro));
    });

    return microRedux;
  } else {
    return microStorage;
  }
};
