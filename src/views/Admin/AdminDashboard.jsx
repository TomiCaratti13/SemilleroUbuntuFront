
import { useEffect, useState } from 'react';
import { Box, Typography, Container } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {
  getContactos,
  getMicroCategoria,
  getPublisMes,
} from '../../utils/services/axiosConfig';
import { useParams } from 'react-router-dom';
import { serviceUser } from '../../utils/services/serviceUser';


export const AdminDashboard = () => {
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
  
  const { token } = useParams();

  useEffect(() => {

    serviceUser({ token });

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

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        padding: '30px 16px',
      }}>
      <Typography
        sx={{
          fontFamily: 'Lato',
          fontSize: '28px',
          fontWeight: 500,
          lineHeight: '35px',
          textAlign: 'center',
        }}>
        Dashboard Administrador
      </Typography>
      <Typography
        sx={{
          fontFamily: 'Lato',
          fontSize: '22px',
          fontWeight: 600,
          lineHeight: '30px',
          textAlign: 'center',
        }}>
        Estadísticas mensuales
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
        }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '16px',
              bgcolor: 'azul.main',
              color: 'blanco.main',
              borderRadius: '8px',
              padding: '8px 16px',
            }}>
            <Typography
              sx={{
                fontFamily: 'Lato',
                fontSize: '20px',
                fontWeight: 700,
                lineHeight: '25px',
              }}>
              Nuevos Microemprendmientos
            </Typography>
            <Typography
              sx={{
                fontFamily: 'Lato',
                fontSize: '22px',
                fontWeight: 700,
                lineHeight: '25px',
              }}>
              {AdminInfo.NuevosMicroemprendimientos}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '16px',
            }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                color: 'negro.main',
                borderRadius: '8px',
                border: '2px solid',
                borderColor: 'gestion.exito',
                padding: '8px',
                flexGrow: 1,
              }}>
              <Typography
                sx={{
                  fontFamily: 'Lato',
                  fontSize: '18px',
                  fontWeight: 400,
                  lineHeight: '25px',
                  borderBottom: '1px solid ',
                  borderColor: 'gestion.exito',
                }}>
                Gestionados
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Lato',
                  fontSize: '20px',
                  fontWeight: 700,
                  lineHeight: '25px',
                }}>
                {AdminInfo.Gestionados}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                color: 'negro.main',
                borderRadius: '8px',
                border: '2px solid',
                borderColor: 'gestion.nogestionada',
                padding: '8px',
                flexGrow: 1,
              }}>
              <Typography
                sx={{
                  fontFamily: 'Lato',
                  fontSize: '18px',
                  fontWeight: 400,
                  lineHeight: '25px',
                  borderBottom: '1px solid ',
                  borderColor: 'gestion.nogestionada',
                }}>
                No gestionados
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Lato',
                  fontSize: '20px',
                  fontWeight: 700,
                  lineHeight: '25px',
                }}>
                {AdminInfo.NoGestionados}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            bgcolor: 'gris.claro',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
          }}>
          <Typography
            sx={{
              fontFamily: 'Lato',
              fontSize: '20px',
              fontWeight: 600,
              lineHeight: '25px',
              textAlign: 'center',
              color: 'azul.main',
              borderBottom: '2px solid',
              borderColor: 'verde.main',
              padding: '16px 16px 8px',
              textWrap: 'pretty',
            }}>
            Microemprendimientos por categoria
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: '8px',
              padding: ' 8px 20px 20px',
              flexDirection: 'column',
            }}>
            {AdminInfo.MicroxCategoria.map((categoria, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid',
                  borderColor: 'verde.main',
                  padding: '0 0 8px',
                  gap: '20px',
                }}>
                <Typography
                  sx={{
                    fontFamily: 'Lato',
                    fontSize: '16px',
                    fontWeight: 400,
                    lineHeight: '25px',
                  }}>
                  {categoria.title}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'Lato',
                    fontSize: '18px',
                    fontWeight: 700,
                    lineHeight: '25px',
                  }}>
                  {categoria.cantidad}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Typography
        sx={{
          fontFamily: 'Lato',
          fontSize: '20px',
          fontWeight: 600,
          lineHeight: '20px',
          textAlign: 'center',
        }}>
        Visualizaciones por Publicación
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '16px',
        }}>
        {AdminInfo.Publicaciones.map((publicacion, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '16px',
              padding: '8px 16px',
              border: '2px solid',
              borderColor: 'azul.main',
              borderRadius: '8px',
              alignItems: 'center',
              minWidth: '330px',
            }}>
            <Box>
              <Typography
                sx={{
                  fontFamily: 'Lato',
                  fontSize: '16px',
                  fontWeight: 600,
                  lineHeight: '20px',
                }}>
                {publicacion.title}
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Lato',
                  fontSize: '14px',
                  fontWeight: 500,
                  lineHeight: '25px',
                }}>
                {publicacion.fecha}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
              }}>
              <VisibilityOutlinedIcon
                sx={{
                  color: 'azul.main',
                  fontSize: '24px',
                }}
              />
              <Typography
                sx={{
                  fontFamily: 'Lato',
                  fontSize: '18px',
                  fontWeight: 700,
                  lineHeight: '25px',
                  textAlign: 'center',
                  color: 'azul.main',
                }}>
                {publicacion.visualizaciones}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Container>
  );
};
