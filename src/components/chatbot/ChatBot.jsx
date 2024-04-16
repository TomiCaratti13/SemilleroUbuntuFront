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

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const handleDial = boleean => setOpen(boleean);

  const [preguntaSeleccionada, setPreguntaSeleccionada] = useState({});
  const [anterior, setAnterior] = useState([4]);

  const seleccionarPregunta = id => {
    setAnterior(prevAnterior => {
      const nuevoAnterior = [...prevAnterior, id];
      return nuevoAnterior;
    });
    traerMasPreguntas(id);
  };

  const volverAtras = () => {
    setAnterior(prevAnterior => {
      const nuevoAnterior = [...prevAnterior];
      nuevoAnterior.pop();
      const idPreguntaAnterior = nuevoAnterior[nuevoAnterior.length - 1];
      traerMasPreguntas(idPreguntaAnterior);
      return nuevoAnterior;
    });
  };

  const traerMasPreguntas = id => {
    getPreguntas(id).then(nuevasPreguntas => {
      setPreguntaSeleccionada(nuevasPreguntas);
      if (nuevasPreguntas) {
        setPreguntaSeleccionada(nuevasPreguntas);
      } else {
        setPreguntaSeleccionada({ pregunta: 'No hay más preguntas' });
      }
    });
  };

  useEffect(() => {
    seleccionarPregunta(4);
  }, [open]);

  //Array para revisar array
  const todosIguales = arr => arr.every(val => val === arr[0]);

  return (
    <div
      onClick={() => {
        handleDial(false), setAnterior([4]);
      }}>
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
          open={open}
          onClick={e => {
            e.stopPropagation();
            if (!open) {
              handleDial(true);
            } else if (
              todosIguales(anterior) &&
              anterior[anterior.length - 1] === 4
            ) {
              setAnterior([4]);
              handleDial(false);
            } else {
              volverAtras();
            }
          }}
          ariaLabel="SpeedDial tooltip example"
          sx={{
            position: 'absolute',
            bottom: 16,
            right: 16,
            display: 'flex',
            flexDirection: 'column-reverse',
            alignItems: 'flex-end',
          }}
          icon={
            <SpeedDialIcon
              icon={
                open ? (
                  !(
                    todosIguales(anterior) &&
                    anterior[anterior.length - 1] === 4
                  ) ? (
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
          }>
          {preguntaSeleccionada.respuesta &&
            preguntaSeleccionada.respuesta.preguntas &&
            preguntaSeleccionada.respuesta.preguntas.map(preguntas => (
              <SpeedDialAction
                key={preguntas.id}
                onClick={event => {
                  event.stopPropagation();
                  seleccionarPregunta(preguntas.id);
                }}
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
              />
            ))}
          {preguntaSeleccionada.respuesta && (
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
                  {preguntaSeleccionada.respuesta.respuesta}
                </Typography>
              }
              onClick={event => {
                event.stopPropagation();
              }}
            />
          )}
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
              }}
            />
          )}
        </SpeedDial>
      </Box>
    </div>
  );
}
