import { addCategory } from "../redux/categorySlice";
import { store } from "../redux/store";
import { getCategorias } from "./axiosConfig";

export const serviceCategorias = async () => {
  const CategoriasStorage = store.getState().category.categoryLista;
  console.log("serviceCategorias",CategoriasStorage)

  if (CategoriasStorage.length === 0) {
    //Llamar a Categorias
    const CategoriasAPI = await getCategorias();
    const CategoriasRedux = CategoriasAPI?.map(categoria => {
      console.log("CategoriasAPI",categoria)
      return {
        title: categoria.nombre,
        identifier: categoria.identifier,
        id: categoria.id,
        img: categoria.img,
      };
    });

    // Guardar Categorias en el estado de redux
    CategoriasRedux.forEach(categoria => {
      store.dispatch(addCategory(categoria));
    });

    return CategoriasRedux;
  } else {
    return CategoriasStorage;
  }
};
