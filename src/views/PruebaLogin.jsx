import { useState, useEffect } from 'react';
// import { gapi } from 'gapi-script';
// import GoogleLogin from 'react-google-login';

const ENDPOINT_TRAERADMIN = 'https://example.com/admin-endpoint';
const CLIENT_ID =
  '403200765369-mc5tks9ap8vpt9qd637bjem75ef1s02p.apps.googleusercontent.com';

const PruebaLogin = () => {
  const [user, setUser] = useState({});
  const [loggeIn, setLoggetInfo] = useState(false);

  const onSuccess = response => {
    setUser(response.profileObj);
    setLoggetInfo(true);
    console.log('Login Success:', response);
    console.log('AcessToken', response.accessToken);
    console.log('Objeto:', response.profileObj);
  };

  //////////////////////////////////

  const onFailure = response => {
    console.log('No pinto entrar mi pollo');
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: CLIENT_ID,
      });
    }
    gapi.load('client:auth2', start);
  });

  //////////////////////////////////////////

  const enviarDatos = async accessToken => {
    try {
      const response = await fetch(
        { ENDPOINT_TRAERADMIN },
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ accessToken }),
        }
      );

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }

      const data = await response.json();

      if (data.success) {
        console.log('Buen día señor admin');
      } else {
        console.log('No se pudo verificar al admin');
      }
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };

  return (
    <>
      <div className="center">
        <h1>Login</h1>
        <div className="btn">
          <GoogleLogin
            clientId={CLIENT_ID}
            onSuccess={onSuccess}
            onFailure={onFailure}
            buttonText="Continue  with Google"
            cookiePolicy={'single_host_origin'}
          />
        </div>
      </div>
      <div style={{display: loggeIn ? "block" : "hidden"}}>
        <img src={user.imageUrl} />
        <h3>{user.name}</h3>
      </div>
    </>
  );
};

export { PruebaLogin };
