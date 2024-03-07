import { Container, Typography } from "@mui/material"

function CardCategoria() {
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '4px',
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontSize: '16px',
          lineHeight: '25px',
          fontWeight: 600
          }}
      >
        Microemprendimientos Ubuntu
      </Typography>
      <Typography
        variant="h4"
        sx={{
          fontSize: '22px',
          lineHeight: '25px',
          fontWeight: 600
        }}
      >
        Categorias
      </Typography>

    </Container>
  )
}

export default CardCategoria