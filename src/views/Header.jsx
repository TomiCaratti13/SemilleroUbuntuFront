import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

const drawerWidth = 240;
const navItems = ['Inicio', 'Microemprendimientos', 'Publicaciones'];
export const CONST_HEADER_HEIGHT = '56px';

function Header(props) {
	const { window } = props;
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen((prevState) => !prevState);
	};

	const drawer = (
		<Box
			onClick={handleDrawerToggle}
			sx={{
				bgcolor: 'azul.main',
				width: '100%',
				height: '100%',
				marginTop: CONST_HEADER_HEIGHT,
			}}>
			<List>
				{navItems.map((item) => (
					<ListItem
						key={item}
						disablePadding>
						<ListItemButton
							sx={{
								textTransform: 'none',
								textAlign: 'start',
								color: 'blanco.main',
								fontFamily: 'Lato',
								fontWeight: 700,
								fontSize: '24px',
							}}>
							<ListItemText primary={item} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);

	const container =
		window !== undefined ? () => window().document.body : undefined;

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar
				component="nav"
				//No se si tiene boxShadow el header, preguntar a diseño
				sx={{
					bgcolor: 'blanco.main',
					color: 'negro.main',
					boxShadow: 'none',
					height: { CONST_HEADER_HEIGHT },
				}}>
				<Toolbar sx={{ display: 'flex' }}>
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
					<Box
						sx={{
							flexGrow: 1,
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							position: 'absolute',
							width: '100%',
							height: '100%',
							left: 0,
							top: 0,
							zIndex: '0',
						}}>
						<img
							src="/UBUNTU.png"
							alt="UBUNTU Financiamiento Sostenible"
							style={{
								height: '100%',
								width: '100%',
								padding: '5px',
								objectFit: 'contain',
							}}
						/>
					</Box>
					<Box sx={{ display: { xs: 'none', lg: 'block' } }}>
						{navItems.map((item) => (
							<Button
								key={item}
								variant="outlined"
								sx={{
									color: 'negro.main',
									justifyContent: 'center',
									margin: '5px',
									fontFamily: 'Lato',
									fontWeight: 700,
									fontSize: '14px',
								}}>
								{item}
							</Button>
						))}
					</Box>
				</Toolbar>
			</AppBar>
			<nav>
				<Drawer
					container={container}
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
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
		</Box>
	);
}

export default Header;
