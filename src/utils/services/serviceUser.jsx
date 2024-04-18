// import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../redux/userSlice';
import { setToken } from '../redux/tokenSlice';

export const serviceUser = ({ token }) => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  if (!user.isAdmin) {
    const decodedToken = jwtDecode(token);
  
    const UserRedux = {
      nombre: decodedToken.nombre,
      foto: decodedToken.foto,
      isAdmin: decodedToken.isAdmin,
    };
  
    dispatch(addUser(UserRedux));
    dispatch(setToken(token))
    
    return UserRedux;
  } else {
    return user;
  }
};