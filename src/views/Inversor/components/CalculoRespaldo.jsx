// import CircleIcon from '@mui/icons-material/Circle';
// import {
//   Typography,
//   Box,
//   Container,
//   TextField,
//   InputLabel,
//   MenuItem,
//   FormControl,
//   Select,
//   ListItemIcon,
//   Button,
// } from '@mui/material';
// import { AlertModal } from '../../../components/AlertModal';
// import { useAlertModal } from '../../../utils/hooks/useAlertModal';
// import { useFormik } from 'formik';
// import { getInversiones, putFormulario } from '../../../utils/services/axiosConfig';
// import { useEffect, useState } from 'react';
// import formInversion from '../../../utils/schemas/schemaFormInversion';

// const ButtonInversion = ({ onClick, text }) => {
//   return (
//     <Button
//       onClick={onClick}
//       sx={{
//         minWidth: '120px',
//         padding: '0 20px',
//         height: '34px',
//         borderRadius: '100px',
//         color: 'blanco.main',
//         backgroundColor: 'azul.main',
//         textTransform: 'none',
//         '&:hover': { backgroundColor: 'azul.main' },
//       }}>
//       <Typography
//         sx={{
//           fontWeight: '700',
//           fontSize: '16px',
//           lineHeight: '30px',
//           textAlign: 'center',
//         }}>
//         {text}
//       </Typography>
//     </Button>
//   )
// }
// // #region COMPONENTE
// export const CalculoRespaldo = ({ card, setSelectedCard, setValue, riesgo}) => {

//   const { nombre } = card;
//   const [calculo, setCalculo] = useState();

//   const calcular = () => {
//   // const calcular = (id, monto) => {
//     // getInversiones(id, monto).then(response => {
//       // const calculo = response;
//       const calculos = {
//         "costo": 9500,
//         "total": 99500,
//         "tasa": 1.2,
//         "retorno": 156600,
//         "ganancias": 57100,
//         "min_inv": 200,
//         "max_inv": 100000,
//         "cuotas": 3
//       }
//       setCalculo(calculos);
//     // });
//   }

//   useEffect(() => {
//     formik.setValues({
//       ...formik.values,
//       costosGestion: calculo?.costo || '',
//       totalAportar: calculo?.total || '',
//       cuotas: calculo?.cuotas || '',
//       retorno: calculo?.retorno || '',
//       ganancias: calculo?.ganancias || '',
//       mensaje: calculo
//         ? `Si decides optar por esta inversión, podrás empezar a cobrar a partir del próximo mes, durante ${calculo.cuotas} meses el monto de $${(calculo.ganancias / calculo.cuotas).toFixed(2)}`
//         : '',
//     });
//   }, [calculo])

//   const formik = useFormik({
//     initialValues: {
//       monto: '',
//       riesgo: '',
//       costosGestion: '',
//       totalAportar: '',
//       cuotas: '',
//       retorno: '',
//       ganancias: '',
//       mensaje: '',
//     },
//     validationSchema: formInversion,
//     onSubmit: formData => {
//       try {
//         formik.setSubmitting(true);
//         const formEnviar = {
//           descripcion: formData.mensaje,
//           usuarioSolicitante: {
//             nombre: formData.nombre,
//             email: formData.email,
//             telefono: formData.telefono,
//           },
//           gestionado: true,
//         };
//         putFormulario(formEnviar, card.id)
//           .then(response => {
//             // console.log('RESPUESTA COMPONENETE', response);
//             if (response && response.status === 200) {
//               openAlert(
//                 true,
//                 'Inversión creada con éxito');
//             } else {
//               openAlert(
//                 false,
//                 'Lo sentimos, No pudo realizarse la Inversión',
//                 'Por favor, volvé a intentarlo'
//               );
//             }
//           })
//           .catch(error => {
//             console.error('Error al enviar el formulario:', error);
//             openAlert(
//               false,
//               'Lo sentimos, No pudo realizarse la Inversión',
//               'Por favor, volvé a intentarlo'
//             );
//           });
//         formik.setSubmitting(false);
//       } catch (error) {
//         formik.setSubmitting(false);
//         console.log(error);
//       }
//     },
//   });

