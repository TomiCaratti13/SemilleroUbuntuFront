import { useState, useEffect } from 'react';
import { serviceMicro } from '../services/serviceMicro';

export const useMicro = () => {
  const [micro, setMicro] = useState([]);

  useEffect(() => {
    serviceMicro().then(micro => {
      setMicro(micro);
    });
  }, []);

  return micro;
};
