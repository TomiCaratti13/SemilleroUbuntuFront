import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    azul: {
      main: '#093C59',
    },
    verde: {
      main: '#226516',
    },
    blanco: {
      main: '#fdfdfd'
    },
    negro: {
      main: '#090909'
    },
    gris: {
      claro: '#eaeaea',
      medio: '#d2d2d2',
      oscuro: '#6e6f70'
    },
    gestion: {
      exito: '#1d9129',
      nogestionada: '#b86b11',
      error: '#bc1111'
    },
  },
});

export default theme;