import { useState, useEffect } from 'react';
import { serviceCategorias } from '../services/serviceCategorias';

export const useCategorias = () => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    serviceCategorias().then(categorias => {
      setCategorias(categorias);
    });
  }, []);

  return categorias;
};
