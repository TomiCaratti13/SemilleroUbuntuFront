import axios from 'axios';

// Configuración de la instancia de Axios
const URL_SERVIDOR = axios.create({
    baseURL: 'http://localhost:8080', // Cambia esto por la URL de tu backend
    timeout: 5000, // Tiempo máximo de espera para las peticiones en milisegundos
});

// Función para obtener las categorías
export const getCategorias = async () => {
    try {
        const response = await URL_SERVIDOR.get('/categorias');
        return response.data;
        
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
        throw error;
    }
};

// Función para obtener las publicaciones
export const getPublicaciones = async () => {
    try {
        const response = await URL_SERVIDOR.get('/publicacion/activas');
        console.log('response.data', response.data)
        return response.data;
    } catch (error) {
        console.error('Error al obtener las publicaciones:', error);
        throw error;
    }
};

// Función para obtener los microemprendimientos
export const getMicroemprendimientos = async () => {
    try {
        const response = await URL_SERVIDOR.get('/microemprendimientos');
        return response.data;
    } catch (error) {
        console.error('Error al obtener los microemprendimientos:', error);
        throw error;
    }
};

// Función para enviar un formulario
export const enviarFormulario = async (formulario) => {
    try {
        const response = await URL_SERVIDOR.post('/recibirFormulario', {
            body : formulario
        });
        console.log(response.data);
        return response;
    } catch (error) {
        console.error('Error al crear la categoría:', error);
        return error;
    }
};