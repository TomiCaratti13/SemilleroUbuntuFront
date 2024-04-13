import * as React from 'react';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import AddIcon from '@mui/icons-material/Add';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useEffect } from 'react';
import { getPreguntas } from '../../utils/services/axiosConfig';

// const primeras = {
//   preguntas: [
//     { name: 'Pregunta 1', id: 1 },
//     { name: 'Pregunta 2', id: 2 },
//   ],
// };

// const segundas1 = {
//   respuesta: 'Respuesta al pregunta 1',
//   preguntas: [
//     { name: 'Pregunta 3', id: 3 },
//     { name: 'Pregunta 4', id: 4 },
//   ],
// };

// const segundas2 = {
//   respuesta: 'Respuesta a la pregunta 2',
//   preguntas: [
//     { name: 'Pregunta 5', id: 5 },
//     { name: 'Pregunta 6', id: 6 },
//   ],
// };

// const terceras3 = {
//   respuesta: 'Respuesta a la pregunta 3 de la 1',
//   preguntas: [
//     { name: 'Pregunta 7', id: 7 },
//     { name: 'Pregunta 8', id: 8 },
//   ],
// };

// const terceras4 = {
//   respuesta: 'Respuesta 5 de la 2',
//   preguntas: [
//     { name: 'Pregunta 9', id: 9 },
//     { name: 'Pregunta 10', id: 10 },
//   ],
// };

// // Mapeo de preguntas a preguntas de seguimiento
// const mapaPreguntas = {
//   1: segundas1,
//   2: segundas2,
//   3: terceras3,
//   5: terceras4,
// };

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const handleDial = boleean => setOpen(boleean);

  const [preguntaSeleccionada, setPreguntaSeleccionada] = useState({});
  const [anterior, setAnterior] = useState([4]);

  const traerMasPreguntas = id => {
    getPreguntas(id).then(nuevasPreguntas => {
      console.log("IDACTUAL",id);
      console.log("Anterior", anterior);
      // console.log(nuevasPreguntas.respuesta.preguntas);
      setAnterior(id);
      setPreguntaSeleccionada(nuevasPreguntas);
      if (nuevasPreguntas) {
        setPreguntaSeleccionada(nuevasPreguntas);
      } else {
        setPreguntaSeleccionada({ pregunta: 'No hay más preguntas' });
      }
    });
  };

  useEffect(() => {
    traerMasPreguntas(4);
  }, [open]);

  // useEffect(() => {
  //   traerMasPreguntas(anterior);
  // }, [anterior]);

  return (
    <div onClick={() => handleDial(false)}>
      <Box
        sx={{
          position: 'fixed',
          height: 330,
          flexGrow: 1,
          bottom: '0',
          right: '0',
          width: '100%',
        }}>
        <Backdrop open={open} />
        <SpeedDial
          ariaLabel="SpeedDial tooltip example"
          sx={{
            position: 'absolute',
            bottom: 16,
            right: 16,
            display: 'flex',
            flexDirection: 'column-reverse',
            alignItems: 'flex-end',
            width: '100%',
          }}
          icon={
            <SpeedDialIcon
              icon={
                open ? (
                  preguntaSeleccionada.pregunta ? (
                    <CallReceivedIcon />
                  ) : (
                    <AddIcon />
                  )
                ) : (
                  <QuestionMarkIcon />
                )
              }
              sx={{
                bgcolor: '#093C59',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          }
          onClick={e => {
            e.stopPropagation();
            if (!open) {
              handleDial(true);
            } else {
              // handleDial(false);
            }

            // if (!preguntaSeleccionada) {
            //   handleDial(false);
            //   setPreguntaSeleccionada(4);
            // }
            if (preguntaSeleccionada && preguntaSeleccionada.id && anterior) {
              if (preguntaSeleccionada !== 4) {
                traerMasPreguntas(anterior);
                setPreguntaSeleccionada(anterior);
              } else {
                handleDial(false);
                setPreguntaSeleccionada(4);
              }
            }
          }}
          open={open}>
          {preguntaSeleccionada.respuesta &&
            preguntaSeleccionada.respuesta.preguntas &&
            preguntaSeleccionada.respuesta.preguntas.map(preguntas => (
              <SpeedDialAction
                key={preguntas.id}
                sx={{
                  bgcolor: '#093C59',
                  color: 'white',
                  maxWidth: '500px',
                  width: 'fit-content',
                  height: 'fit-content',
                  borderRadius: '10px',
                  padding: '5px 8px',
                  textTransform: 'none',
                  alignSelf: 'flex-end',
                  '&:hover': {
                    bgcolor: 'gris.oscuro',
                  },
                }}
                icon={
                  <Typography
                    sx={{
                      textAlign: 'center',
                      textWrap: 'nowrap',
                    }}
                    variant="body1">
                    {preguntas.pregunta}
                  </Typography>
                }
                onClick={event => {
                  event.stopPropagation();
                  traerMasPreguntas(preguntas.id);
                }}
              />
            ))}
          <SpeedDialAction
            sx={{
              bgcolor: 'gris.claro',
              color: '#093C59',
              maxWidth: '500px',
              width: '90%',
              height: 'fit-content',
              borderRadius: '6px',
              padding: '5px 8px',
              textTransform: 'none',
              alignSelf: 'flex-end',
              cursor: 'default',
              '&:hover': {
                bgcolor: 'gris.claro',
              },
            }}
            icon={
              <Typography
                sx={{
                  textAlign: 'center',
                  textWrap: 'wrap',
                  fontSize: '14px',
                  width: '100%',
                  fontWeight: 600,
                }}
                variant="body1">
                {preguntaSeleccionada.respuesta &&
                  preguntaSeleccionada.respuesta.respuesta}
              </Typography>
            }
            onClick={event => {
              event.stopPropagation();
            }}
          />
          {preguntaSeleccionada && (
            <SpeedDialAction
              sx={{
                bgcolor: 'white',
                color: '#093C59',
                maxWidth: '500px',
                width: '90%',
                height: 'fit-content',
                borderRadius: '6px',
                padding: '5px 8px',
                textTransform: 'none',
                alignSelf: 'flex-end',
                cursor: 'default',
                '&:hover': {
                  bgcolor: 'gris.claro',
                },
              }}
              icon={
                <Typography
                  sx={{
                    textAlign: 'center',
                    textWrap: 'wrap',
                    fontSize: '14px',
                    width: '100%',
                    fontWeight: 600,
                  }}
                  variant="body1">
                  {preguntaSeleccionada.pregunta}
                </Typography>
              }
              onClick={event => {
                event.stopPropagation();
                // traerMasPreguntas(pregunta.id);
              }}
            />
          )}
        </SpeedDial>
      </Box>
    </div>
  );
}
