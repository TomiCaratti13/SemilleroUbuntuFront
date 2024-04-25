import { Navigate, useParams } from "react-router-dom"
import { serviceUser } from "../../../utils/services/serviceUser";
import { useSelector } from 'react-redux';

export const RutaAdmin = () => {
  const { token } = useParams();
  serviceUser({ token });
  const user = useSelector(state => state.user)

  return (user.isAdmin
    ? <Navigate to='/Admin' />
    : (user.isInversor
      ? <Navigate to='/Inversor' />
      : <Navigate to='/' />
    )
  )
}
