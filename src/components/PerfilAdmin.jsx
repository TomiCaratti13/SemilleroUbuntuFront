import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";

export default function PerfilAdmin() {

  const user = useSelector((state) => state.user)

  return (
      <Avatar alt={user.nombre} src={user.foto} />
  )
}
