import { useState, useEffect } from 'react';
import { servicePublicaciones } from '../services/servicePublicaciones';

export const usePublicaciones = () => {
  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {
    servicePublicaciones().then(publicaciones => {
      setPublicaciones(publicaciones);
    });
  }, []);

  return publicaciones;
};
