import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { useEffect } from 'react';

export const ProtectedRouteInver = ({ children, redirectTo = '/' }) => {
  //Manejar alertasSnackbar
  const { enqueueSnackbar } = useSnackbar();
  const handleAlert = (mensaje, color) => {
    enqueueSnackbar(mensaje, {
      variant: color,
    });
  };

  const user = useSelector(state => state.user);

  useEffect(() => {
    if (!user.isInversor) {
      handleAlert('No tienes permisos para acceder a esta página', 'warning');
    }
  }, [user, handleAlert]);

  if (!user.isInversor) {
    return <Navigate to={redirectTo} />;
  }

  return children ? children : <Outlet />;
};