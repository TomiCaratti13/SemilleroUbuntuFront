import { Box, Paper, Typography, List, ListItem, ListItemText, Container } from '@mui/material';
import { ButtonBlue } from '../components/ButtonBlue';

const heroInversion = {
  category: 'INVERSIONES',
  title: 'Invertí sostenible',
  description:
    'Explorá las categorías y encontrá la inversión sostenible que mejor se ajuste a tus metas financieras',
  img: '/backgroundInversiones.webp',
};

const SectionInversiones = () => {

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
              marginTop: '90px',
              display: 'flex',
              flexDirection: 'column',
              padding: '24px',
              gap: '35px',
            }}>
            <Container
              sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '0',
                gap: '18px',
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
      <Box
        sx={{
          width: '90%',
          maxWidth: '500px',
          mt: '12px',
          mx: 'auto',
          padding: "8px 16px 16px 16px",
          borderTop: '1px solid verde.main',
          borderBottom: '1px solid verde.main',
          gap: '8px',
        }}
      >
        <Box
          sx={{
            width: '242px',
            height: '48px',
            mx: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Typography
            sx={{
              color: 'azul.main',
              fontWeight: '700',
              fontSize: '22px',
              lineHeight: '25px',
              textAlign: 'center',
            }}
          >
            Sobre Invertir
          </Typography>
        </Box>
        <Typography
          sx={{
            fontSize: '16px',
            fontWeight: '400',
            lineHeight: '20px'
          }}
        >
          Debes iniciciar sesión para poder empezar a invertir.
          Una vez que ingreses podras acceder al dashboard.
          Podrás calcular, invertir y visualizar inversiones.
        </Typography>
      </Box>
      <ButtonBlue
        link={'/Inversor'}
        text={'Iniciar como Inversor'}
      />
    </>
  )
}

export default SectionInversiones