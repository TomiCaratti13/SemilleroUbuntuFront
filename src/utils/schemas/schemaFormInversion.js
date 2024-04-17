import * as yup from 'yup';

const formInversion = yup.object().shape({
  nombre: yup
    .string()
    .min(5, 'El título debe tener al menos 5 caracteres')
    .required('Este campo es obligatorio'),
  categoria: yup.number().required('Este campo es obligatorio'),
  subcategoria: yup
    .string()
    .min(5, 'El título debe tener al menos 5 caracteres'),
  pais: yup.number().required('Este campo es obligatorio'),
  provincia: yup.number().required('Este campo es obligatorio'),
  ciudad: yup
    .string()
    .min(3, 'La ciudad debe tener al menos 3 caracteres')
    .required('Este campo es obligatorio'),
  descripcion: yup
    .string()
    .min(5, 'La descripción debe tener al menos 5 caracteres')
    .max(300, 'La descripción debe tener como máximo 300 caracteres')
    .required('Debes escribir una descripción'),
  masInfo: yup
    .string()
    .min(5, 'La descripción debe tener al menos 5 caracteres')
    .max(300, 'La descripción debe tener como máximo 300 caracteres')
    .required('Debes escribir mas información sobre tu microemprendimiento'),
});

export default formInversion;