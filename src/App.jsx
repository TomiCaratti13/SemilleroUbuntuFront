import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './assets/styles/App.css'

function App() {
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
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
