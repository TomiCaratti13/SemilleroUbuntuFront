import React from 'react';
import CardPublicacion from '../components/CardPublicacion';
import microemprendimientos from '../utils/mocks/Microemprendimientos.json';
import publicaciones from '../utils/mocks/Publicaciones.json';
import Box from '@mui/material/Box';
import CardMicroemprendimiento from '../components/CardMicroemprendimiento';

export const LandingPage = () => {
	return (
		<Box
			id="inicio"
			sx={{
				// marginTop: CONST_HEADER_HEIGHT,
				width: '100%',
				bgcolor: 'gris.medio',
				display: 'flex',
				gap: '16px',
				padding: '16px 0px',
				flexWrap: 'wrap',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<h1>INICIO</h1>
			<CardPublicacion
				title={publicaciones.title}
				date={publicaciones.date}
				img0={publicaciones.img0}
				img1={publicaciones.img1}
				img2={publicaciones.img2}
				description={publicaciones.description}
			/>
			<CardMicroemprendimiento
				title={microemprendimientos.title}
				category={microemprendimientos.category}
				subcategory={microemprendimientos.subcategory}
				ubication={microemprendimientos.ubication}
				img0={microemprendimientos.img0}
				img1={microemprendimientos.img1}
				img2={microemprendimientos.img2}
				description={microemprendimientos.description}
				moreinfo={microemprendimientos.moreinfo}
			/>
			<div id="microemprendimientos">microemprendimientos</div>
			<div id="publicaciones">Publicaciones</div>
		</Box>
	);
};
