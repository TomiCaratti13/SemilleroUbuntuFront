import { useEffect, useState } from 'react';
import { serviceBuscarMicro } from '../services/serviceBuscarMicro';

export const useBuscarMic = search => {
  const [buscarMic, setbuscarMic] = useState([]);

  useEffect(() => {
    serviceBuscarMicro(search).then(buscarMic => {
      setbuscarMic(buscarMic);
    });
  }, [search]);

  return buscarMic;
};
