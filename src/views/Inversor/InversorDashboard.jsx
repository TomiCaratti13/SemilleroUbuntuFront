import { Typography, Box, Tab } from '@mui/material';
import { useEffect, useState } from 'react';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { DetalleInversion } from './components/DetalleInversion';
import { MapMicroInv } from './components/MapMicroInv';
import { getInversiones, getMicroemprendimientos, getRiesgos } from '../../utils/services/axiosConfig';
import { MapInversiones } from './components/MapInversiones';
import { MapRiesgo } from './components/MapRiesgo';
import { CalculoInversion } from './components/CalculoInversion';
import { useSelector } from 'react-redux';

export const InversorDashboard = () => {
  const [value, setValue] = useState('1');
  const [microemp, setMicroemp] = useState([]);
  const [inversion, setInversion] = useState([]);
  const [riesgo, setRiesgo] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const user = useSelector(state => state.user);

  useEffect(() => {

    getMicroemprendimientos().then(response => {
      // esto es si solo puede hacerse una inversion por microemprendimiento
      // const microemprendimientosFiltrados = response.filter(micro => !inversiones.some(inv => inv.microId === micro.id));
      // setMicroemp(microemprendimientosFiltrados);
      const microemprendimientos = response;
      setMicroemp(microemprendimientos);
    });

    getRiesgos().then(response => {
      const riesgos = response;
      setRiesgo(riesgos);
    });

    getInversiones(user?.id).then(response => {
      const inversiones = response;
      setInversion(inversiones);
    })

  }, [value, selectedCard]);

  const handleChange = (e, newValue) => {
    setSelectedCard(null);
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
          Inversiones
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
                  label="Invertir"
                  value="1"
                  sx={{
                    textTransform: 'none',
                    width: '164px',
                  }}
                />
                <Tab
                  label="Mis Inversiones"
                  value="2"
                  sx={{
                    textTransform: 'none',
                    width: '164px',
                  }}
                />
              </TabList>
            </Box>
            <TabPanel value={value}
              sx={{
                pt: value === '1' ? '39px' : 0,
              }}>
              {selectedCard === null
                ? ((value === '1' ?
                  (microemp?.map((micro, index) => (
                    <MapMicroInv
                      key={index}
                      microemprendimiento={micro}
                      onClick={() => setSelectedCard(micro)} />
                  ))) :
                  (<>
                    <MapRiesgo riesgos={riesgo}/>
                    {inversion?.map((inv, index) => (
                      <MapInversiones
                        key={index}
                        inversion={inv}
                        onClick={() => setSelectedCard(inv)} />
                    ))}
                  </>)
                )) :
                ((value === '1' ?
                  (<CalculoInversion
                    setSelectedCard={setSelectedCard}
                    setValue={setValue}
                    idMicro={selectedCard?.id}
                    tituloMic={selectedCard?.nombre}
                    // card={selectedCard}
                    riesgo={riesgo}
                    idUser={user?.id}
                  />) :
                  (<DetalleInversion
                    setSelectedCard={setSelectedCard}
                    inversion={selectedCard}
                  />)
                ))
              }
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </Box>
  )
}

