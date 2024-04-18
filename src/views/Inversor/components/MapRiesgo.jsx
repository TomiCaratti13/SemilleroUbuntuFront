import CircleIcon from '@mui/icons-material/Circle';
import { Box, Typography } from '@mui/material';
import { capitalizeTrim } from '../../../utils/services/capitalize.js'

export const MapRiesgo = ({ riesgos }) => {
  return (
    <Box
      sx={{
        width: 'fit-content',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        m: '30px auto',
        p: '10px 32px',
        borderRadius: '100px',
        bgcolor: 'gris.claro',
      }}
    >
      <Typography
        sx={{
          // color: "white",
          fontSize: '14px',
          fontWeight: '600',
          ml: '4px'
        }}
      >
        Riesgo
      </Typography>
      {riesgos?.map((riesgo, index) => (
        <Typography
          key={index}
          sx={{
            fontSize: '14px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '3px',
            // color: "white",
          }}
        >
          <CircleIcon
            fontSize="s"
            sx={{
              p: 0,
              m: 0,
              color: riesgo.nombre === 'ALTO'
                ? 'nivel.alto'
                : (riesgo.nombre === 'MEDIO'
                  ? 'nivel.medio'
                  : (riesgo.nombre === 'BAJO'
                    ? 'nivel.bajo'
                    : null)),
            }}
          />
          {capitalizeTrim(riesgo.nombre)}
        </Typography>
      ))}
    </Box>
  )
}
