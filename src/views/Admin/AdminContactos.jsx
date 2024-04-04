import { Typography, Box, Tab } from '@mui/material';
import { useEffect, useState } from 'react';

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { MapSolContactos } from './components/MapSolContactos';
import { DetalleContacto } from './components/DetalleContacto';
import { getContactos } from '../../utils/services/axiosConfig';

export const AdminContactos = () => {
  const [value, setValue] = useState('1');
  const [solContactos, setSolContactos] = useState([]);
  const [contactos, setContactos] = useState([]);
  const [selectedContacto, setSelectedContacto] = useState(null);

  //traerContactos
  useEffect(() => {
    getContactos().then(response => {
      const allContactos = response.data;
      setSolContactos(allContactos);
      if (value === '1') {
        setContactos(allContactos.filter(contacto => contacto.gestionado === true));
      } else if (value === '2') {
        setContactos(allContactos.filter(contacto => contacto.gestionado === false));
      }
    });
  }, [value, selectedContacto]);

  //Esto necesita el evento no borrar
  const handleChange = (event, newValue) => {
    setSelectedContacto(null);
    if (newValue === '1') {
      setContactos(
        solContactos.filter(contacto => contacto.gestionado === true)
      );
    } else if (newValue === '2') {
      setContactos(
        solContactos.filter(contacto => contacto.gestionado === false)
      );
    }
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        overflow: 'hidden',
        flexDirection: 'column',
        gap: '20px',
        width: '100%',
        height: '100%',
        paddingBottom: '30px',
      }}>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}>
        <Typography
          variant="h4"
          sx={{
            fontSize: '24px',
            lineHeight: '30px',
            fontWeight: 700,
            textAlign: 'center',
            width: '100%',
            pt: '30px',
          }}>
          Solicitudes de contacto
        </Typography>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabContext value={value}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                display: 'flex',
                justifyContent: 'center',
              }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                sx={{
                  width: 'fitContent',
                  display: 'flex',
                }}>
                <Tab
                  label="Gestionado"
                  value="1"
                  sx={{
                    textTransform: 'none',
                    width: '164px',
                  }}
                />
                <Tab
                  label="No Gestionado"
                  value="2"
                  sx={{
                    textTransform: 'none',
                    width: '164px',
                  }}
                />
              </TabList>
            </Box>
            <TabPanel value={value}>
              {selectedContacto === null ? (
                contactos.map((contacto, index) => (
                  <MapSolContactos
                    contacto={contacto}
                    key={index}
                    onClick={() => setSelectedContacto(contacto)}
                  />
                ))
              ) : (
                <DetalleContacto
                  //SetselectContacto y setVAlue es un pequeño drillProp
                  setSelectedContacto={setSelectedContacto}
                  setValue={setValue}
                  contacto={selectedContacto}
                />
              )}
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </Box>
  );
};
