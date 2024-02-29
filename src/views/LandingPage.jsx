import React from 'react';
import CardMicroemprendimiento from '../components/CardMicroemprendimiento';
import { Button } from '@mui/material';
import data from '../utils/mocks/Microemprendimientos.json';

export const LandingPage = () => {
	return (
		<>
			<div>LandingPage</div>
			<h1>Ubuntu</h1>
			<Button
				variant="contained"
				sx={{ bgcolor: 'gestion.exito' }}>
				Hola soy un bton
			</Button>
			<CardMicroemprendimiento
				title={data.title}
				date={data.date}
				img0={data.img0}
				img1={data.img1}
				img2={data.img2}
				description={data.description}
			/>
			<p>aca tambien landing</p>
		</>
	);
};
