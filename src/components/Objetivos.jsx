import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { Box, useTheme } from "@mui/system"

function Objetivos() {

  const theme = useTheme();

  const textos = [
    "Facilitar a productores o microemprendedores el acceso a microcréditos que les permitan desarrollar sus iniciativas empresariales.",
    "Proporcionar financiación a empresas y organizaciones que ejecutan proyectos con objetivos sociales, ambientales y culturales.",
    "Ofrecer a potenciales inversores la oportunidad de participar en proyectos con impacto significativo."
  ];

  return (
    <Box
      sx={{
        width: '90%',
        maxWidth: '500px',
        mt: '12px',
        mx: 'auto',
        padding: "8px 16px 16px 16px",
        borderTop: `1px solid ${theme.palette.verde.main}`,
        borderBottom: `1px solid ${theme.palette.verde.main}`,
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
          Objetivos de Ubuntu
        </Typography>
      </Box>
      <List sx={{pb: 0}}>
        {textos.map((texto, index) => (
          <ListItem
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              p: 0,
              textWrap: "pretty",
              "&::before": {
                content: "'\\2022'",
                paddingRight: '8px',
                fontWeight: '600',
              }
            }}
          >
            <ListItemText
              primary={texto}
              primaryTypographyProps={{
                fontSize: '16px',
                fontWeight: '400',
                lineHeight: '20px'
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default Objetivos