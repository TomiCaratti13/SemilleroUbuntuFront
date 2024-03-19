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

const primeras = {
  preguntas: [
    { name: 'Pregunta 1', id: 1 },
    { name: 'Pregunta 2', id: 2 },
  ],
};

const segundas1 = {
  respuesta: 'Respuesta al pregunta 1',
  preguntas: [
    { name: 'Pregunta 3', id: 3 },
    { name: 'Pregunta 4', id: 4 },
  ],
};

const segundas2 = {
  respuesta: 'Respuesta a la pregunta 2',
  preguntas: [
    { name: 'Pregunta 5', id: 5 },
    { name: 'Pregunta 6', id: 6 },
  ],
};

const terceras3 = {
  respuesta: 'Respuesta a la pregunta 3 de la 1',
  preguntas: [
    { name: 'Pregunta 7', id: 7 },
    { name: 'Pregunta 8', id: 8 },
  ],
};

const terceras4 = {
  respuesta: 'Respuesta 5 de la 2',
  preguntas: [
    { name: 'Pregunta 9', id: 9 },
    { name: 'Pregunta 10', id: 10 },
  ],
};

// Mapeo de preguntas a preguntas de seguimiento
const mapaPreguntas = {
  1: segundas1,
  2: segundas2,
  3: terceras3,
  5: terceras4,
};

export default function SpeedDialTooltipOpen() {
  const [open, setOpen] = useState(false);
  const handleDial = boleean => setOpen(boleean);

  const [preguntaSeleccionada, setPreguntaSeleccionada] = useState(primeras);

  const traerMasPreguntas = idPregunta => {
    const nuevasPreguntas = mapaPreguntas[idPregunta];
    if (nuevasPreguntas) {
      setPreguntaSeleccionada(nuevasPreguntas);
    } else {
      setPreguntaSeleccionada({ respuesta: 'No hay más preguntas' });
    }
  };

  // useEffect(() => {
  //   if (preguntaSeleccionada) {
  //     traerMasPreguntas(preguntaSeleccionada);
  //   }
  //   // setPreguntaSeleccionada(segundas1)
  // }, [preguntaSeleccionada]);

  return (
    <div onClick={() => handleDial(false)}>
      <Box
        sx={{
          position: 'fixed',
          height: 330,
          flexGrow: 1,
          bottom: '0',
          right: '0',
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
          }}
          icon={
            <SpeedDialIcon
              icon={
                open ? (
                  preguntaSeleccionada.respuesta ? (
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
              handleDial(false);
            }

            if (!preguntaSeleccionada.preguntas) {
              handleDial(false);
              setPreguntaSeleccionada(primeras);
            }
          }}
          open={open}>
          {preguntaSeleccionada.preguntas?.map(pregunta => (
            <SpeedDialAction
              key={pregunta.id}
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
              }}
              icon={
                <Typography
                  sx={{
                    textAlign: 'center',
                    textWrap: 'nowrap',
                  }}
                  variant="body1">
                  {pregunta.name}
                </Typography>
              }
              onClick={event => {
                event.stopPropagation();
                traerMasPreguntas(pregunta.id);
              }}
            />
          ))}
          {preguntaSeleccionada.respuesta && (
            <SpeedDialAction
              sx={{
                bgcolor: 'white',
                color: '#093C59',
                maxWidth: '500px',
                width: 'fit-content',
                height: 'fit-content',
                borderRadius: '6px',
                padding: '5px 8px',
                textTransform: 'none',
                alignSelf: 'flex-end',
              }}
              icon={
                <Typography
                  sx={{
                    textAlign: 'center',
                    textWrap: 'nowrap',
                    fontSize: '25px',
                    fontWeight: 600,
                  }}
                  variant="body1">
                  {preguntaSeleccionada.respuesta}
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
