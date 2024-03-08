import { Avatar, Button, Typography } from "@mui/material"

function LoginButton(props) {
  return (
    <Button
      sx={{
        textTransform: 'none',
        color: 'blanco.main',
        backgroundColor: 'azul.main',
        width: '200px',
        height: '40px',
        borderRadius: '100px',
        mt: '-20px',
        justifyContent: 'space-evenly',
        '&:hover': {
          backgroundColor: '#004055',
        }
      }}
    >
      <Avatar
          src={props.avatar}
          sx={{
            backgroundColor: 'blanco.main',
            width: '24px',
            height: '24px',
            '& img': {
              width: '16px',
              height: '16px',
            },
          }}
        />
        <Typography
          sx={{
            fontWeight: '700',
            fontSize: '16px',
            lineHeight: '30px',
            textAlign: 'center',
          }}
        >
          {props.name}
        </Typography>
    </Button>
  )
}

export default LoginButton