export const useBuscarMic = () => {
  //Llamamos a la API para obtener los microemprendimientos
  const serviceBuscarMicro = async nombre => {
    const micEncontrados = await buscarMicroemprendimientos(nombre);

    //Filtramos los microemprendmientos por el parametro de busqueda
    const filtrarMic = e =>
      e.filter(
        mic =>
          mic.title.toLowerCase().includes(search?.toLowerCase()) ||
          mic.description?.toLowerCase().includes(search?.toLowerCase()) ||
          mic.category?.toLowerCase().includes(search?.toLowerCase()) ||
          mic.subcategory?.toLowerCase().includes(search?.toLowerCase())
      );

    //Ordenamos los microemprendimientos por coincidencia en el titulo y categoria
    const ordenarMic = e =>
      e.sort((a, b) => {
        const aTitle = a.title.toLowerCase().includes(search?.toLowerCase())
          ? 1
          : 0;
        const bTitle = b.title.toLowerCase().includes(search?.toLowerCase())
          ? 1
          : 0;
        const aCategory = a.category
          ?.toLowerCase()
          .includes(search?.toLowerCase())
          ? 1
          : 0;
        const bCategory = b.category
          ?.toLowerCase()
          .includes(search?.toLowerCase())
          ? 1
          : 0;
        //   const aSubcategory = a.subcategory?.toLowerCase().includes(search?.toLowerCase()) ? 1 : 0;
        //   const bSubcategory = b.subcategory?.toLowerCase().includes(search?.toLowerCase()) ? 1 : 0;

        return bTitle - aTitle || bCategory - aCategory;
        //    || bSubcategory - aSubcategory;
      });

    const micOrdenados = ordenarMic(filtrarMic(micEncontrados));
    return micOrdenados;
  };

  return serviceBuscarMicro;
};
