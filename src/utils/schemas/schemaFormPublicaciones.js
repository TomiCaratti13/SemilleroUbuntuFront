import * as yup from 'yup';

const formPublicaciones = yup.object().shape({
  titulo: yup
    .string()
    .min(5, 'El titulo debe tener al menos 5 caracteres')
    .required('Este campo es obligatorio'),
  contenido: yup
    .string()
    .min(5, 'El contenido debe tener al menos 5 caracteres')
    .max(2000, 'El contenido debe tener como máximo 2000 caracteres')
    .required('Debes escribir un contenido'),
});

export default formPublicaciones;