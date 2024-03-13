import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import App from './App.jsx';
import { store } from './redux/store.js';
import './assets/styles/index.css';
import { LandingPage } from './views/LandingPage.jsx';
import Login from './views/Login.jsx';
import { SectionPublicaciones } from './views/SectionPublicaciones.jsx';
import { SectionMicroemprendmientos } from './views/SectionMicroemprendimientos.jsx';
import { SectionFormularioContacto } from './views/SectionFormularioContacto.jsx';
// import { PruebaLogin } from './views/PruebaLogin.jsx';
import ScrollToTop from './utils/services/scrollToTop.js';
import { AdminDashboard } from './views/Admin/AdminDashboard.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route
            path="/"
            element={<App />}>
            <Route
              index
              element={<LandingPage />}
            />
            <Route
              path="login"
              element={<Login />}
            />
            <Route
              path="Admin"
              element={<AdminDashboard />}
            />
            {/* <Route
            path="PruebaLogin"
            element={<PruebaLogin />}
          /> */}
            <Route
              path="microemprendimientos/:categoryUrl"
              element={<SectionMicroemprendmientos />}
            />
            <Route
              path="publicaciones"
              element={<SectionPublicaciones />}
            />
            <Route
              path="formularioContacto/:id"
              element={<SectionFormularioContacto />}
            />
          </Route>
          <Route
            path="*"
            element={
              <Navigate
                replace
                to="/"
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
