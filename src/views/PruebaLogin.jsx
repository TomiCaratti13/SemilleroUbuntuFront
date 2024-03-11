import { useState, useEffect } from 'react';
import { gapi } from 'gapi-script';
import GoogleLogin from 'react-google-login';

// const enviarDatos = async (username, password) => {
//     try {
//       const response = await fetch('https://example.com/verify-admin', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password }),
//       });

//       if (response.ok) {
//         const data = await response.json();

//         if (data.isAdmin) {
//           // El usuario es un administrador, realizar acciones necesarias
//         } else {
//           // El usuario no es un administrador, mostrar mensaje de error
//         }
//       } else {
//         // Acceso no verificado, mostrar mensaje de error
//       }
//     } catch (error) {
//       console.error('Error al enviar los datos:', error);
//     }
//   };

//   const traerDatos = async () => {
//     try {
//       const response = await fetch('https://example.com/data-endpoint');

//       if (response.ok) {
//         const data = await response.json();

//         const id = data.id;
//         const imagen = data.imagen;
//         const nombre = data.nombre;

//         console.log('ID:', id);
//         console.log('Imagen:', imagen);
//         console.log('Nombre:', nombre);
//       } else {
//         console.error('Error al obtener los datos:', response.status);
//       }
//     } catch (error) {
//       console.error('Error al obtener los datos:', error);
//     }
//   };

const PruebaLogin = () => {
  const clientID =
    '403200765369-mc5tks9ap8vpt9qd637bjem75ef1s02p.apps.googleusercontent.com';
  const [user, setUser] = useState({});
  const [loggeIn, setLoggetInfo] = useState(false);

  const onSuccess = response => {
    setUser(response.profileObj);
    document.getElementsByClassName('btn').hidden = true;
  };
  
  const onFailure = response => {
    console.log('Something went wrong');
  };
  const handleLogout = () => {
    setUser({});
  };
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientID,
      });
    }
    gapi.load('client:auth2', start);
  });

  return (
    <div className="center">
      <h1>Login</h1>
      <div className="btn">
        <GoogleLogin
          clientId={clientID}
          onSuccess={onSuccess}
          onFailure={onFailure}
          buttonText="Continue  with Google"
          cookiePolicy={'single_host_origin'}
        />
      </div>
      <div class={user ? 'profile' : 'hidden'}>
        <img src={user.imageUrl} />
        <h3>{user.name}</h3>
      </div>
    </div>
  );
};

export { PruebaLogin };
