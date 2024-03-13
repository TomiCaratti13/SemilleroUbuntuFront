import axios from 'axios';

const login = async () => {
  try {
    const response = await axios.post('URL_DEL_ENDPOINT_DE_LOGIN', {});

    const token = response.data.token;
    
    console.log('Token recibido:', token);

  } catch (error) {
    console.error('Error al iniciar sesión:', error);
  }
};