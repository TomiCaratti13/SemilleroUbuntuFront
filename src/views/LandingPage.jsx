import microemprendimientos from '../utils/mocks/Microemprendimientos.json';
import publicaciones from '../utils/mocks/Publicaciones.json';
import Box from '@mui/material/Box';
import CardMicroemprendimiento from '../components/CardMicroemprendimiento';
import { Publicaciones } from './Publicaciones';


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
				style={{ paddingTop: '60px' }}
				id="inicio">
				INICIO
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
