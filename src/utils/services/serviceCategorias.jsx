import { addCategory } from "../redux/categorySlice";
import { store } from "../redux/store";
import { getCategorias } from "./axiosConfig";

export const serviceCategorias = async () => {
  const CategoriasStorage = store.getState().category.categoryLista;

  const generarIdentifier = (nombre) => {
    const normalizado = nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const primera = normalizado.split(' ')[0];
    const sinBarra = primera.split('/')[0];
    const minuscula = sinBarra.toLowerCase();
    const sinÑ = minuscula.replace(/ñ/g, 'n');
    return sinÑ;
  };

  if (CategoriasStorage.length === 0) {
    //Llamar a Categorias
    const CategoriasAPI = await getCategorias();

    const CategoriasRedux = CategoriasAPI?.map(categoria => {
      const identifier = generarIdentifier(categoria.nombre);
      return {
        id: categoria.id,
        title: categoria.nombre,
        identifier: identifier,
        // cantidad: categoria.cantidad,
        img: categoria.img,
      };
    });

    CategoriasRedux.forEach(categoria => {
      store.dispatch(addCategory(categoria));
    });

    return CategoriasRedux;
  } else {
    return CategoriasStorage;
  }
};