//   const [alertModal, openAlert, closeAlert, resendAlert] = useAlertModal(
//     formik.handleSubmit
//   );

//   // #region RETURN
//   return (
//     <>
//       <AlertModal
//         closeAlert={closeAlert}
//         resendAlert={resendAlert}
//         alert={alertModal}
//         setSelectedContacto={setSelectedCard}
//         setValue={setValue}
//       />
//       <Container
//         component='form'
//         onSubmit={formik.handleSubmit}
//         style={{
//           display: 'flex',
//           flexDirection: 'column',
//           gap: '16px',
//           width: '100%',
//           maxWidth: '600px',
//           margin: 'auto',
//         }}>
//         <Box
//           sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             gap: '8px',
//             width: '100%',
//             maxWidth: '600px',
//             margin: 'auto',
//           }}>
//           <Typography
//             sx={{
//               fontSize: '18px',
//               fontWeight: 700,
//               color: 'azul.main',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               gap: '4px',
//             }}>
//             <CircleIcon
//               fontSize='s'
//               sx={{ color: 'gris.medio' }}
//             />
//             {nombre}
//           </Typography>
//           <Typography
//             sx={{
//               fontSize: '16px',
//               fontWeight: 500,
//               textAlign: 'center',
//             }}>
//             Formulario Inversión
//           </Typography>
//           <Typography
//             sx={{
//               width: '100%',
//               fontSize: '12px',
//               fontWeight: 500,
//               lineHeight: '14px',
//               color: 'nivel.medio',
//             }}>
//             Ingrese el monto que desea aportar a {nombre} y luego seleccione un nivel de Riesgo de Inversión
//             para realizar lo cálculos. Si está de acuerdo, dé a Invertir.
//           </Typography>
//         </Box>
//         <TextField
//           // #region MONTO 
//           fullWidth
//           id='monto'
//           name='monto'
//           label='Monto a Aportar'
//           variant='outlined'
//           value={formik.values.monto}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           disabled={formik.isSubmitting}
//           error={formik.touched.nombre && Boolean(formik.errors.monto)}
//           helperText={formik.touched.nombre && formik.errors.nombre}
          
//         />
//         <FormControl>
//           <InputLabel id='select-label' sx={{ fontWeight: '400' }}>Riesgo Inversión</InputLabel>
//           <Select
//             // #region RIESGO
//             label='Riesgo Inversión'
//             labelId='select-label'
//             displayEmpty
//             defaultValue='0'
//             onChange={calcular}
//             sx={{
//               '& .MuiOutlinedInput-input': {
//                 display: 'flex',
//                 alignItems: 'center',
//               },
//               '& .MuiOutlinedInput-notchedOutline': {
//                 borderColor: '#090909',
//                 fontWeight: '400',
//               },
//               '& .MuiFormLabel-root': {
//                 color: theme =>
//                   formik.touched.nombre && formik.errors.nombre
//                     ? theme.palette.gestion.error
//                     : '#090909 !important',
//                 fontWeight: '400',
//               },
//               '& .MuiInputLabel-root.Mui-focused': {
//                 color: theme =>
//                   formik.touched.nombre && formik.errors.nombre
//                     ? theme.palette.gestion.error
//                     : `${theme.palette.primary.main} !important`,
//               },
//               '& .MuiFormHelperText-root': {
//                 color: theme =>
//                   formik.touched.nombre && formik.errors.nombre
//                     ? theme.palette.gestion.error
//                     : '#090909 !important',
//                 fontWeight: '400',
//               },
//               '& .Mui-disabled': {
//                 color: theme => `${theme.palette.primary.main} !important`,
//               },
//             }}
//             inputProps={{
//               id: 'uncontrolled-native',
//               sx: {
//                 '& .Mui-disabled': {
//                   WebkitTextFillColor: '#090909 !important',
//                 },
//               },
//             }}>
//             <MenuItem value='0'>
//               <ListItemIcon>
//                 <Typography
//                   sx={{
//                     fontWeight: '400',
//                   }}>
//                   Nivel de Riesgo
//                 </Typography>
//               </ListItemIcon>
//             </MenuItem>
//             {riesgo.map((riesgo, index) => (
//               <MenuItem
//                 key={index}
//                 value={riesgo.id}>
//                 <ListItemIcon>
//                   <CircleIcon
//                     fontSize='small'
//                     sx={{
//                       color: riesgo.nombre === 'ALTO' ?
//                         'nivel.alto'
//                         : (riesgo.nombre === 'MEDIO' ?
//                           'nivel.medio'
//                           : (riesgo.nombre === 'BAJO' ?
//                             'nivel.bajo'
//                             : null
//                           )
//                         ),
//                     }}
//                   />
//                   <Typography
//                     sx={{
//                       pl: '8px',
//                       lineHeight: '20px',
//                       fontWeight: '400',
//                     }}>
//                     {riesgo.nombre.charAt(0).toUpperCase() + riesgo.nombre.slice(1).toLowerCase()}
//                   </Typography>
//                 </ListItemIcon>
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//         <TextField
//           // #region COSTOS
//           fullWidth
//           id='costosGestion'
//           name='costosGestion'
//           label='Costos de Gestión'
//           variant='outlined'
//           value={formik.values.costosGestion}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           disabled={formik.isSubmitting}
//           error={formik.touched.email && Boolean(formik.errors.email)}
//           helperText={formik.touched.email && formik.errors.email}
//           sx={{
//             '& .MuiOutlinedInput-input': {
//               fontWeight: '400',
//             },
//             '& .MuiOutlinedInput-notchedOutline': {
//               borderColor: '#090909',
//             },

