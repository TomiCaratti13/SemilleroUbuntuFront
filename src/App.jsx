import CardMicroemprendimiento from './components/CardMicroemprendimiento';
import data from '../src/utils/mocks/Microemprendimientos.json';
import { Button } from '@mui/material';

function App() {
	console.log(data.imgs);

	return (
		<>
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
		</>
	);
}

export default App;
