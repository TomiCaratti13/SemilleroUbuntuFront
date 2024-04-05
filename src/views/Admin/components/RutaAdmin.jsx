import { Navigate, useParams } from "react-router-dom"
import { serviceUser } from "../../../utils/services/serviceUser";

export const RutaAdmin = () => {
  const { token } = useParams();
  serviceUser({token});

  return (
    <Navigate to='/Admin' />
  )
}