//             '& .MuiFormLabel-root': {
//               color: theme =>
//                 formik.touched.email && formik.errors.email
//                   ? theme.palette.gestion.error
//                   : '#090909 !important',
//               fontWeight: '400',
//             },

//             '& .MuiInputLabel-root.Mui-focused': {
//               color: theme =>
//                 formik.touched.email && formik.errors.email
//                   ? theme.palette.gestion.error
//                   : `${theme.palette.primary.main} !important`,
//             },

//             '& .MuiFormHelperText-root': {
//               color: theme =>
//                 formik.touched.email && formik.errors.email
//                   ? theme.palette.gestion.error
//                   : '#090909 !important',
//               fontWeight: '400',
//             },

//             '& .Mui-disabled': {
//               color: theme => `${theme.palette.primary.main} !important`,
//             },
//           }}
//           InputProps={{
//             sx: {
//               '& .Mui-disabled': {
//                 WebkitTextFillColor: '#090909 !important',
//               },
//             },
//           }}
//         />
//         <TextField
//           // #region APORTAR
//           fullWidth
//           id='totalAportar'
//           name='totalAportar'
//           label='Invesion Total'
//           variant='outlined'
//           value={formik.values.totalAportar}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           disabled={formik.isSubmitting}
//           error={formik.touched.telefono && Boolean(formik.errors.telefono)}
//           helperText={
//             formik.touched.telefono && formik.errors.telefono
//               ? formik.errors.telefono
//               : null
//           }
//           sx={{
//             '& .MuiOutlinedInput-input': {
//               fontWeight: '400',
//             },
//             '& .MuiOutlinedInput-notchedOutline': {
//               borderColor: '#090909',
//             },

//             '& .MuiFormLabel-root': {
//               color: theme =>
//                 formik.touched.telefono && formik.errors.telefono
//                   ? theme.palette.gestion.error
//                   : '#090909 !important',
//               fontWeight: '400',
//             },

//             '& .MuiInputLabel-root.Mui-focused': {
//               color: theme =>
//                 formik.touched.telefono && formik.errors.telefono
//                   ? theme.palette.gestion.error
//                   : `${theme.palette.primary.main} !important`,
//             },

//             '& .MuiFormHelperText-root': {
//               color: theme =>
//                 formik.touched.telefono && formik.errors.telefono
//                   ? theme.palette.gestion.error
//                   : '#090909 !important',
//               fontWeight: '400',
//             },

