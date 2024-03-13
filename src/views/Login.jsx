import { Box, Grid, Paper, Typography } from '@mui/material';
import backgroundImage from '/fondoLogin.webp';
import logoLogin from '/logoLogin.png';
import avatarGoogle from '/avatarGoogle.png';
import LoginButton from '../components/LoginButton';
import { GOOGLE_AUTH } from '../utils/services/constants';
import { useDispatch } from 'react-redux';
import { setToken } from '../redux/tokenSlice';

export default function Login() {

  const linkToAdmin = () => {
    window.location.href = GOOGLE_AUTH;
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: 'calc(100vh - 56px)',
        overflowY: 'hidden',
        backgroundImage: `linear-gradient(rgba(34, 34, 34, 0.5), rgba(34, 34, 34, 0.5)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Paper
        elevation={10}
        sx={{
          width: '328px',
          height: '352px',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '24px',
        }}>
        <Grid
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '328px',
            height: '235px',
            pt: '16px',
            pb: '40px',
            gap: '8px',
          }}>
          <Typography
            sx={{
              fontWeight: '700',
              fontSize: '28px',
              lineHeight: '32px',
              textAlign: 'center',
              letterSpacing: '0em',
              width: '200px',
              height: '96px',
              py: '16px',
              mx: 'auto',
            }}>
            Ingreso
            <br />
            Administrador
          </Typography>
          <img
            src={logoLogin}
            width={33}
            height={75}
          />
        </Grid>
        <Grid
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '117px',
            pb: '32px',
          }}>
          <LoginButton
            onClick={linkToAdmin}
            name="Continuá con Google"
            avatar={avatarGoogle}
          />
        </Grid>
      </Paper>
    </Box>
  );
}

