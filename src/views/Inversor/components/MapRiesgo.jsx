import CircleIcon from '@mui/icons-material/Circle';
import { Box, Typography } from '@mui/material';

export const MapRiesgo = ({ riesgos }) => {


  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        mx: 'auto',
        p: '7px 0'
      }}
    >
      <Typography
        sx={{
          fontSize: '14px',
          fontWeight: '600',
          ml: '4px'
        }}
      >
        Riesgo:
      </Typography>
      {riesgos.map((riesgo, index) => (
        <Typography
          key={index}
          sx={{
            fontSize: '14px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
          }}
        >
          {riesgo.nombre.toLowerCase()}:
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
        </Typography>
      ))}
    </Box>
  )
}