//             '& .Mui-disabled': {
//               color: theme => `${theme.palette.primary.main} !important`,
//             },
//           }}
//           InputProps={{
//             sx: {
//               '& .Mui-disabled': {
//                 WebkitTextFillColor: '#090909 !important',
//               },
//             },
//           }}
//         />
//         <TextField
//           // #region CUOTAS
//           fullWidth
//           id='cuotas'
//           name='cuotas'
//           label='Cuotas'
//           variant='outlined'
//           value={formik.values.cuotas}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           disabled={formik.isSubmitting}
//           error={formik.touched.telefono && Boolean(formik.errors.telefono)}
//           helperText={
//             formik.touched.telefono && formik.errors.telefono
//               ? formik.errors.telefono
//               : null
//           }
//           sx={{
//             '& .MuiOutlinedInput-input': {
//               fontWeight: '400',
//             },
//             '& .MuiOutlinedInput-notchedOutline': {
//               borderColor: '#090909',
//             },

//             '& .MuiFormLabel-root': {
//               color: theme =>
//                 formik.touched.telefono && formik.errors.telefono
//                   ? theme.palette.gestion.error
//                   : '#090909 !important',
//               fontWeight: '400',
//             },

//             '& .MuiInputLabel-root.Mui-focused': {
//               color: theme =>
//                 formik.touched.telefono && formik.errors.telefono
//                   ? theme.palette.gestion.error
//                   : `${theme.palette.primary.main} !important`,
//             },

//             '& .MuiFormHelperText-root': {
//               color: theme =>
//                 formik.touched.telefono && formik.errors.telefono
//                   ? theme.palette.gestion.error
//                   : '#090909 !important',
//               fontWeight: '400',
//             },

