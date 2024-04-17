import { useDispatch } from 'react-redux';
import { clearToken } from '../redux/tokenSlice';
import { addUser } from '../redux/userSlice';

export const useLogout = () => {
  //Cerrar sesión
  function deleteAllCookies() {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf('=');
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
  }
  const dispatch = useDispatch();
  const closeSesion = () => {
    deleteAllCookies();
    dispatch(clearToken());
    dispatch(addUser({ nombre: '', foto: '', isAdmin: false }));
    localStorage.clear();
    window.location.href = `http://localhost:8080/logout`;
  };

  return closeSesion;
};
