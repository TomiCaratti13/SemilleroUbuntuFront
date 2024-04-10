import axios from 'axios';

// Configuración de la instancia de Axios
const URL_SERVIDOR = axios.create({
  baseURL: 'http://localhost:8080', // Cambia esto por la URL de tu backend
  // timeout: 5000, // Tiempo máximo de espera para las peticiones en milisegundos
});

// Función para obtener las categorías
export const getCategorias = async () => {
  try {
    return URL_SERVIDOR.get(`/rubro/listarRubros`,
    {
      withCredentials: true,
    })
      .then(response => {
        // console.log('Respuesta del servidor', response);
        return response.data;
      })
      .catch(error => {
        if (error.response) {
          // El servidor respondió con un estado de error
          console.log('Error en respuesta', error.response);
        } else if (error.request) {
          // La solicitud fue hecha pero no se recibió ninguna respuesta
          console.log('Error en llamado', error.request);
        } else {
          // Algo sucedió en la configuración de la solicitud que provocó un error
          console.log('Error', error.message);
        }
        console.log('Error configuracion', error.config);
      });
  } catch (error) {
    console.error('Error al buscar microemprendimientos en componente:', error);
  }
};
// export const getCategorias = async () => {
//   try {
//     const response = await URL_SERVIDOR.get('/rubro/listarRubros');
//     console.log(response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Error al obtener las categorías:', error);
//     throw error;
//   }
// };

// Función para obtener las publicaciones
export const getPublicaciones = async () => {
  try {
    const response = await URL_SERVIDOR.get('/publicacion/activas');
    return response.data;
  } catch (error) {
    console.error('Error al obtener las publicaciones:', error);
    throw error;
  }
};