//             '& .Mui-disabled': {
//               color: theme => `${theme.palette.primary.main} !important`,
//             },
//           }}
//           InputProps={{
//             sx: {
//               '& .Mui-disabled': {
//                 WebkitTextFillColor: '#090909 !important',
//               },
//             },
//           }}
//         />
        // <TextField
        //   fullWidth
        //   id='cuotasFaltantes'
        //   name='cuotasFaltantes'
        //   label='Tasa de Retorno'
        //   variant='outlined'
        //   value={formik.values.cuotasFaltantes}
        //   onChange={formik.handleChange}
        //   onBlur={formik.handleBlur}
        //   disabled={formik.isSubmitting}
        //   error={formik.touched.telefono && Boolean(formik.errors.telefono)}
        //   helperText={
        //     formik.touched.telefono && formik.errors.telefono
        //       ? formik.errors.telefono
        //       : null
        //   }
        //   sx={{
        //     '& .MuiOutlinedInput-input': {
        //       fontWeight: '400',
        //     },
        //     '& .MuiOutlinedInput-notchedOutline': {
        //       borderColor: '#090909',
        //     },

        //     '& .MuiFormLabel-root': {
        //       color: theme =>
        //         formik.touched.telefono && formik.errors.telefono
        //           ? theme.palette.gestion.error
        //           : '#090909 !important',
        //       fontWeight: '400',
        //     },

        //     '& .MuiInputLabel-root.Mui-focused': {
        //       color: theme =>
        //         formik.touched.telefono && formik.errors.telefono
        //           ? theme.palette.gestion.error
        //           : `${theme.palette.primary.main} !important`,
        //     },

        //     '& .MuiFormHelperText-root': {
        //       color: theme =>
        //         formik.touched.telefono && formik.errors.telefono
        //           ? theme.palette.gestion.error
        //           : '#090909 !important',
        //       fontWeight: '400',
        //     },

        //     '& .Mui-disabled': {
        //       color: theme => `${theme.palette.primary.main} !important`,
        //     },
        //   }}
        //   InputProps={{
        //     sx: {
        //       '& .Mui-disabled': {
        //         WebkitTextFillColor: '#090909 !important',
        //       },
        //     },
        //   }}
        // />
        // <TextField
        //   // #region RETORNO
        //   fullWidth
        //   id='retorno'
        //   name='retorno'
        //   label='Retorno Esperado'
        //   variant='outlined'
        //   value={formik.values.retorno}
        //   onChange={formik.handleChange}
        //   onBlur={formik.handleBlur}
        //   disabled={formik.isSubmitting}
        //   error={formik.touched.telefono && Boolean(formik.errors.telefono)}
        //   helperText={
        //     formik.touched.telefono && formik.errors.telefono
        //       ? formik.errors.telefono
        //       : null
        //   }
        //   sx={{
        //     '& .MuiOutlinedInput-input': {
        //       fontWeight: '400',
        //     },
        //     '& .MuiOutlinedInput-notchedOutline': {
        //       borderColor: '#090909',
        //     },

        //     '& .MuiFormLabel-root': {
        //       color: theme =>
        //         formik.touched.telefono && formik.errors.telefono
        //           ? theme.palette.gestion.error
        //           : '#090909 !important',
        //       fontWeight: '400',
        //     },

        //     '& .MuiInputLabel-root.Mui-focused': {
        //       color: theme =>
        //         formik.touched.telefono && formik.errors.telefono
        //           ? theme.palette.gestion.error
        //           : `${theme.palette.primary.main} !important`,
        //     },

        //     '& .MuiFormHelperText-root': {
        //       color: theme =>
        //         formik.touched.telefono && formik.errors.telefono
        //           ? theme.palette.gestion.error
        //           : '#090909 !important',
        //       fontWeight: '400',
        //     },

        //     '& .Mui-disabled': {
        //       color: theme => `${theme.palette.primary.main} !important`,
        //     },
        //   }}
        //   InputProps={{
        //     sx: {
        //       '& .Mui-disabled': {
        //         WebkitTextFillColor: '#090909 !important',
        //       },
        //     },
        //   }}
        // />
        // <TextField
        //   // #region GANANCIAS
        //   fullWidth
        //   id='ganancias'
        //   name='ganancias'
        //   label='Ganancias Totales'
        //   variant='outlined'
        //   value={formik.values.ganancias}
        //   onChange={formik.handleChange}
        //   onBlur={formik.handleBlur}
        //   disabled={formik.isSubmitting}
        //   error={formik.touched.telefono && Boolean(formik.errors.telefono)}
        //   helperText={
        //     formik.touched.telefono && formik.errors.telefono
        //       ? formik.errors.telefono
        //       : null
        //   }
        //   sx={{
        //     '& .MuiOutlinedInput-input': {
        //       fontWeight: '400',
        //     },
        //     '& .MuiOutlinedInput-notchedOutline': {
        //       borderColor: '#090909',
        //     },

        //     '& .MuiFormLabel-root': {
        //       color: theme =>
        //         formik.touched.telefono && formik.errors.telefono
        //           ? theme.palette.gestion.error
        //           : '#090909 !important',
        //       fontWeight: '400',
        //     },

        //     '& .MuiInputLabel-root.Mui-focused': {
        //       color: theme =>
        //         formik.touched.telefono && formik.errors.telefono
        //           ? theme.palette.gestion.error
        //           : `${theme.palette.primary.main} !important`,
        //     },

        //     '& .MuiFormHelperText-root': {
        //       color: theme =>
        //         formik.touched.telefono && formik.errors.telefono
        //           ? theme.palette.gestion.error
        //           : '#090909 !important',
        //       fontWeight: '400',
        //     },

        //     '& .Mui-disabled': {
        //       color: theme => `${theme.palette.primary.main} !important`,
        //     },
        //   }}
        //   InputProps={{
        //     sx: {
        //       '& .Mui-disabled': {
        //         WebkitTextFillColor: '#090909 !important',
        //       },
        //     },
        //   }}
        // />
//         <Box>
//           <TextField
//             // #region DESCRIPCION
//             fullWidth
//             id='mensaje'
//             name='mensaje'
//             label='Descripción'
//             variant='outlined'
//             multiline
//             rows={4}
//             value={formik.values.mensaje}
//             inputProps={{
//               maxLength: 300,
//             }}
//             onChange={e => {
//               if (e.target.value.length <= 300) {
//                 setChars(e.target.value.length);
//                 formik.handleChange(e);
//               }
//             }}
//             onBlur={formik.handleBlur}
//             disabled={formik.isSubmitting}
//             error={formik.touched.mensaje && Boolean(formik.errors.mensaje)}
//             helperText={formik.touched.mensaje && formik.errors.mensaje}
//             sx={{
//               '& .MuiOutlinedInput-input': {
//                 fontWeight: '400',
//               },
//               '& .MuiOutlinedInput-notchedOutline': {
//                 borderColor: '#090909',
//               },

