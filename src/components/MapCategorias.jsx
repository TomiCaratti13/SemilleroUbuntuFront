// import { useDispatch, useSelector } from 'react-redux';
// import CardCategoria from './CardCategoria';
// import { Container, Box } from '@mui/material';
// import { getCategorias } from '../utils/services/axiosConfig';
// import { useEffect } from 'react';

// export const MapCategorias = () => {

//   const category = useSelector(state => state.category);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     //async
//     const categoriasAPI = getCategorias();
//     const categoriasRedux = categoriasAPI?.map(rubros => {
//       return {
//         title: rubros.title,
//         identifier: rubros.identifier,
//         cantidad: rubros.cantidad,
//         img: rubros.img,
//         description: rubros.description,
//       };
//     })
//     dispatch(addCategory(categoriasRedux));
//     getPublicaciones();
//   },[])

//   return (
//   <Container
//     sx={{
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       flexDirection: 'column',
//       gap: '4px',
//     }}>
//     <Box>
//       {category.lista.map((categorias, index) => (
//         <CardCategoria
//           key={index}
//           title={categorias.title}
//           identifier={categorias.identifier}
//           img={categorias.img}
//         />
//       ))}
//     </Box>
//   </Container>
// )};

import CardCategoria from './CardCategoria';
import { Container, Box } from '@mui/material';

export const MapCategorias = ({ categorias }) => (

 
  <Container
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      gap: '4px',
    }}>
    <Box>
      {categorias.map((categorias, index) => (
        <CardCategoria
          key={index}
          title={categorias.title}
          identifier={categorias.identifier}
          img={categorias.img}
        />
      ))}
    </Box>
  </Container>
);
