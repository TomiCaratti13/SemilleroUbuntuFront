import React from 'react';
import CardPublicacion from '../components/CardPublicacion';
import microemprendimientos from '../utils/mocks/Microemprendimientos.json';
import publicaciones from '../utils/mocks/Publicaciones.json';
import Box from '@mui/material/Box';
import CardMicroemprendimiento from '../components/CardMicroemprendimiento';
import { Publicaciones } from './Publicaciones';
import { fontSize } from '@mui/system';


export const LandingPage = () => {
	return (
		<Box
			sx={{
				width: '100%',
				bgcolor: 'blanco.main',
				display: 'flex',
				flexWrap: 'wrap',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<div
				style={{ 
					backgroundImage: "url(/landing-page-background.jpeg)", 
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
					bgcolor: '#090909B2',  
					width: '415px', 
					height: '500px',
					paddingTop: '60px' }}
				id="inicio">
					<p
					style={{
						fontSize:'18px',
						paddingLeft:'16px', 
						paddingTop: '40px',
						color:'#FDFDFE',
						lineHeight:'24px',
						width:'328px',
						height:'24px',
					}}
					>
						FINANCIAMIENTO SOSTENIBLE
					</p>
					<p
					style={{
						fontSize:'28px',
						paddingLeft:'16px',
						paddingTop: '8px', 
						color:'#FDFDFE',
						lineHeight:'33px',
						width:'250px',
						height:'264px',
						fontWeight:'500'
					}}
					>
					Impulsamos el desarrollo de finanzas de impacto, liderando la transición hacia un modelo financiero sostenible
					</p>

			</div>
			<Publicaciones publicaciones={publicaciones} />
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
			<div
				style={{ paddingTop: '60px' }}
				id="microemprendimientos">
				microemprendimientos
			</div>
			<Publicaciones publicaciones={publicaciones} />
			<div
				style={{ paddingTop: '60px' }}
				id="publicaciones">
				Publicaciones
			</div>
			<Publicaciones publicaciones={publicaciones} />
		</Box>
	);
};
