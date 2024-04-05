import { addCategory } from "../redux/categorySlice";
import { store } from "../redux/store";
import { getCategorias } from "./axiosConfig";

export const serviceCategorias = async () => {
  const CategoriasStorage = store.getState().category.categoryLista;

  const limpiarNombreCategoria = (nombre) => {
    const nombreLimpio = nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const primeraPalabra = nombreLimpio.split(' ')[0];
    const primeraPalabraMinuscula = primeraPalabra.toLowerCase();
    const primeraPalabraSinÑ = primeraPalabraMinuscula.replace(/ñ/g, 'n');
    const primeraPalabraSinBarra = primeraPalabraSinÑ.split('/')[0];
    console.log(primeraPalabraSinBarra)
    return primeraPalabraSinBarra;
  };

  if (CategoriasStorage.length === 0) {
    //Llamar a Categorias
    const CategoriasAPI = await getCategorias();

    const CategoriasRedux = CategoriasAPI?.map(categoria => {
      const identifier = limpiarNombreCategoria(categoria.nombre);
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