// Agregar visualizacion a la publicacion
export const agregarVisualizacion = async id => {
  try {
    const response = await URL_SERVIDOR.put(`/publicacion/visualizacion/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al agregar visualización:', error);
    throw error;
  }
};

// Función para obtener los microemprendimientos
export const getMicroemprendimientos = async () => {
  try {
    return URL_SERVIDOR.get(`/microEmprendimiento/listar`)
      .then(response => {
        // console.log('Respuesta del servidor', response);
        return response.data;
      })
      .catch(error => {
        if (error.response) {
          // El servidor respondió con un estado de error
          console.log('Error en respuesta', error.response);
        } else if (error.request) {
          // La solicitud fue hecha pero no se recibió ninguna respuesta
          console.log('Error en llamado', error.request);
        } else {
          // Algo sucedió en la configuración de la solicitud que provocó un error
          console.log('Error', error.message);
        }
        console.log('Error configuracion', error.config);
      });
  } catch (error) {
    console.error('Error al buscar microemprendimientos en componente:', error);
  }
};

// Buscar microemprendimientos
export const buscarMicroemprendimientos = async nombre => {
  try {
    return URL_SERVIDOR.get(`/microEmprendimiento/buscarPorNombre/${nombre}`, {
      withCredentials: true,
    })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        if (error.response) {
          // El servidor respondió con un estado de error
          console.log('Error en respuesta', error.response);
        } else if (error.request) {
          // La solicitud fue hecha pero no se recibió ninguna respuesta
          console.log('Error en llamado', error.request);
        } else {
          // Algo sucedió en la configuración de la solicitud que provocó un error
          console.log('Error', error.message);
        }
        console.log('Error configuracion', error.config);
      });
  } catch (error) {
    console.error('Error al buscar microemprendimientos en componente:', error);
  }
};

// Función para enviar un formulario
export const enviarFormulario = async (formulario, id) => {
  try {
    return URL_SERVIDOR.post(`/contacto/${id}`, formulario, {
      withCredentials: true,
    })
      .then(response => {
        // console.log('Respuesta del servidor', response);
        return response;
      })
      .catch(error => {
        if (error.response) {
          // El servidor respondió con un estado de error
          console.log('Error en respuesta', error.response);
        } else if (error.request) {
          // La solicitud fue hecha pero no se recibió ninguna respuesta
          console.log('Error en llamado', error.request);
        } else {
          // Algo sucedió en la configuración de la solicitud que provocó un error
          console.log('Error', error.message);
        }
        console.log('Error configuracion', error.config);
      });
  } catch (error) {
    console.error('Error al buscar microemprendimientos en componente:', error);
  }
};

// Función para traer todos los contactos
export const getContactos = async () => {
  try {
    return URL_SERVIDOR.get(`/contacto/all`, {
      withCredentials: true,
    })
      .then(response => {
        // console.log('Respuesta del servidor', response);
        return response;
      })
      .catch(error => {
        if (error.response) {
          // El servidor respondió con un estado de error
          console.log('Error en respuesta', error.response);
        } else if (error.request) {
          // La solicitud fue hecha pero no se recibió ninguna respuesta
          console.log('Error en llamado', error.request);
        } else {
          // Algo sucedió en la configuración de la solicitud que provocó un error
          console.log('Error', error.message);
        }
        console.log('Error configuracion', error.config);
      });
  } catch (error) {
    console.error('Error al buscar microemprendimientos en componente:', error);
  }
};

// Función para editar un formulario
export const putFormulario = async (formulario, id) => {
  try {
    return URL_SERVIDOR.put(`/contacto/gestionar/${id}`, formulario, {
      withCredentials: true,
    })
      .then(response => {
        // console.log('Respuesta del servidor', response);
        return response;
      })
      .catch(error => {
        if (error.response) {
          // El servidor respondió con un estado de error
          console.log('Error en respuesta', error.response);
        } else if (error.request) {
          // La solicitud fue hecha pero no se recibió ninguna respuesta
          console.log('Error en llamado', error.request);
        } else {
          // Algo sucedió en la configuración de la solicitud que provocó un error
          console.log('Error', error.message);
        }
        console.log('Error configuracion', error.config);
      });
  } catch (error) {
    console.error('Error al buscar microemprendimientos en componente:', error);
  }
};

// Funcion para traer microemprendmientos por categoria
export const getMicroCategoria = async () => {
  try {
    return URL_SERVIDOR.get(`microEmprendimiento/cantidades_por_rubro`, {
      withCredentials: true,
    })
      .then(response => {
        // console.log('Respuesta del servidor', response);
        return response;
      })
      .catch(error => {
        if (error.response) {
          // El servidor respondió con un estado de error
          console.log('Error en respuesta', error.response);
        } else if (error.request) {
          // La solicitud fue hecha pero no se recibió ninguna respuesta
          console.log('Error en llamado', error.request);
        } else {
          // Algo sucedió en la configuración de la solicitud que provocó un error
          console.log('Error', error.message);
        }
        console.log('Error configuracion', error.config);
      });
  } catch (error) {
    console.error('Error al buscar microemprendimientos en componente:', error);
  }
};

//Funcion para traer visualizaciones de las publicaciones del MES
export const getPublisMes = async () => {
  try {
    return URL_SERVIDOR.get(
      `/publicacion/visualizaciones_publicaciones_total`,
      {
        withCredentials: true,
      }
    )
      .then(response => {
        // console.log('Respuesta del servidor', response);
        return response;
      })
      .catch(error => {
        if (error.response) {
          // El servidor respondió con un estado de error
          console.log('Error en respuesta', error.response);
        } else if (error.request) {
          // La solicitud fue hecha pero no se recibió ninguna respuesta
          console.log('Error en llamado', error.request);
        } else {
          // Algo sucedió en la configuración de la solicitud que provocó un error
          console.log('Error', error.message);
        }
        console.log('Error configuracion', error.config);
      });
  } catch (error) {
    console.error('Error al buscar microemprendimientos en componente:', error);
  }
};
