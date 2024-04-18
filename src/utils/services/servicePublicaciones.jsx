import { addPublicacion, clearPublicaciones } from '../redux/publicacionSlice';
import { store } from '../redux/store';
import { getPublicaciones } from './axiosConfig';

export const servicePublicaciones = async () => {
  const publicacionesStorage = store.getState().publicacion.publicacionLista;

  // Llamar a publicaciones SIEMPRE
  const publicacionesAPI = await getPublicaciones();
  const publicacionesRedux = publicacionesAPI?.map(publicacion => {
    return {
      id: publicacion.id,
      title: publicacion.titulo,
      description: publicacion.descripcion,
      date: publicacion.fechaCreacion,
      visualizaciones: publicacion.visualizaciones,
      imagenes: publicacion.imagenes,
    };
  });

  // Compara los datos de la API con los datos existentes en el almacenamiento de Redux
  const isDataChanged =
    JSON.stringify(publicacionesStorage) !== JSON.stringify(publicacionesRedux);

  if (isDataChanged) {
    // Limpiar el estado de Redux
    store.dispatch(clearPublicaciones());

    // Guardar publicaciones en el estado de redux
    publicacionesRedux.forEach(publicacion => {
      store.dispatch(addPublicacion(publicacion));
    });

    return publicacionesRedux;
  } else {
    return publicacionesStorage;
  }
};
