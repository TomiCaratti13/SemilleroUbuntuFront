// import { Avatar, Box, Chip, Grid, Paper, Typography } from '@mui/material'
// import backgroundImage from '../images/fondoLogin.jpeg'
// import avatarGoogle from '../images/avatarGoogle.png'
// import logoLogin from '../images/logoLogin.png'
// import theme from '../../theme/theme';

// function Login() {

//   const gooleLogin = () => { }

//   return (
//     <Box
//       sx={{
//         width: '100%',
//         height: '100vh',
//         backgroundImage: `linear-gradient(rgba(34, 34, 34, 0.5), rgba(34, 34, 34, 0.5)), url(${backgroundImage})`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}
//     >
//       <Paper
//         elevation={10}
//         sx={{
//           width: '328px',
//           height: '352px',
//           borderRadius: '8px',
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center',
//           alignItems: 'center',
//           gap: '24px',
//         }}
//       >
        {/* <Typography 
          variant="h1"
          sx={{ 
            fontWeight: '700',
            fontSize: '28px',
            lineHeight: '32px',
            textAlign: 'center'
          }}
        >
          Ingreso Administrador
        </Typography>
        <img src={logoLogin} width={33} height={75} alt="Logo" />
        
        <Chip
          component='button'
          // onClick={googleLogin}
          sx={{
            color: theme.palette.blanco.main,
            backgroundColor: theme.palette.azul.main,
            width: '200px',
            height: '40px',
            borderRadius: '100px',
          }}
          avatar={
            <Avatar
              src={avatarGoogle}
              sx={{
                backgroundColor: theme.palette.blanco.main
              }} />}
              label={
                <Typography
                  variant="body1"
                >
                  Continuar con Google
                </Typography>}
         /> */}
        {/* <Grid
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
          }}
        >
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
              borderRadius: '16px',
              gap: '24px',
            }}
          >
            Ingreso<br />Administrador
          </Typography>
          <img
            src={logoLogin}
            width={33}
            height={75}
          />
        </Grid >
        <Grid
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '117px',
            pb: '32px'
          }}
        >
          <Chip
            onClick={gooleLogin}
            component='button'
            sx={{
              color: theme.palette.blanco.main,
              backgroundColor: theme.palette.azul.main,
              width: '200px',
              height: '40px',
              borderRadius: '100px',
            }}
            avatar={
              <Avatar
                src={avatarGoogle}
                sx={{
                  backgroundColor: theme.palette.blanco.main,
                  width: '24px',
                  height: '24px',
                  '& img': {
                    width: 16,
                    height: 16,
                  },
                }}
              />
            }
            label={
              <Typography
                sx={{
                  fontWeight: '500',
                  fontSize: '16px',
                  lineHeight: '30px',
                  textAlign: 'center',
                  letterSpacing: '0em',
                  width: '140px',
                  height: '30px'
                }}
              >
                Continuá con Google
              </Typography>
            }
          />
        </Grid>
      </Paper>
    </Box>


  );
}

export default Login */}


// function Login() {
//   return (
//     <Box
//       sx={{
//         width: '100%',
//         height: '100vh',
//         backgroundImage: `linear-gradient(rgba(34, 34, 34, 0.5), rgba(34, 34, 34, 0.5)), url(${backgroundImage})`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}
//     >
//       <Paper
//         elevation={10}
//         sx={{
//           width: '328px',
//           height: '352px',
//           borderRadius: '8px',
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center',
//           alignItems: 'center',
//           gap: '24px',
//         }}
//       >
//         <Typographyvariant="h1" sx={{ fontWeight: '700', fontSize: '28px', lineHeight: '32px', textAlign: 'center' }}>Ingreso Administrador</Typography>
//         <img src={logoLogin} width={33} height={75} alt="Logo" />
//         <Chip
//           component='button'
//           onClick={googleLogin}
//           sx={{
//             color: theme.palette.blanco.main,
//             backgroundColor: theme.palette.azul.main,
//             width: '200px',
//             height: '40px',
//             borderRadius: '100px',
//           }}
//           avatar={<Avatar src={avatarGoogle} sx={{ backgroundColor: theme.palette.blanco.main }} />}
//           label={<Typography variant="body1">Continuar con Google</Typography>}
//         />
//       </Paper>
//     </Box>
//   );
// }

// export default Login;


import { Avatar, Box, Chip, Grid, Paper, Typography } from '@mui/material'
import backgroundImage from '../images/fondoLogin.jpeg'
import avatarGoogle from '../images/avatarGoogle.png'
import logoLogin from '../images/logoLogin.png'
import theme from '../../theme/theme';

function Login() {

  const gooleLogin = () => { }

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        backgroundImage: `linear-gradient(rgba(34, 34, 34, 0.5), rgba(34, 34, 34, 0.5)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
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
        }}
      >
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
          }}
        >
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
            }}
          >
            Ingreso<br />Administrador
          </Typography>
          <img
            src={logoLogin}
            width={33}
            height={75}
          />
        </Grid >
        <Grid
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '117px',
            pb: '32px'
          }}
        >
          <Chip
            component='button'
            // onClick={googleLogin}
            sx={{
              color: theme.palette.blanco.main,
              backgroundColor: theme.palette.azul.main,
              width: '200px',
              height: '40px',
              borderRadius: '100px',
              mt:'-20px'
            }}
            avatar={
              <Avatar
                src={avatarGoogle}
                sx={{
                  backgroundColor: theme.palette.blanco.main,
                  '& img': {
                    width: '16px',
                    height: '16px',
                  },
                }}
              />
            }
            label={
              <Typography
              sx={{
                fontWeight: '700',
                fontSize: '16px',
                lineHeight: '30px',
                textAlign: 'center',
                letterSpacing: '-0.02em',
              }}
              >
                Continuá con Google
              </Typography>
            }
          />
        </Grid>
      </Paper>
    </Box>


  );
}

export default Login
