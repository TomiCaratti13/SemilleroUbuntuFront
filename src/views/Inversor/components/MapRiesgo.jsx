import CircleIcon from '@mui/icons-material/Circle';
import { Box, Typography } from '@mui/material';

export const MapRiesgo = ({ riesgos }) => {

  const riesgoMap = riesgos;


  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        mx: 'auto',
        p: '3px 0'
      }}
    >
      <Typography
        sx={{
          fontSize: '14px',
          fontWeight: '600',
          ml: '8px'
        }}
      >
        Riesgo:
      </Typography>
      {riesgoMap.map((riesgo, index) => (
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
          {riesgo.nivel}:
          <CircleIcon
            fontSize="s"
            sx={{
              p: 0,
              m: 0,
              color: riesgo.nivel === 'alto'
                ? 'nivel.alto'
                : (riesgo.nivel === 'medio'
                  ? 'nivel.medio'
                  : (riesgo.nivel === 'bajo'
                    ? 'nivel.bajo'
                    : null)),
            }}
          />
        </Typography>
      ))}
    </Box>
  )
}
