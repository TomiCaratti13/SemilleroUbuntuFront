import { Box, Paper, Typography, Container } from '@mui/material';
import { ButtonBlue } from '../components/ButtonBlue';
import { FormInversorRol } from './Inversor/components/FormInversorRol';
import { useSelector } from 'react-redux';

const heroInversion = {
  category: 'INVERSIONES',
  title: 'Invertí sostenible',
  description:
    'Encontrá la inversión sostenible que mejor se ajuste a tus metas financieras',
  img: '/backgroundInversiones.webp',
};

const SectionInversiones = () => {

  const user = useSelector(state => state.user);

  return (
    <>
      <Box
        sx={{
          width: '100%',
          bgcolor: 'blanco.main',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '24px',
          mb: '22px',
        }}>
        <Paper
          elevation={0}
          sx={{
            width: '100%',
            height: '486px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'start',
            alignItems: 'center',
            backgroundImage: `linear-gradient(rgba(34, 34, 34, 0.7), rgba(34, 34, 34, 0.7)), url(${heroInversion.img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '0',
          }}>
          <Container
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: '24px',
              gap: '35px',
            }}>
            <Container
              sx={{
                mt: '88px',
                display: 'flex',
                flexDirection: 'column',
                padding: '0',
                gap: '16px',
              }}>
              <Typography
                sx={{
                  fontWeight: '400',
                  fontSize: '18px',
                  lineHeight: '24px',
                  textAlign: 'start',
                  color: 'blanco.main',
                }}>
                {heroInversion.category.toUpperCase()}
              </Typography>
              <Typography
                sx={{
                  width: '240px',
                  fontWeight: '500',
                  fontSize: '28px',
                  lineHeight: '33px',
                  textAlign: 'start',
                  color: 'blanco.main',
                }}>
                {heroInversion.title}
              </Typography>
              {heroInversion.description && (
                <Typography
                  sx={{
                    width: '240px',
                    fontWeight: '400',
                    fontSize: '24px',
                    lineHeight: '32px',
                    textAlign: 'start',
                    color: 'blanco.main',
                  }}>
                  {heroInversion.description}
                </Typography>
              )}
            </Container>
          </Container>
        </Paper>
      </Box>
      <ButtonBlue
        link={user.isAdmin ? '/Admin' : (user.isInversor ? '/Inversor' : '/login/Inversiones')}
        text={'Ingresar'}
        width='90%'
      />
      <Box
        sx={{
          width: '100%',
          maxWidth: '500px',
          mx: 'auto',
          padding: "12px 0 16px 0",
          gap: '8px',
        }}>
        <Box
          sx={{
            width: '242px',
            height: '48px',
            mx: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Typography
            sx={{
              color: 'azul.main',
              fontWeight: '700',
              fontSize: '22px',
              lineHeight: '25px',
              textAlign: 'center',
            }}>
            ¿Cómo ser Inversor?
          </Typography>
        </Box>
        <Typography
          sx={{
            mt: '8px',
            mb: '32px',
            px: '16px',
            fontSize: '18px',
            fontWeight: '400',
            lineHeight: '21px',
          }}>
          <b>Regístrarte</b> para empezar a invertir.
          Al hacerlo deberas esperar un <b>mail de confirmación</b> donde te dirá si tu perfil fue <b>dado de alta</b>.
          Una vez aceptado podras ingresar y acceder al dashboard para calcular, invertir y visualizar inversiones.
        </Typography>
        <FormInversorRol />
      </Box>
    </>
  )
}

export default SectionInversiones