import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#093C59',
    },
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
    nivel: {
      alto: '#bc1111',
      medio: '#b86b11',
      bajo: '#1d9129'
    },
  },
  typography: {
    fontFamily:'Lato',
    fontSize:14,
    fontWeightLight:100,
    fontWeightRegular:300,
    fontWeightMedium:400,
    fontWeightBold:700,
  },
});

export default theme;