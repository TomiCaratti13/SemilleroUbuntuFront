// import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/userSlice';
import { store } from '../redux/store';

export const serviceUser = ({ token }) => {

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
    const UserRedux = {
      nombre: decodedToken.nombre,
      foto: decodedToken.foto,
      isAdmin: decodedToken.isAdmin,
    };
    dispatch(addUser(UserRedux));
    return UserRedux;
  } else {
    return UserStorage;
  }
};