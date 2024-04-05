import { useEffect, useState } from 'react';
import {
  getContactos,
  getMicroCategoria,
  getPublisMes,
} from '../services/axiosConfig';

export const useAdminDashboard = () => {
  const [AdminInfo, setAdminInfo] = useState({
    NuevosMicroemprendimientos: 0,
    Gestionados: 0,
    NoGestionados: 0,
    MicroxCategoria: [
      {
        cantidad: 0,
        title: '',
      },
    ],
    Publicaciones: [
      {
        title: '',
        fecha: '',
        visualizaciones: 0,
      },
    ],
  });
  //traerCosas
  useEffect(() => {
    const contactos = getContactos().then(response => {
      let gestionados = 0;
      let noGestionados = 0;
      response.data.forEach(contacto => {
        if (contacto.gestionado) {
          gestionados++;
        } else {
          noGestionados++;
        }
      });
      return { gestionados, noGestionados };
    });
    const microXCat = getMicroCategoria().then(response => {
      const categorias = response.data.map(cat => {
        return {
          title: cat.categoria,
          cantidad: cat.cantidad_microEmprendimientos,
        };
      });
      return categorias;
    });
    const visPubli = getPublisMes().then(response => {
      const publicaciones = response.data.map(publicacion => {
        //Arreglo fecha Unix
        let timestamp = publicacion.fecha_creacion;
        let date = new Date(timestamp);
        return {
          title: publicacion.titulo,
          visualizaciones: publicacion.visualizaciones,
          fecha: date.toLocaleDateString('es-AR', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          }),
        };
      });
      return publicaciones;
    });
    Promise.all([contactos, microXCat, visPubli]).then(info => {
      setAdminInfo({
        NuevosMicroemprendimientos: info[1].reduce(
          (total, cat) => total + cat.cantidad,
          0
        ),
        Gestionados: info[0].gestionados,
        NoGestionados: info[0].noGestionados,
        MicroxCategoria: info[1],
        Publicaciones: info[2],
      });
    });
  }, []);

  return AdminInfo;
};
