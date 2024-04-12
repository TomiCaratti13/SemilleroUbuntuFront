import { useEffect, useRef, useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Collapse,
  Button,
  Box,
  Typography,
  Popper,
  Fade,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled } from '@mui/material/styles';
import { SliderSwipper } from './SliderSwipper';
import {
  agregarVisualizacion,
  deleteOcultaPubli,
} from '../utils/services/axiosConfig';
import { useSelector } from 'react-redux';
import { useAlertModal } from '../utils/hooks/useAlertModal';
import { AlertModal } from './AlertModal';

const ExpandMoreInfo = styled(props => {
  const { expand, ...other } = props;
  return <Button {...other} />;
})(({ theme }) => ({
  margin: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CardPublicacion({
  publicacion,
  isActive,
  handlePopper,
  isAdmin,
  setEditar,
  setCrear,
}) {
  const [expanded, setExpanded] = useState(false);
  const [placement, setPlacement] = useState();

  //hasSee es para saber si ya se vio la publicacion y no agregar de nuevo
  const [hasSee, setHasSee] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  //Cortar Parrafo si tiene mas de 100 caracteres
  let descriptionTrim = publicacion.description.trim();
  let descriptionSplit = '';

  const index = descriptionTrim.indexOf('  ');
  if (index !== -1 && index > 80) {
    descriptionSplit = [
      descriptionTrim.substring(0, index),
      descriptionTrim.substring(index + 1),
    ];
  } else {
    descriptionSplit = [descriptionTrim];
  }

  //Popper
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = newPlacement => event => {
    setAnchorEl(event.currentTarget);
    setOpen(previousOpen => !previousOpen);
    setPlacement(newPlacement);
    handlePopper(publicacion.id);
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

  //Funcion ocultar Publi
  const token = useSelector(state => state.token);
  const ocultaPubli = async () => {
    deleteOcultaPubli(publicacion.id, token)
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
    useAlertModal(ocultaPubli);

  return (
    <>
      <AlertModal
        closeAlert={closeAlert}
        resendAlert={resendAlert}
        alert={alertModal}
        setCrear={setCrear}
        setEditar={setEditar}
      />
      <Card
        onClick={() => {
          if (!hasSee && !isAdmin) {
            console.log('Agregando visualizacion', publicacion.id);
            agregarVisualizacion(publicacion.id);
            setHasSee(true);
          }
        }}
        sx={{
          bgcolor: 'gris.claro',
          borderRadius: 4,
          padding: '16px 0px 8px 0px',
          boxShadow: 'none',
          width: '100%',
          maxWidth: '500px',
        }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}>
          <Typography
            sx={{
              fontSize: '17px',
              fontFamily: 'Lato',
              fontWeight: 600,
              lineHeight: '25px',
              width: '100%',
              textAlign: 'left',
              marginBottom: '16px',
              marginLeft: '16px',
            }}>
            {publicacion.title}
          </Typography>
          {!isAdmin ? null : (
            <>
              <MoreVertIcon
                onClick={handleClick('bottom-end')}
                aria-describedby={id}
                sx={{
                  cursor: 'pointer',
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  marginBottom: '16px',
                  marginRight: '16px',
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
                          setEditar(publicacion);
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
                        onClick={ocultaPubli}
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
          )}
        </Box>
        <SliderSwipper imgs={publicacion.imagenes} />
        <CardContent style={{ paddingBottom: 0 }}>
          <Typography
            variant="body2"
            color="negro"
            sx={{ fontSize: '14px', fontFamily: 'Lato', fontWeight: 600 }}>
            {publicacion.date}
          </Typography>
          <Typography
            paragraph
            sx={{
              fontSize: '16px',
              fontFamily: 'Lato',
              fontWeight: 400,
              lineHeight: '20px',
              color: 'negro',
            }}>
            {expanded || !descriptionSplit[1]
              ? descriptionSplit[0]
              : descriptionSplit[0] + ' ...'}
          </Typography>
        </CardContent>
        <Collapse
          in={expanded}
          timeout="auto"
          unmountOnExit>
          <CardContent style={{ paddingTop: 0, paddingBottom: 0 }}>
            <Typography
              paragraph
              sx={{
                fontSize: '16px',
                fontFamily: 'Lato',
                fontWeight: 400,
                lineHeight: '20px',
                color: 'negro',
              }}>
              {descriptionSplit[1]}
            </Typography>
          </CardContent>
        </Collapse>
        {descriptionSplit.length > 1 && (
          <CardActions
            disableSpacing
            sx={{ padding: '0px 0 0 0' }}>
            <ExpandMoreInfo
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
              color="azul"
              sx={{
                textTransform: 'none',
                fontFamily: 'Lato',
                fontWeight: 500,
                lineHeight: '20px',
                width: '152px',
                height: '40px',
              }}>
              {expanded ? 'Ver menos' : 'Ver más'}
            </ExpandMoreInfo>
          </CardActions>
        )}
      </Card>
    </>
  );
}
