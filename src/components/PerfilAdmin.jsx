import { Avatar, Button, Popper, Fade } from '@mui/material';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { useLogout } from '../utils/hooks/useLogout';

export default function PerfilAdmin() {
  const user = useSelector(state => state.user);

  //Avatar
  const stringToColor = string => {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  };

  const stringAvatar = name => {
    let names = name.split(' ');
    let initials = names[0][0];

    if (names.length > 1) {
      initials += names[1][0];
    }

    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${initials}`,
    };
  };

  //Popper
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
    setOpen(previousOpen => !previousOpen);
  };
  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;

  ////Cerrar el popper si se hace clic fuera de él
  const popperRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (popperRef.current && !popperRef.current.contains(event.target)) {
        setOpen(false); // Cierra el Popper si se hace clic fuera de él
      }
    }
    // Agrega el evento de escucha al montar el componente
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Elimina el evento de escucha al desmontar el componente
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popperRef]);

  const closeSesion = useLogout();

  return (
    <div>
      <Avatar
        {...(!user.foto
          ? stringAvatar(user.nombre)
          : { alt: user.nombre, src: user.foto })}
        alt={user.nombre}
        onClick={handleClick}
        aria-describedby={id}
        sx={{
          cursor: 'pointer',
          width: '40px',
          height: '40px',
        }}
      />
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        ref={popperRef}
        sx={{
          zIndex: 1000,
        }}
        transition>
        {({ TransitionProps }) => (
          <Fade
            {...TransitionProps}
            timeout={350}>
            <Button
              sx={{
                p: '10px',
                m: 1,
                borderRadius: ' 0 0 4px 4px',
                bgcolor: 'gris.medio',
                fontWeight: 600,
                fontSize: '14px',
                lineHeight: '25px',
                textTransform: 'none',
                color: 'negro.main',
                '&:hover': {
                  bgcolor: 'gris.claro',
                },
              }}
              onClick={closeSesion}>
              Cerrar sesión
            </Button>
          </Fade>
        )}
      </Popper>
    </div>
  );
}
