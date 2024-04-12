import {
  Typography,
  Box,
  Container,
  Button,
  Fade,
  Popper,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect, useRef, useState } from 'react';
import { deleteOcultaMicro } from '../../../utils/services/axiosConfig';
import { useSelector } from 'react-redux';
import { useAlertModal } from '../../../utils/hooks/useAlertModal';
import { AlertModal } from '../../../components/AlertModal';

export const CardAdminMicros = ({
  microemprendimiento,
  onClick,
  setEditar,
  isActive,
  handlePopper,
  isAdmin,
  setVer,
  setCrear,
}) => {
  const microemprendimientoMap = {
    nombre: microemprendimiento.title,
    category: microemprendimiento.category,
  };

  const [placement, setPlacement] = useState();

  //Popper
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = newPlacement => event => {
    setAnchorEl(event.currentTarget);
    setOpen(previousOpen => !previousOpen);
    setPlacement(newPlacement);
    handlePopper(microemprendimiento.id);
  };
  const canBeOpen = isActive && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;

  ////Cerrar el popper si se hace clic fuera de él
  const popperRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (popperRef.current && !popperRef.current.contains(event.target)) {
        setOpen(false); // Cierra el Popper si se hace clic fuera de él
      }
    }
    // Agrega el evento de escucha al montar el componente
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Elimina el evento de escucha al desmontar el componente
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popperRef]);

  //Funcion ocultar micro
  const token = useSelector(state => state.token);
  const ocultarMicro = async () => {
    console.log('Ocultar micro', microemprendimiento.id, token);
    deleteOcultaMicro(microemprendimiento.id, token)
      .then(response => {
        if (response && response.status === 204) {
          openAlert(true, 'Microemprendimiento ocultado con éxito');
        } else {
          openAlert(false, 'Error a ocultar el microemprendimiento');
        }
      })
      .catch(error => {
        // Hubo un error al enviar el formulario
        console.error('Error al enviar el formulario:', error);
        openAlert(
          false,
          'Lo sentimos, la Publicación no pudo ser creada.',
          `Por favor, volvé a intentarlo`
        );
      });
  };

  const [alertModal, openAlert, closeAlert, resendAlert] =
    useAlertModal(ocultarMicro);

  return (
    <>
      <AlertModal
        closeAlert={closeAlert}
        resendAlert={resendAlert}
        alert={alertModal}
        setCrear={setCrear}
        setEditar={setEditar}
      />
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          bgcolor: 'gris.claro',
          borderRadius: '8px',
          p: '8px 8px 8px 16px',
          width: '100%',
          gap: '8px',
        }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            flexGrow: 1,
            p: '8px',
          }}>
          <Typography
            sx={{
              fontSize: '18px',
              lineHeight: '24px',
              fontWeight: 600,
              borderBottom: '1px solid',
              color: 'azul.main',
              padding: '0 0 8px 0',
              display: 'flex',
              gap: '4px',
              flexGrow: 1,
            }}>
            {microemprendimientoMap.nombre}
          </Typography>
          <Typography
            style={{
              fontSize: '16px',
              lineHeight: '24px',
              fontWeight: 400,
              flexGrow: 1,
            }}>
            {microemprendimientoMap.category}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexGrow: 1,
            flexDirection: 'column',
            padding: '8px 0',
            gap: '25px',
          }}>
          <Box
            onClick={onClick}
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              textDecoration: 'none',
              padding: '0',
              margin: '0',
              width: '100%',
              height: '100%',
            }}>
            <>
              <MoreVertIcon
                onClick={handleClick('bottom-end')}
                aria-describedby={id}
                sx={{
                  cursor: 'pointer',
                  width: '30px',
                  height: '30px',
                  p: '6px',
                  borderRadius: '50%',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  '&:hover': {
                    bgcolor: 'azul.main',
                    color: '#fff',
                  },
                }}
              />
              <Popper
                id={id}
                open={open}
                anchorEl={anchorEl}
                placement={placement}
                ref={popperRef}
                sx={{
                  zIndex: 1000,
                  height: '0px',
                }}
                transition>
                {({ TransitionProps }) => (
                  <Fade
                    {...TransitionProps}
                    timeout={350}>
                    <Box
                      sx={{
                        width: '100%',
                        height: '100%',
                        p: '0',
                        m: '0',
                        display: 'flex',
                        flexDirection: 'column',
                      }}>
                      <Button
                        onClick={() => {
                          setEditar(microemprendimiento);
                        }}
                        sx={{
                          backgroundColor: 'blanco.main',
                          opacity: 1,
                          fontWeight: 600,
                          fontSize: '14px',
                          lineHeight: '25px',
                          textTransform: 'none',
                          color: 'negro.main',
                          width: '200px',
                          borderRadius: '0',
                          '&:hover': {
                            bgcolor: 'gris.claro',
                          },
                        }}>
                        Editar
                      </Button>
                      <Button
                        onClick={ocultarMicro}
                        sx={{
                          bgcolor: 'blanco.main',
                          opacity: 1,
                          fontWeight: 600,
                          fontSize: '14px',
                          lineHeight: '25px',
                          textTransform: 'none',
                          color: 'negro.main',
                          borderRadius: '0 0 4px 4px',
                          '&:hover': {
                            bgcolor: 'gris.claro',
                          },
                        }}>
                        Ocultar
                      </Button>
                    </Box>
                  </Fade>
                )}
              </Popper>
            </>
          </Box>
          <Box
            onClick={() => {
              setVer(microemprendimiento);
            }}
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              textDecoration: 'none',
              p: '0',
              m: '0',
              width: '100%',
              height: '100%',
            }}>
            <ArrowForwardIosIcon
              sx={{
                cursor: 'pointer',
                width: '30px',
                height: '30px',
                p: '6px',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                '&:hover': {
                  bgcolor: 'azul.main',
                  color: '#fff',
                },
              }}
            />
          </Box>
        </Box>
      </Container>
    </>
  );
};
