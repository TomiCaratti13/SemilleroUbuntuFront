import { Navigate, useNavigate, useParams } from "react-router-dom"
import { serviceUser } from "../../../utils/services/serviceUser";

export const RutaAdmin = () => {
  const navigate =useNavigate();

  const { token } = useParams();
  serviceUser({token});

  return (
    <Navigate to='/Admin' />
    // navigate('/Admin')
  )
}
