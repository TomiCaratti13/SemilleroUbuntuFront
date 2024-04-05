// import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../redux/userSlice';

export const serviceUser = ({ token }) => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  //   const decodedToken = jwtDecode(token);
  //   // const decodedToken = JSON.parse(window.atob(token.split(".")[1]));
  //   localStorage.setItem('nombre', decodedToken.nombre);
  //   localStorage.setItem('foto', decodedToken.foto);
  //   localStorage.setItem('isAdmin', decodedToken.isAdmin);
  
  if (!user.isAdmin) {
    const decodedToken = jwtDecode(token);
  
    const UserRedux = {
      nombre: decodedToken.nombre,
      foto: decodedToken.foto,
      isAdmin: decodedToken.isAdmin,
    };
  
    dispatch(addUser(UserRedux));
    
    return UserRedux;
  } else {
    return user;
  }
};