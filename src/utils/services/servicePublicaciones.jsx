import { addPublicacion } from '../redux/publicacionSlice';
import { store } from '../redux/store';
import { getPublicaciones } from './axiosConfig';

export const servicePublicaciones = async () => {
  const publicacionesStorage = store.getState().publicacion.Publicacionlista;

  if (publicacionesStorage.length === 0) {
    //Llamar a publicaciones
    const publicacionesAPI = await getPublicaciones();
    const publicacionesRedux = publicacionesAPI?.map(publicacion => {
      return {
        id: publicacion.id,
        title: publicacion.titulo,
        description: publicacion.descripcion,
        date: publicacion.fechaCreacion,
        visualizaciones: publicacion.visualizaciones,
      };
    });

    //Guardar publicaciones en el estado de redux
    publicacionesRedux.forEach(publicacion => {
      store.dispatch(addPublicacion(publicacion));
    });

    return publicacionesRedux;
  } else {
    return publicacionesStorage;
  }
};
