import React from 'react';
import CardPublicacion from '../components/CardPublicacion';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export const Publicaciones = ({ publicaciones }) => {
	return (
		<Container
			component="section"
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexWrap: 'wrap',
				gap: '16px',
				paddingTop: '56px',
			}}>
			<Container
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
					gap: '4px',
				}}>
				<Typography
					variant="h4"
					sx={{ fontSize: '16px', lineHeight: '25px', fontWeight: 600 }}>
					Publicaciones
				</Typography>
				<Typography
					variant="h3"
					sx={{ fontSize: '22px', lineHeight: '25px', fontWeight: 600 }}>
					Finanzas con impacto
				</Typography>
			</Container>
			{publicaciones
				//Convertimos Date a fechas para poder ordenarlas
				.sort((a, b) => {
					const dateA = new Date(a.date.split('/').reverse().join('-'));
					const dateB = new Date(b.date.split('/').reverse().join('-'));
					return dateB - dateA;
				})
				.map((publicacion, index) => (
					<CardPublicacion
						key={index}
						title={publicacion.title}
						date={publicacion.date}
						img0={publicacion.img0}
						img1={publicacion.img1}
						img2={publicacion.img2}
						description={publicacion.description}
					/>
				))}
		</Container>
	);
};
