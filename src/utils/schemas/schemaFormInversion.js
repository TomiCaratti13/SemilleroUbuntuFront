import * as yup from 'yup';

const formInversion = yup.object().shape({
  monto: yup
    .number()
    // .min(200, 'Debe ser mayor a $100')
    // .max(100000, 'Debe ser menor a $100000')
    .required('Debes ingresar el monto a invertir'),
  // riesgo: yup
  //   .number()
  //   .positive('Debes seleccionar un nivel de riesgo'),
  costo: yup
    .number()
    .required('Debes generar una Inversión'),
  total: yup
    .number()
    .required('Debes generar una Inversión'),
  tasa: yup
    .number()
    .required('Generar Inversión'),
  retorno: yup
    .number()
    .required('Debes generar una Inversión'),
  ganancias: yup
    .number()
    .required('Debes generar una Inversión'),
  cuotas: yup
    .number()
    .required('Generar Inversión'),
  mensaje: yup
    .string()
    .required('Debes generar una Inversión'),
});

export default formInversion;