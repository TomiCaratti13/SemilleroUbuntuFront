import { addMicro } from '../redux/microSlice';
import { store } from '../redux/store';
import { getMicroemprendimientos } from './axiosConfig';

export const serviceMicro = async () => {
  const microStorage = store.getState().microemprendimiento.Microlista;

  if (microStorage.length === 0) {

    const microAPI = await getMicroemprendimientos();
    const microRedux = microAPI?.map(microemprendimiento => {
      return {
        title: microemprendimiento.title,
        category: microemprendimiento.category,
        subcategory: microemprendimiento.subcategory,
        ubication: microemprendimiento.ubication,
        img0: microemprendimiento.img0,
        img1: microemprendimiento.img1,
        img2: microemprendimiento.img2,
        description: microemprendimiento.description,
        moreinfo: microemprendimiento.moreinfo,
        id: microemprendimiento.id,
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
