import { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Collapse,
  Button,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { SliderSwipper } from './SliderSwipper';
import { agregarVisualizacion } from '../utils/services/axiosConfig';

const ExpandMoreInfo = styled(props => {
  const { expand, ...other } = props;
  return <Button {...other} />;
})(({ theme }) => ({
  margin: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CardPublicacion({ publicacion }) {
  const [expanded, setExpanded] = useState(false);
  
  //hasSee es para saber si ya se vio la publicacion y no agregar de nuevo
  const [hasSee, setHasSee] = useState(false);
  const handleExpandClick = () => {
    if (!hasSee) {
      agregarVisualizacion(publicacion.id);
      setHasSee(true);
    }
    setExpanded(!expanded);
  };

  const descriptionSplit = publicacion.description.split('  ');

  return (
    <Card
      sx={{
        bgcolor: 'gris.claro',
        borderRadius: 4,
        padding: '16px 0px 8px 0px',
        boxShadow: 'none',
        width: '100%',
        maxWidth: '500px',
      }}>
      <Typography
        sx={{
          fontSize: '17px',
          fontFamily: 'Lato',
          fontWeight: 600,
          lineHeight: '25px',
          width: '100%',
          textAlign: 'left',
          marginBottom: '16px',
          marginLeft: '16px',
        }}>
        {publicacion.title}
      </Typography>
      <SliderSwipper
        imgs={[publicacion.img0, publicacion.img1, publicacion.img2]}
      />
      <CardContent style={{ paddingBottom: 0 }}>
        <Typography
          variant="body2"
          color="negro"
          sx={{ fontSize: '14px', fontFamily: 'Lato', fontWeight: 600 }}>
          {publicacion.date}
        </Typography>
        <Typography
          paragraph
          sx={{
            fontSize: '16px',
            fontFamily: 'Lato',
            fontWeight: 400,
            lineHeight: '20px',
            color: 'negro',
          }}>
          {descriptionSplit[0]}
        </Typography>
      </CardContent>
      <Collapse
        in={expanded}
        timeout="auto"
        unmountOnExit>
        <CardContent style={{ paddingTop: 0, paddingBottom: 0 }}>
          {descriptionSplit.slice(1).map((parrafo, index) => (
            <Typography
              key={index}
              paragraph
              sx={{
                fontSize: '16px',
                fontFamily: 'Lato',
                fontWeight: 400,
                lineHeight: '20px',
                color: 'negro',
              }}>
              {parrafo}
            </Typography>
          ))}
        </CardContent>
      </Collapse>
        <CardActions
        disableSpacing
        sx={{ padding: '0px 0 0 0' }}>
        <ExpandMoreInfo
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          color="azul"
          sx={{
            textTransform: 'none',
            fontFamily: 'Lato',
            fontWeight: 500,
            lineHeight: '20px',
            width: '152px',
            height: '40px',
          }}>
          {expanded ? 'Ver menos' : 'Ver más'}
        </ExpandMoreInfo>
      </CardActions>
    </Card>
  );
}
