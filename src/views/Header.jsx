import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link, useLocation } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const drawerWidth = 240;
const navItems = ['Inicio', 'Microemprendimientos', 'Publicaciones'];
export const CONST_HEADER_HEIGHT = '60px';

function Header(props) {
  // eslint-disable-next-line react/prop-types
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(prevState => !prevState);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        bgcolor: 'azul.main',
        height: '100%',
        marginTop: CONST_HEADER_HEIGHT,
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
                to={item === 'Inicio' ? '/' : `/${item.toLowerCase()}`}
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
            to="/login"
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

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          bgcolor: 'blanco.main',
          color: 'negro.main',
          boxShadow: 'none',
          height: CONST_HEADER_HEIGHT,
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
              height: '56px',
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
                  to={item === 'Inicio' ? '/' : `/${item.toLowerCase()}`}
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
      <Box sx={{ display: 'block', height: '56px' }} />
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
