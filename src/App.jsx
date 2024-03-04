import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';
import Header from './views/Header';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <main>
        <Outlet />
      </main>
    </ThemeProvider>
  );
}

export default App;
