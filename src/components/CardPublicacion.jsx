import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { SliderSwipper } from './SliderSwipper';

const ExpandMore = styled(props => {
  const { expand, ...other } = props;
  return <Button {...other} />;
})(({ theme }) => ({
  margin: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CardPublicacion({
  title,
  date,
  img0,
  img1,
  img2,
  description,
}) {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const descriptionSplit = description.split('  ');
  return (
    <Card
      sx={{
        width: 328,
        bgcolor: 'gris.claro',
        borderRadius: 4,
        padding: '16px 0px 8px 0px',
        gap: '24px',
        boxShadow: 'none',
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
        {title}
      </Typography>
      <SliderSwipper imgs={[img0, img1, img2]} />
      <CardContent style={{ paddingBottom: 0 }}>
        <Typography
          variant="body2"
          color="negro"
          sx={{ fontSize: '14px', fontFamily: 'Lato', fontWeight: 600 }}>
          {date}
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
        <ExpandMore
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
        </ExpandMore>
      </CardActions>
    </Card>
  );
}
