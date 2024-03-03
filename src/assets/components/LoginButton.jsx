import { Avatar, Chip, Typography } from "@mui/material"

function LoginButton(props) {
  return (
    <Chip
      component='button'
      sx={{
        color: 'blanco.main',
        backgroundColor: 'azul.main',
        width: '200px',
        height: '40px',
        borderRadius: '100px',
        mt: '-20px'
      }}
      avatar={
        <Avatar
          src={props.avatar}
          sx={{
            backgroundColor: 'blanco.main',
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
          {props.name}
        </Typography>
      }
    />
  )
}

export default LoginButton