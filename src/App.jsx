import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';
import Header from './views/Header';
import { SnackbarProvider } from 'notistack';
import { CssBaseline } from '@mui/material';
import Chatbot from './components/chatbot/ChatBot';
import { useSelector } from 'react-redux';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={2000}
        hideOnMouseLeave={true}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <CssBaseline />
        <Header />
        <main>
          <Outlet />
        </main>
        {location.pathname.includes('/Admin') ? null : <Chatbot />}
      </SnackbarProvider>
    </ThemeProvider>
  );
}
