import { Typography, Box } from '@mui/material';
import { ButtonBlue } from '../../components/ButtonBlue';
import { useEffect, useState } from 'react';
import { FormMicro } from './Microemprendimientos/FormMicro';
import { CardAdminMicros } from './Microemprendimientos/CardAdminMicros';
import { VerMicro } from './Microemprendimientos/VerMicro';
import { serviceMicro } from '../../utils/services/serviceMicro';

export const AdminMicroemprendimientos = () => {
  const [crear, setCrear] = useState(false);
  const [editar, setEditar] = useState([]);
  const [ver, setVer] = useState([]);

  const [microemprendimientos, setMicroemprendimientos] = useState([]);

  const handdleCrear = () => {
    setVer([]);
    setEditar([]);
    setCrear(true);
  };

  useEffect(() => {
    //Llamo al servicio sin pasar por el hook
    serviceMicro().then(microemprendimientos => {
      setMicroemprendimientos(microemprendimientos);
    });
    if (editar.length !== 0) {
      setCrear(true);
      setVer([]);
    }
  }, [editar, crear]);

  const [activePopperId, setActivePopperId] = useState(null);

  const handlePopper = id => {
    setActivePopperId(activePopperId === id ? null : id);
  };
  return (
    <Box
      sx={{
        display: 'flex',
        overflow: 'hidden',
        flexDirection: 'column',
        gap: '16px',
        width: '100%',
        height: '100%',
        paddingBottom: '30px',
      }}>
      <Typography
        variant="h4"
        onClick={() => {
          setEditar([]);
          setCrear(false);
          setVer([]);
        }}
        sx={{
          fontSize: '28px',
          lineHeight: '35px',
          fontWeight: 700,
          textAlign: 'center',
          width: '100%',
          p: '30px 16px 0',
        }}>
        {crear
          ? editar.length !== 0
            ? 'Edición de Microemprendimiento'
            : 'Carga de Microemprendimiento'
          : 'Microemprendimientos'}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          overflow: 'hidden',
          flexDirection: 'column',
          gap: '20px',
          width: '100%',
          height: '100%',
          padding: '0 16px',
        }}>
        {crear ? (
          <>
            <Typography
              variant="h4"
              sx={{
                fontSize: '20px',
                lineHeight: '25px',
                fontWeight: 400,
                textAlign: 'center',
                width: '100%',
              }}>
              {editar.length !== 0
                ? 'Editá el formulario de carga del Microemprendmiento'
                : 'Completá los datos para crear un nuevo Microemprendimiento'}
            </Typography>
            <FormMicro
              microemprendimiento={editar}
              setCrear={setCrear}
              setEditar={setEditar}
            />
          </>
        ) : ver.length === 0 ? (
          <>
            <ButtonBlue
              text={'Crear Microemprendimiento'}
              width="100%"
              onClick={handdleCrear}
            />
            <Box
              sx={{
                display: 'flex',
                //Para ordenarlos de mas reciente a antiguo
                flexDirection: 'column-reverse',
                gap: '16px',
                width: '100%',
                height: '100%',
                padding: '0',
              }}>
              {microemprendimientos.map((microemprendimiento, index) => (
                <CardAdminMicros
                  key={index}
                  microemprendimiento={microemprendimiento}
                  setEditar={setEditar}
                  setVer={setVer}
                  handlePopper={handlePopper}
                  isActive={activePopperId === microemprendimiento.id}
                  isAdmin={true}
                  setCrear={setCrear}
                />
              ))}
            </Box>
          </>
        ) : (
          <VerMicro
            microemprendimiento={ver}
            setVer={setVer}
          />
        )}
      </Box>
    </Box>
  );
};
