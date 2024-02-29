import React from 'react';
import CardMicroemprendimiento from '../components/CardMicroemprendimiento';
import { Button } from '@mui/material';
import data from '../utils/mocks/Microemprendimientos.json';
import Box from '@mui/material/Box';
import { CONST_HEADER_HEIGHT } from './Header';

export const LandingPage = () => {
	console.log('CONST_HEADER_HEIGHT', CONST_HEADER_HEIGHT);
	return (
		<Box
			sx={{
				marginTop: CONST_HEADER_HEIGHT,
				width: '100%',
				bgcolor: 'gris.medio',
				display: 'flex',
				gap: '16px',
				padding: '16px 0px',
				flexWrap: 'wrap',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<CardMicroemprendimiento
				title={data.title}
				date={data.date}
				img0={data.img0}
				img1={data.img1}
				img2={data.img2}
				description={data.description}
			/>
			<CardMicroemprendimiento
				title={data.title}
				date={data.date}
				img0={data.img0}
				img1={data.img1}
				img2={data.img2}
				description={data.description}
			/>
			<CardMicroemprendimiento
				title={data.title}
				date={data.date}
				img0={data.img0}
				img1={data.img1}
				img2={data.img2}
				description={data.description}
			/>
			<CardMicroemprendimiento
				title={data.title}
				date={data.date}
				img0={data.img0}
				img1={data.img1}
				img2={data.img2}
				description={data.description}
			/>
		</Box>
	);
};
