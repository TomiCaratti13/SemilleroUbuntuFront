import { useTheme } from '@emotion/react';
import { Avatar, Card, Box, Typography } from '@mui/material';

function CardCategoria({ title, img }) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        width: '328px',
        height: '64px',
        my: '16px',
        borderRadius: '16px',
        backgroundColor: 'gris.claro',
        boxShadow: 'none',
        gap: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Box
        sx={{
          width: '283px',
          height: '56px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Avatar
          src={img}
          sx={{
            width: '40px',
            height: '40px',
            border: `1px solid ${theme.palette.verde.main}`,
            '& img': {
              width: '28px',
              height: '28px',
            },
          }}
        />
        <Typography
          sx={{
            fontWeight: '700',
            fontSize: '16px',
            lineHeight: '25px',
            color: 'azul.main',
            ml: '8px',
            borderBottom: `1px solid ${theme.palette.verde.main}`,
          }}>
          {title}
        </Typography>
      </Box>
    </Card>
  );
}

export default CardCategoria;
