import { useTheme } from '@emotion/react';
import { Avatar, Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function CardCategoria({ title, identifier, img }) {
  const theme = useTheme();

  return (
    <Link
      to={`/microemprendimientos/${identifier}`}
      style={{ textDecoration: 'none' }}>
      <Button
        sx={{
          width: '100%',
          padding: '20px',
          height: '64px',
          my: '16px',
          borderRadius: '16px',
          backgroundColor: 'gris.claro',
          boxShadow: 'none',
          gap: '10px',
          display: 'flex',
          justifyContent: 'start',
          textTransform: 'none',
          '&:hover': {
            backgroundColor: 'gris.medio',
          },
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
            textAlign: 'left',
          }}>
          {title}
        </Typography>
      </Button>
    </Link>
  );
}

export default CardCategoria;
