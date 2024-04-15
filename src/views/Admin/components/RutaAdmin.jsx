import { Navigate, useParams } from "react-router-dom"
import { useSelector } from 'react-redux';
import { serviceUser } from "../../../utils/services/serviceUser";

export const RutaAdmin = () => {
  const { token } = useParams();
  serviceUser({token});
  // const user = useSelector(state => state.user)

  return (
    <Navigate to='/Admin' />
  )
}
