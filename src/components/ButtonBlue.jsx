import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button } from '@mui/material';

export const ButtonBlue = ({ link, text, width = 'fitContent' }) => {
  //Me encantaria crear un tipo para width que pueda ser 'fitContent' o '100%'
  return (
    <Link
      to={link}
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textDecoration: 'none',
      }}>
      <Button
        sx={{
          width: { width },
          padding: '0 20px',
          height: '40px',
          my: '10px',
          justifyContent: 'space-evenly',
          borderRadius: '100px',
          color: 'blanco.main',
          backgroundColor: 'azul.main',
          textTransform: 'none',
          '&:hover': {
            backgroundColor: 'azul.main',
          },
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
    </Link>
  );
};
