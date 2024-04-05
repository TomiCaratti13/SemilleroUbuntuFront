import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AdminHeader from './Admin/AdminHeader';
import { useSelector } from 'react-redux';
import { HEADER_HEIGHT } from '../utils/services/constants';

const drawerWidth = 256;
const navItems = ['Inicio', 'Microemprendimientos', 'Publicaciones'];

function Header(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const user = useSelector(state => state.user);

  const handleDrawerToggle = () => {
    setMobileOpen(prevState => !prevState);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        bgcolor: 'azul.main',
        height: '100%',
        marginTop: HEADER_HEIGHT,
        display: 'flex',
      }}>
      <List
        sx={{
          height: '100%',
          width: '100%',
          padding: '20px 0',
        }}>
        <ListItem
          disablePadding
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <Box
            sx={{
              width: '100%',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}>
            {navItems.map(item => (
              <Link
                key={item}
                to={
                  item === 'Inicio'
                    ? '/'
                    : item === 'Microemprendimientos'
                    ? '/microemprendimientos/categorias'
                    : `/${item.toLowerCase()}`
                }
                style={{ textDecoration: 'none' }}>
                <ListItemText
                  sx={{
                    color: 'blanco.main',
                    fontFamily: 'Lato',
                    fontWeight: 700,
                    fontSize: '18px',
                    lineHeight: '20px',
                    width: '100%',
                    flexGrow: 0,
                    padding: '0 16px',
                  }}
                  primaryTypographyProps={{ variant: 'none' }}
                  primary={item}
                />
              </Link>
            ))}
          </Box>
          <Link
            to={user.isAdmin ? '/Admin' : '/login'}
            style={{
              width: '100%',
              textDecoration: 'none',
            }}>
            <ListItemText
              sx={{
                color: 'blanco.main',
                fontFamily: 'Lato',
                fontWeight: 700,
                fontSize: '18px',
                lineHeight: '20px',
                padding: '0px 16px',
              }}
              primaryTypographyProps={{ variant: 'none' }}
              primary="Administrador"
            />
          </Link>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return user.isAdmin === true && location.pathname.includes('/Admin') ? (
    <AdminHeader />
  ) : (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <AppBar
        component="nav"
        sx={{
          bgcolor: 'blanco.main',
          color: 'negro.main',
          boxShadow: 'none',
          height: HEADER_HEIGHT,
        }}>
        <Toolbar sx={{ display: 'flex' }}>
          {location.pathname === '/login' ? (
            <Link
              to="/"
              style={{
                textDecoration: 'none',
                color: 'inherit',
              }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{
                  mr: 0,
                  position: 'relative',
                  zIndex: 2,
                }}>
                <ArrowBackIcon />
              </IconButton>
            </Link>
          ) : (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                mr: 2,
                display: { lg: 'none' },
                position: 'relative',
                zIndex: 2,
              }}>
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          )}
          <Link
            to="/"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              height: HEADER_HEIGHT,
              width: '120px',
              left: '50%',
              top: 0,
              transform: 'translate(-50%,0)',
              zIndex: '0',
            }}>
            <img
              src="/UBUNTU.png"
              alt="UBUNTU Financiamiento Sostenible"
              style={{
                height: '100%',
                padding: '3px',
              }}
            />
          </Link>
          {location.pathname === '/login' ? null : (
            <Box
              sx={{
                display: { xs: 'none', lg: 'flex' },
                width: '100%',
                alignItems: 'center',
              }}>
              {navItems.map(item => (
                <Link
                  key={item}
                  to={
                    item === 'Inicio'
                      ? '/'
                      : item === 'Microemprendimientos'
                      ? '/microemprendimientos/categorias'
                      : `/${item.toLowerCase()}`
                  }
                  style={{ textDecoration: 'none' }}>
                  <Button
                    key={item}
                    variant="text"
                    sx={{
                      color: 'negro.main',
                      justifyContent: 'center',
                      margin: '5px',
                      fontFamily: 'Lato',
                      fontWeight: 700,
                      fontSize: '14px',
                      alignItems: 'flex-start',
                    }}>
                    {item}
                  </Button>
                </Link>
              ))}
              <Link
                to="/login"
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  justifyContent: 'flex-end',
                  display: 'flex',
                  flexGrow: 1,
                }}>
                <Button
                  variant="text"
                  sx={{
                    color: 'azul.main',
                    justifyContent: 'center',
                    margin: '5px',
                    fontFamily: 'Lato',
                    fontWeight: 700,
                    fontSize: '14px',
                    alignItems: 'flex-start',
                  }}>
                  Administrador
                </Button>
              </Link>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Box sx={{ display: 'block', height: HEADER_HEIGHT }} />
      {location.pathname === '/login' ? null : (
        <nav>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', lg: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
              zIndex: 1,
            }}>
            {drawer}
          </Drawer>
        </nav>
      )}
    </Box>
  );
}

export default Header;