//               '& .MuiFormLabel-root': {
//                 color: theme =>
//                   formik.touched.mensaje && formik.errors.mensaje
//                     ? theme.palette.gestion.error
//                     : '#090909 !important',
//                 fontWeight: '400',
//               },

//               '& .MuiInputLabel-root.Mui-focused': {
//                 color: theme =>
//                   formik.touched.mensaje && formik.errors.mensaje
//                     ? theme.palette.gestion.error
//                     : `${theme.palette.primary.main} !important`,
//               },

//               '& .MuiFormHelperText-root': {
//                 color: theme =>
//                   formik.touched.mensaje && formik.errors.mensaje
//                     ? theme.palette.gestion.error
//                     : '#090909 !important',
//                 fontWeight: '400',
//               },

//               '& .Mui-disabled': {
//                 color: theme => `${theme.palette.primary.main} !important`,
//               },
//             }}
//             InputProps={{
//               sx: {
//                 '& .Mui-disabled': {
//                   WebkitTextFillColor: '#090909 !important',
//                 },
//               },
//             }}
//           />
//         </Box>
//         <Box
//           // #region BOTONES
//           sx={{
//             mt: '8px',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             gap: '12px'
//           }}
//         >
//           <ButtonInversion
//             text={'Volver'}
//             onClick={() => { setSelectedCard(null) }}
//           />
//           <ButtonInversion
//             text={'Invertir'}
//             onClick={() => { formik.handleSubmit() }}
//           />
//         </Box>
//       </Container >
//     </>
//   );
// };

import CircleIcon from '@mui/icons-material/Circle';
import {
  Typography,
  Box,
  Container,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  ListItemIcon,
  Button,
} from '@mui/material';
import { AlertModal } from '../../../components/AlertModal';
import { useAlertModal } from '../../../utils/hooks/useAlertModal';
import { useFormik } from 'formik';
import { getCalculo, putFormulario } from '../../../utils/services/axiosConfig';
import { useEffect, useState } from 'react';
import formInversion from '../../../utils/schemas/schemaFormInversion';

