import { addCategory } from "../redux/categorySlice";
import { store } from "../redux/store";
import { getCategorias } from "./axiosConfig";

export const serviceCategorias = async () => {
  const CategoriasStorage = store.getState().category.lista;
  console.log(CategoriasStorage)

  if (CategoriasStorage.length === 0) {
    //Llamar a Categorias
    const CategoriasAPI = await getCategorias();
    const CategoriasRedux = CategoriasAPI?.map(categoria => {
      return {
        title: categoria.title,
        identifier: categoria.identifier,
        // cantidad: categoria.cantidad,
        img: categoria.img,
        // description: categoria.description,
      };

    });

    //Guardar Categorias en el estado de redux
    CategoriasRedux.forEach(categoria => {
      store.dispatch(addCategory(categoria));
    });

    return CategoriasRedux;
  } else {
    return CategoriasStorage;
  }
};
