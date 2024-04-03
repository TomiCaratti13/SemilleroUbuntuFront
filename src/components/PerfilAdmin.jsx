import { Avatar, Button, Popper, Fade } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { addUser } from '../utils/redux/userSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
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

  //Cerrar sesión
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const closeSesion = () => {
    dispatch(addUser({ nombre: '', foto: '', idAdmin: false }));
    localStorage.clear();
    //Preguntar por que navigate no funciona
    navigate(`/`);
    // window.location.href = '/';
  };

  return (
    <div>
      <Avatar
        {...(user.foto === ''
          ? stringAvatar(user.nombre)
          : { alt: user.nombre, src: user.foto })}
        onClick={handleClick}
        aria-describedby={id}
      />
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
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