const ButtonInversion = ({ onClick, text }) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        minWidth: '120px',
        padding: '0 20px',
        height: '34px',
        borderRadius: '100px',
        color: 'blanco.main',
        backgroundColor: 'azul.main',
        textTransform: 'none',
        '&:hover': { backgroundColor: 'azul.main' },
      }}>
      <Typography
        sx={{
          fontWeight: '700',
          fontSize: '16px',
          lineHeight: '30px',
          textAlign: 'center',
        }}>
        {text}
      </Typography>
    </Button>
  )
}
// #region COMPONENTE
export const CalculoInversion = ({ card, setSelectedCard, setValue, riesgo }) => {

  const cardMap =  {
    idCard: card?.id,
    nombre: card?.nombre,
  };

  const [calculo, setCalculo] = useState();
  const [idCalculo, setIdCalculo] = useState();
  const [montoCalculo, setMontoCalculo] = useState();

  console.log(montoCalculo);

  const handleChangeMonto = (event) => {
    const { value } = event.target;
    const numberValue = parseInt(value.replace(/\D/g, ''), 10);
    setMontoCalculo(numberValue);
  };
  const handleChangeRiesgo = (event) => {
    const { value } = event.target;
    if (montoCalculo) {
      setIdCalculo(value);
    }
  };
  

  const calcular = () => {
    getCalculo(idCalculo, montoCalculo).then(response => {
      const calculo = response;
      setCalculo(calculo);
    });
  }

  useEffect(() => {
    if (idCalculo !== '0' && idCalculo !== undefined) {
      console.log('idCalculo !== 0 && idCalculo !== undefined');
      calcular();
    } else if (idCalculo === 0) {
      console.log('idCalculo === 0 ');
      setCalculo(null)
    }
  }, [idCalculo, montoCalculo]);

  useEffect(() => {
    if (calculo) {
      formik.setValues({
        ...formik.values,
        costosGestion: `$ ${calculo.costo}`,
        totalAportar: `$ ${calculo.total}`,
        cuotas: calculo.cuotas || '',
        tasa: calculo.tasa || '',
        retorno: `$ ${calculo.retorno}`,
        ganancias: `$ ${calculo.ganancias}`,
        min_inv: calculo.min_inv || '',
        max_inv: calculo.max_inv || '',
        mensaje: `Si decides optar por esta inversión, podrás empezar a cobrar a partir del próximo mes, durante ${calculo.cuotas} meses el monto de $${(calculo.ganancias / calculo.cuotas).toFixed(2)}`,
      });
    } else {
      formik.setValues({
        ...formik.values,
        costosGestion: '',
        totalAportar: '',
        cuotas: '',
        tasa: '',
        retorno: '',
        ganancias: '',
        min_inv: '',
        max_inv: '',
        mensaje: '',
      });
    }
  }, [calculo]);

  const formik = useFormik({
    initialValues: {
      monto: '$ ',
      costosGestion: '',
      totalAportar: '',
      cuotas: '',
      tasa: '',
      retorno: '',
      ganancias: '',
      min_inv: '',
      max_inv: '',
      mensaje: '',
    },
    validationSchema: formInversion,
    onSubmit: formData => {
      try {
        formik.setSubmitting(true);
        const formEnviar = {
          monto: formData.monto,
          costosGestion: formData.costosGestion,
          totalAportar: formData.totalAportar,
          cuotas: formData.cuotas,
          tasa: formData.tasa,
          retorno: formData.retorno,
          ganancias: formData.ganancias,
          min_inv: formData.min_inv,
          max_inv: formData.max_inv,
        };
        putFormulario(formEnviar, card.id)
          .then(response => {
            // console.log('RESPUESTA COMPONENETE', response);
            if (response && response.status === 200) {
              openAlert(
                true,
                'Inversión creada con éxito');
            } else {
              openAlert(
                false,
                'Lo sentimos, No pudo realizarse la Inversión',
                'Por favor, volvé a intentarlo'
              );
            }
          })
          .catch(error => {
            console.error('Error al enviar el formulario:', error);
            openAlert(
              false,
              'Lo sentimos, No pudo realizarse la Inversión',
              'Por favor, volvé a intentarlo'
            );
          });
        formik.setSubmitting(false);
      } catch (error) {
        formik.setSubmitting(false);
        console.log(error);
      }
    },
  });

  const [alertModal, openAlert, closeAlert, resendAlert] = useAlertModal(
    formik.handleSubmit
  );

  // #region RETURN
  return (
    <>
      <AlertModal
        closeAlert={closeAlert}
        resendAlert={resendAlert}
        alert={alertModal}
        setSelectedContacto={setSelectedCard}
        setValue={setValue}
      />
      <Container
        component='form'
        onSubmit={formik.handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '100%',
          maxWidth: '600px',
          margin: 'auto',
        }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            width: '100%',
            maxWidth: '600px',
            margin: 'auto',
          }}>
          <Typography
            sx={{
              fontSize: '18px',
              fontWeight: 700,
              color: 'azul.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
            }}>
            <CircleIcon
              fontSize='s'
              sx={{
                color: idCalculo === 3 ?
                  'nivel.alto'
                  : (idCalculo === 2 ?
                    'nivel.medio'
                    : (idCalculo === 1 ?
                      'nivel.bajo'
                      : 'gris.medio')),
              }}
            />
            {cardMap.nombre}
          </Typography>
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: 500,
              textAlign: 'center',
            }}>
            Formulario para Calcular y crear Inversión
          </Typography>
          <Typography
            sx={{
              width: '100%',
              fontSize: '13px',
              // fontWeight: 400,
              lineHeight: '14px',
              py: '6px',
              color: 'azul.main',
            }}>
            Ingrese el monto que desea invertir {cardMap.nombre} y luego seleccione un nivel de Riesgo de Inversión
            para realizar lo cálculos. Si está de acuerdo, dé a Invertir.
          </Typography>
        </Box>
        <TextField
          // #region MONTO 
          fullWidth
          id='monto'
          name='monto'
          label='Monto a Invertir'
          variant='outlined'
          value={formik.values.monto}
          onChange={(event) => {
            formik.handleChange(event);
            handleChangeMonto(event);
          }}
          onBlur={formik.handleBlur}
          disabled={formik.isSubmitting}
        />
        <FormControl>
          <InputLabel id='select-label' sx={{ fontWeight: '400' }}>Riesgo Inversión</InputLabel>
          <Select
            // #region RIESGO
            label='Riesgo Inversión'
            labelId='select-label'
            displayEmpty
            defaultValue={0}
            onChange={handleChangeRiesgo}
          >
            <MenuItem value={0}>
              <ListItemIcon>
                <Typography
                  sx={{
                    fontWeight: '400',
                  }}>
                  Nivel de Riesgo
                </Typography>
              </ListItemIcon>
            </MenuItem>
            {riesgo.map((riesgo, index) => (
              <MenuItem
                key={index}
                value={riesgo.id}>
                <ListItemIcon>
                  <CircleIcon
                    fontSize='small'
                    sx={{
                      color: riesgo.nombre === 'ALTO' ?
                        'nivel.alto'
                        : (riesgo.nombre === 'MEDIO' ?
                          'nivel.medio'
                          : (riesgo.nombre === 'BAJO' ?
                            'nivel.bajo'
                            : null)),
                    }}
                  />
                  <Typography
                    sx={{
                      pl: '8px',
                      lineHeight: '20px',
                      fontWeight: '400',
                    }}>
                    {riesgo.nombre.charAt(0).toUpperCase() + riesgo.nombre.slice(1).toLowerCase()}
                  </Typography>
                </ListItemIcon>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          // #region COSTOS
          fullWidth
          id='costosGestion'
          name='costosGestion'
          label='Costos de Gestión'
          variant='outlined'
          value={formik.values.costosGestion}
          disabled={formik.isSubmitting}
        />
        <TextField
          // #region APORTAR
          fullWidth
          id='totalAportar'
          name='totalAportar'
          label='Total a Aportar'
          variant='outlined'
          value={formik.values.totalAportar}
          disabled={formik.isSubmitting}
        />
        <TextField
          // #region CUOTAS
          fullWidth
          id='cuotas'
          name='cuotas'
          label='Cuotas'
          variant='outlined'
          value={formik.values.cuotas}
          disabled={formik.isSubmitting}
        />
        <TextField
          fullWidth
          id='tasa'
          name='tasa'
          label='Tasa de Retorno'
          variant='outlined'
          value={formik.values.tasa}
          disabled={formik.isSubmitting}
        />
        <TextField
          // #region RETORNO
          fullWidth
          id='retorno'
          name='retorno'
          label='Retorno Esperado'
          variant='outlined'
          value={formik.values.retorno}
          disabled={formik.isSubmitting}
        />
        <TextField
          // #region GANANCIAS
          fullWidth
          id='ganancias'
          name='ganancias'
          label='Ganancias Totales'
          variant='outlined'
          value={formik.values.ganancias}
          disabled={formik.isSubmitting}
        />
        <Box>
          <TextField
            // #region DESCRIPCION
            fullWidth
            id='mensaje'
            name='mensaje'
            label='Descripción'
            variant='outlined'
            multiline
            rows={3}
            value={formik.values.mensaje}
            disabled={formik.isSubmitting}
          />
        </Box>
        <Box
          // #region BOTONES
          sx={{
            mt: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px'
          }}
        >
          <ButtonInversion
            text={'Volver'}
            onClick={() => { setSelectedCard(null) }}
          />
          <ButtonInversion
            text={'Invertir'}
            onClick={() => { formik.handleSubmit() }}
          />
        </Box>
      </Container >
    </>
  );
};