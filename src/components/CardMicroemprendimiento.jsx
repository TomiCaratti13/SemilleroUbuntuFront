import { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Collapse,
  Button,
  Typography,
  Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { SliderSwipper } from './SliderSwipper';
import { ButtonBlue } from './ButtonBlue';

const ExpandMoreInfo = styled(props => {
  const { expand, ...other } = props;
  return <Button {...other} />;
})(({ theme }) => ({
  margin: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CardMicroemprendimiento({ microemprendimiento }) {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card
      sx={{
        bgcolor: 'gris.claro',
        borderRadius: 4,
        padding: '16px 0px 8px 0px',
        boxShadow: 'none',
        maxWidth: '500px',
        width: '100%',
      }}>
      <SliderSwipper
        imgs={[
          microemprendimiento.img0,
          microemprendimiento.img1,
          microemprendimiento.img2,
        ]}
      />
      <CardContent
        style={{
          paddingBottom: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}>
        <Typography
          gutterBottom
          sx={{
            fontSize: '18px',
            fontFamily: 'Lato',
            fontWeight: 600,
            margin: '0px',
            lineHeight: '25px',
          }}>
          {microemprendimiento.title}
        </Typography>
        {microemprendimiento.subcategory && (
          <Typography
            variant="body2"
            color="negro"
            sx={{
              fontSize: '14px',
              fontFamily: 'Lato',
              lineHeight: '18px',
              fontWeight: 700,
              color: 'azul.main',
            }}>
            {microemprendimiento.subcategory}
          </Typography>
        )}
        <Typography
          paragraph
          sx={{
            fontSize: '13px',
            fontFamily: 'Lato',
            fontWeight: 400,
            lineHeight: '18px',
            color: 'negro',
            margin: '0',
          }}>
          {microemprendimiento.category}
        </Typography>
        <Typography
          paragraph
          sx={{
            fontSize: '14px',
            fontFamily: 'Lato',
            fontWeight: 400,
            lineHeight: '20px',
            color: 'negro',
            margin: '0',
            width: '100%',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            margin: '16px 0',
          }}>
          <LocationOnOutlinedIcon />
          {microemprendimiento.ubication}
        </Typography>
      </CardContent>
      <Collapse
        in={expanded}
        timeout="auto"
        unmountOnExit>
        <CardContent style={{ paddingTop: 0, paddingBottom: 0 }}>
          <Typography
            paragraph
            sx={{
              fontSize: '16px',
              fontFamily: 'Lato',
              fontWeight: 600,
              lineHeight: '25px',
              color: 'azul.main',
              margin: '5px 0',
            }}>
            Descripción del Microemprendimiento
          </Typography>
          <Typography
            paragraph
            sx={{
              fontSize: '16px',
              fontFamily: 'Lato',
              fontWeight: 400,
              lineHeight: '20px',
              color: 'negro',
              margin: '0',
            }}>
            {microemprendimiento.description}
          </Typography>
          <Divider sx={{ bgcolor: 'azul.main', margin: '16px 0' }} />
          <Typography
            paragraph
            sx={{
              fontSize: '16px',
              fontFamily: 'Lato',
              fontWeight: 600,
              lineHeight: '25px',
              color: 'azul.main',
              margin: '5px 0',
            }}>
            Más información de interés
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
            {microemprendimiento.moreinfo}
          </Typography>
          <ButtonBlue
            text="Contactar"
            link={`/formularioContacto/${microemprendimiento.title}`}
          />
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
          {expanded ? (
            <ExpandLess
              sx={{ width: '40px', height: '40px', aspectRatio: '1:1' }}
            />
          ) : (
            <ExpandMore
              sx={{ width: '40px', height: '40px', aspectRatio: '1:1' }}
            />
          )}
        </ExpandMoreInfo>
      </CardActions>
    </Card>
  );
}
