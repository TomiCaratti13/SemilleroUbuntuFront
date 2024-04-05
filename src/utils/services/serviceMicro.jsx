import { addMicro } from '../redux/microSlice';
import { store } from '../redux/store';
import { getMicroemprendimientos } from './axiosConfig';

export const serviceMicro = async () => {
  const microStorage = store.getState().microemprendimiento.microLista;

  if (microStorage.length === 0) {

    const microAPI = await getMicroemprendimientos();
    const microRedux = microAPI?.map(microemprendimiento => {
      return {
        id: microemprendimiento.id,
        title: microemprendimiento.nombre,
        description: microemprendimiento.descripcion,
        moreinfo: microemprendimiento.masInformacion,
        category: microemprendimiento.rubro,
        subcategory: microemprendimiento.subRubro,
        ubication: + microemprendimiento.ciudad + microemprendimiento.provincia + microemprendimiento.pais,
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
