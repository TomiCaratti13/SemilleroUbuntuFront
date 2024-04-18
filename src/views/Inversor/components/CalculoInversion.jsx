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

  const cardMap = {
    idCard: card?.id,
    nombre: card?.nombre,
  };

  const [calculo, setCalculo] = useState();
  const [idCalculo, setIdCalculo] = useState();
  const [montoCalculo, setMontoCalculo] = useState();

  const handleChangeMonto = (event) => {
    const { value } = event.target;
    const numberValue = parseInt(value.replace(/\D/g, ''), 10);
    setMontoCalculo(numberValue);
  };
  const handleChangeRiesgo = (event) => {
    const { value } = event.target;
    setIdCalculo(value);
  };

  const calcular = () => {
    getCalculo(idCalculo, montoCalculo).then(response => {
      const calculo = response;
      setCalculo(calculo);
    });
  }

  useEffect(() => {
    if (
      idCalculo !== '0' && idCalculo !== undefined
      && montoCalculo > 200 && montoCalculo < 100000
    ) {
      calcular();
    } else if (
      idCalculo === 0
    ) {
      setCalculo(null)
    }
  }, [idCalculo, montoCalculo]);

  useEffect(() => {
    formik.setValues({
      ...formik.values,
      costosGestion: calculo?.costo || '',
      totalAportar: calculo?.total || '',
      cuotas: calculo?.cuotas || '',
      tasa: calculo?.tasa || '',
      retorno: calculo?.retorno || '',
      ganancias: calculo?.ganancias || '',
      min_inv: calculo?.min_inv || '',
      max_inv: calculo?.max_inv || '',
      mensaje: calculo
        ? `Si decides optar por esta inversión, podrás empezar a cobrar a partir del próximo mes, durante ${calculo.cuotas} meses el monto de $${(calculo.ganancias / calculo.cuotas).toFixed(2)}`
        : '',
    });
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
            Formulario para crear Inversión
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
            Ingrese el monto a invertir en {cardMap.nombre} y luego seleccione un nivel de Riesgo de Inversión
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
        <Box
          // #region CUOTAS
          sx={{
            width: '100%',
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}
        >
          <TextField
            // #region TASA 
            fullWidth
            id='tasa'
            name='tasa'
            label='Tasa de Retorno'
            variant='outlined'
            value={formik.values.tasa}
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
        </Box>
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
            rows={4}
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