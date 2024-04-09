import { Typography, Box } from '@mui/material';
import { ButtonBlue } from '../../components/ButtonBlue';
import { useEffect, useState } from 'react';
import { MapMicroemprendimientos } from '../../components/MapMicroemprendmientos';
import { FormMicro } from './Microemprendimientos/FormMicro';

import microemprendmietosAPI from '../../utils/mocks/Microemprendimientos.json';
import { CardAdminMicros } from './Microemprendimientos/CardAdminMicros';

//Preguntar si meter esto en redux para hacer menos llamadas a la api
const Microemprendimientos = microemprendmietosAPI.map(microemprendimiento => {
  return {
    title: microemprendimiento.title,
    category: microemprendimiento.category,
    subcategory: microemprendimiento.subcategory,
    ubication: microemprendimiento.ubication,
    img0: microemprendimiento.img0,
    img1: microemprendimiento.img1,
    img2: microemprendimiento.img2,
    description: microemprendimiento.description,
    moreinfo: microemprendimiento.moreinfo,
    id: microemprendimiento.id,
  };
});

export const AdminMicroemprendimientos = () => {
  const [crear, setCrear] = useState(false);
  const [editar, setEditar] = useState([]);

  const handdleCrear = () => {
    setEditar([]);
    setCrear(true);
  };

  useEffect(() => {
    if (editar.length !== 0) {
      setCrear(true);
    }
  }, [editar]);

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
        onClick={() => setCrear(false)}
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
            <FormMicro microemprendimiento={editar} />
          </>
        ) : (
          <>
            <ButtonBlue
              text={'Crear Microemprendimiento'}
              width="100%"
              onClick={handdleCrear}
            />
            {Microemprendimientos.map((microemprendimiento, index) => (
              <CardAdminMicros
                key={index}
                microemprendimiento={microemprendimiento}
                setEditar={setEditar}
                handlePopper={handlePopper}
                isActive={activePopperId === microemprendimiento.id}
                isAdmin={true}
              />
            ))}
          </>
        )}
      </Box>
    </Box>
  );
};
