import React, { useEffect } from 'react';
import { Box, Typography, Container } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import AdminInfo from '../../utils/mocks/AdminDashboard.json';
import Categorias from '../../utils/mocks/Categorias.json';
import Publicaciones from '../../utils/mocks/Publicaciones.json';
// import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../utils/redux/userSlice';
import { useParams } from 'react-router-dom';

export const AdminDashboard = () => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  // const getCookie = () => {
  //   const token = Cookies.get('token');
  //   const decodedToken = jwtDecode(token);
  //   dispatch(addUser(decodedToken))
  // }
  // useEffect(()=>{
  //   getCookie();
  // }, []);

  const getParams = () => {
    const {token} = useParams()
    const decodedToken = jwtDecode(token);
    dispatch(addUser(decodedToken))
  }

  useEffect(()=>{
    getParams();
  }, [user]);

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
            {Categorias.map((categoria, index) => (
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
        {Publicaciones.map((publicacion, index) => (
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
