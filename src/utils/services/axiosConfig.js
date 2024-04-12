import axios from 'axios';

// Configuración de la instancia de Axios
const URL_SERVIDOR = axios.create({
  baseURL: 'http://localhost:8080', // Cambia esto por la URL de tu backend
  // timeout: 5000, // Tiempo máximo de espera para las peticiones en milisegundos
});

// Función para obtener las categorías VISITANTE
export const getCategorias = async () => {
  try {
    return URL_SERVIDOR.get(`/rubro/listarRubros`, {
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

// Función para obtener las publicaciones VISITANTE
export const getPublicaciones = async () => {
  try {
    const response = await URL_SERVIDOR.get('/publicacion/activas');
    return response.data;
  } catch (error) {
    console.error('Error al obtener las publicaciones:', error);
    throw error;
  }
};

// Agregar visualizacion a la publicacion VISITANTE
export const agregarVisualizacion = async id => {
  try {
    const response = await URL_SERVIDOR.put(`/publicacion/visualizacion/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al agregar visualización:', error);
    throw error;
  }
};

// Función para obtener los microemprendimientos VISITANTE
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

// Buscar microemprendimientos VISITANTE
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

// Función para enviar un formulario VISITANTE
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
export const getContactos = async token => {
  try {
    return URL_SERVIDOR.get(`/contacto/all`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
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

export const getPais = async token => {
  try {
    return URL_SERVIDOR.get(`/api/ubuntu/paises`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
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

export const getAllProvincias = async token => {
  try {
    return URL_SERVIDOR.get(`/api/ubuntu/provincias`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
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

export const getProvinciasPais = async (id, token) => {
  try {
    return URL_SERVIDOR.get(`/api/ubuntu/paises/${id}/provincias`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
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
export const putFormulario = async (formulario, id, token) => {
  try {
    return URL_SERVIDOR.put(`/contacto/gestionar/${id}`, formulario, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
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
export const getMicroCategoria = async token => {
  try {
    return URL_SERVIDOR.get(`microEmprendimiento/cantidades_por_rubro`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
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
export const getPublisMes = async token => {
  try {
    return URL_SERVIDOR.get(
      `/publicacion/visualizaciones_publicaciones_total`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
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

//Funciones Admin Publis
export const postFormularioPublicacion = async (formulario, token) => {
  try {
    return URL_SERVIDOR.post(`/publicacion/save`, formulario, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
      .then(response => {
        // console.log('Respuesta del servidor en POST PUBLICACIONES', response);
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
    console.error('Error al enviar el formulario en axios:', error);
  }
};

export const postImagenesPublicacion = async (imagenes, id, token) => {
  try {
    return URL_SERVIDOR.post(`publicacion/${id}/imagenes`, imagenes, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token.value}`,
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        // console.log('Respuesta del servidor imagenes', response);
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

export const putFormularioPublicacion = async (formulario, id, token) => {
  try {
    return URL_SERVIDOR.put(`/publicacion/${id}`, formulario, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      withCredentials: true,
    })
      .then(response => {
        // console.log('Respuesta del servidor en POST PUBLICACIONES', response);
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
    console.error('Error al enviar el formulario en axios:', error);
  }
};

export const putImagenesPublicacion = async (imagenes, id, token) => {
  try {
    return URL_SERVIDOR.put(`publicacion/editImagenes/${id}`, imagenes, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token.value}`,
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        // console.log('Respuesta del servidor imagenes', response);
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
    console.error('Error al buscar publicacaciones en componente:', error);
  }
};

//Funciones Admin Micros
export const postFormularioMicro = async (
  formulario,
  paisId,
  provinciaId,
  token
) => {
  try {
    console.log('Formulario en axios POST micro:', formulario);
    return URL_SERVIDOR.post(
      `/microEmprendimiento/crear/${paisId}/${provinciaId}`,
      formulario,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    )
      .then(response => {
        // console.log('Respuesta del servidor en POST PUBLICACIONES', response);
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
    console.error('Error al enviar el formulario en axios:', error);
  }
};

export const postImagenesMicro = async (imagenes, id, token) => {
  try {
    console.log('Imagenes en axios POST micro:', imagenes);
    return URL_SERVIDOR.post(
      `microEmprendimiento/crearImagenes/${id}`,
      imagenes,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token.value}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    )
      .then(response => {
        // console.log('Respuesta del servidor imagenes', response);
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

export const putFormularioMicro = async (formulario, id, token) => {
  try {
    return URL_SERVIDOR.put(`/microEmprendimiento/editar/${id}`, formulario, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
      .then(response => {
        // console.log('Respuesta del servidor en POST PUBLICACIONES', response);
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
    console.error('Error al enviar el formulario en axios:', error);
  }
};

export const putImagenesMicro = async (imagenes, id, token) => {
  try {
    return URL_SERVIDOR.put(
      `microEmprendimiento/editarImagenes/${id}`,
      imagenes,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token.value}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    )
      .then(response => {
        // console.log('Respuesta del servidor imagenes', response);
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

export const deleteOcultaMicro = async (id, token) => {
  try {
    return URL_SERVIDOR.delete(`microEmprendimiento/ocultar/${id}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
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
