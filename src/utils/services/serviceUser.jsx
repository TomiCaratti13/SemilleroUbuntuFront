// import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/userSlice';
import { store } from '../redux/store';

export const serviceUser = ({ token }) => {
  console.log(token);

  // const getCookie = () => {
  //   const token = Cookies.get('token');
  //   const decodedToken = jwtDecode(token);
  //   dispatch(addUser(decodedToken))
  // }
  // useEffect(()=>{ 
  //   getCookie();
  // }, []);

  const dispatch = useDispatch();
  const UserStorage = store.getState().user;

  if (UserStorage.nombre === '') {
    const decodedToken = jwtDecode(token);
    // const decodedToken = JSON.parse(window.atob(token.split(".")[1]));
    localStorage.setItem('nombre', decodedToken.nombre);
    localStorage.setItem('foto', decodedToken.foto);
    localStorage.setItem('isAdmin', decodedToken.isAdmin);

    const UserRedux = {
      nombre: decodedToken.nombre,
      foto: decodedToken.foto,
      isAdmin: decodedToken.isAdmin,
    };

    dispatch(addUser(decodedToken));
    
    return UserRedux;
  } else {
    return UserStorage;
  }
};