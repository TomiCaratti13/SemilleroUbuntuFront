import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';
import Header from './views/Header';
import { SnackbarProvider } from 'notistack';
import { CssBaseline } from '@mui/material';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <CssBaseline />
        <Header />
        <main>
          <Outlet />
        </main>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
