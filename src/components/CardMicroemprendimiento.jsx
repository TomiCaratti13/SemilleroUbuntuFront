import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { SliderCard } from './SliderCard';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

const ExpandMore = styled((props) => {
	const { expand, ...other } = props;
	return <Button {...other} />;
})(({ theme }) => ({
	margin: 'auto',
	transition: theme.transitions.create('transform', {
		duration: theme.transitions.duration.shortest,
	}),
}));

export default function CardMicroemprendimiento({
	title,
	category,
	subcategory,
	ubication,
	img0,
	img1,
	img2,
	description,
	moreinfo,
}) {
	const [expanded, setExpanded] = useState(false);
	const handleExpandClick = () => {
		setExpanded(!expanded);
	};
	return (
		<Card
			sx={{
				width: 328,
				bgcolor: 'gris.claro',
				borderRadius: 4,
				padding: '16px 0px 8px 0px',
				gap: '24px',
			}}>
			<SliderCard imgs={[img0, img1, img2]} />
			<CardContent style={{ paddingBottom: 0 }}>
				<Typography
					gutterBottom
					sx={{
						fontSize: '18px',
						fontFamily: 'Lato',
						fontWeight: 600,
						margin: '0px',
						lineHeight: '25px',
					}}>
					{title}
				</Typography>
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
					{subcategory}
				</Typography>
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
					{category}
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
						width:"100%",
						height:"20px",
						display:"flex",
						alignItems:"center",
						margin:"16px 0"
					}}>
					<LocationOnOutlinedIcon/>{ubication}
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
							margin:"5px 0"
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
						{description}
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
							margin:"5px 0"
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
						{moreinfo}
					</Typography>
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
					{expanded ? (
						<ExpandLessIcon
							sx={{ width: '40px', height: '40px', aspectRatio: '1:1' }}
						/>
					) : (
						<ExpandMoreIcon
							sx={{ width: '40px', height: '40px', aspectRatio: '1:1' }}
						/>
					)}
				</ExpandMore>
			</CardActions>
		</Card>
	);
}
