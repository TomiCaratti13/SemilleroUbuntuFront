import React from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Box, Button, Modal, Typography } from '@mui/material';

export const AlertForm = ({ open, setOpen, success }) => {
  const handleClose = () => setOpen(false);

  if (success) {
    return (
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '328px',
              height: '200px',
              bgcolor: 'blanco.main',
              borderRadius: '20px',
              padding: '16px',
              textAlign: 'center',
              gap: '10px',
            }}>
            <CheckCircleOutlineIcon
              sx={{
                color: 'gestion.exito',
                width: '50px',
                height: '50px',
              }}
            />
            <Typography
              sx={{
                fontSize: '18px',
                lineHeight: '25px',
                fontWeight: 400,
                color: 'negro.main',
              }}>
              Formulario enviado con éxito
            </Typography>
            <Typography
              sx={{
                fontSize: '14px',
                lineHeight: '20px',
                fontWeight: 400,
                color: 'negro.main',
                textAlign: 'start',
              }}>
              Gracias por contactarnos, nos comunicaremos en breve
            </Typography>
            <Button
              sx={{
                marginLeft: '70%',
                fontSize: '14px',
                lineHeight: '20px',
                fontWeight: 600,
                color: 'azul.main',
                textAlign: 'center',
                textTransform: 'none',
                '&:hover': {
                  bgcolor: 'gris.medio',
                },
              }}
              onClick={handleClose}>
              Aceptar
            </Button>
          </Box>
        </Modal>
      </div>
    );
  } else {
    return (
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '328px',
              height: '200px',
              bgcolor: 'blanco.main',
              borderRadius: '20px',
              padding: '16px',
              textAlign: 'center',
              gap: '10px',
            }}>
            <HighlightOffIcon
              sx={{
                color: 'gestion.error',
                width: '50px',
                height: '50px',
              }}
            />
            <Typography
              sx={{
                fontSize: '18px',
                lineHeight: '25px',
                fontWeight: 400,
                color: 'negro.main',
              }}>
              Lo sentimos, el Formulario no pudo ser enviado.
            </Typography>
            <Typography
              sx={{
                fontSize: '14px',
                lineHeight: '20px',
                fontWeight: 400,
                color: 'negro.main',
                textAlign: 'start',
              }}>
              Por favor, volvé a intentarlo.
            </Typography>
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                m: 0,
                justifyContent: 'end',
              }}>
              <Button
                sx={{
                  fontSize: '14px',
                  lineHeight: '20px',
                  fontWeight: 600,
                  color: 'azul.main',
                  textAlign: 'center',
                  textTransform: 'none',
                  '&:hover': {
                    bgcolor: 'gris.medio',
                  },
                }}
                onClick={handleClose}>
                Cancelar
              </Button>
              <Button
                sx={{
                  fontSize: '14px',
                  lineHeight: '20px',
                  fontWeight: 600,
                  color: 'azul.main',
                  textAlign: 'center',
                  textTransform: 'none',
                  '&:hover': {
                    bgcolor: 'gris.medio',
                  },
                }}
                onClick={handleClose}>
                Intentar Nuevamente
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>
    );
  }
};
