import { buscarMicroemprendimientos } from './axiosConfig';

export const serviceBuscarMicro = async () => {

    const buscarMicro = await buscarMicroemprendimientos();
    return buscarMicro
  
};
