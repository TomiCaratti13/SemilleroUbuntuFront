import React from 'react'
import { Link } from 'react-router-dom'

export const MostrarMicro = () => {
  return (
    <div>Preview
        <Link to="crear">Ir a crear</Link>
        <Link to="editar">Ir a Editar</Link>
    </div>
  )
}
