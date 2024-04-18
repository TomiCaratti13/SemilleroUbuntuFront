import { addMicro, clearMicro } from '../redux/microSlice';
import { store } from '../redux/store';
import { getMicroemprendimientos } from './axiosConfig';

const generarIdentifier = rubro => {
  const normalizado = rubro.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const primera = normalizado.split(' ')[0];
  const sinBarra = primera.split('/')[0];
  const minuscula = sinBarra.toLowerCase();
  const sinÑ = minuscula.replace(/ñ/g, 'n');
  return sinÑ;
};

export const serviceMicro = async () => {
  const microStorage = store.getState().microemprendimiento.microLista;

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
      imagenes: microemprendimiento.imagenes,
      pais: microemprendimiento.pais,
      provincia: microemprendimiento.provincia,
      ciudad: microemprendimiento.ciudad,
      paisId: microemprendimiento.paisId,
      provinciaId: microemprendimiento.provinciaId,
      rubroId: microemprendimiento.rubroId,
    };
  });

  const isDataChanged =
    JSON.stringify(microStorage) !== JSON.stringify(microRedux);

  if (isDataChanged) {
    //Limpiar el estado de Redux
    store.dispatch(clearMicro());

    //Guardar publicaciones en el estado de redux
    microRedux.forEach(micro => {
      store.dispatch(addMicro(micro));
    });

    return microRedux;
  } else {
    return microStorage;
  }
};
