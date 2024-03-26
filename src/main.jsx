import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import App from './App.jsx';
import { store, persistor } from './utils/redux/store.js';
import './assets/styles/index.css';
import { LandingPage } from './views/LandingPage.jsx';
import Login from './views/Login.jsx';
import { SectionPublicaciones } from './views/SectionPublicaciones.jsx';
import { SectionMicroemprendmientos } from './views/SectionMicroemprendimientos.jsx';
import { SectionFormularioContacto } from './views/SectionFormularioContacto.jsx';
import ScrollToTop from './utils/services/scrollToTop.js';
import { AdminDashboard } from './views/Admin/AdminDashboard.jsx';
import { SectionBuscarMicroemprendimiento } from './views/SectionBuscarMicroemprendimiento.jsx';
import { AdminMicroemprendimientos } from './views/Admin/AdminMicroemprendimientos.jsx';
import { AdminContactos } from './views/Admin/AdminContactos.jsx';
import { AdminPublicaciones } from './views/Admin/AdminPublicaciones.jsx';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}>
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
                path="microemprendimientos/:categoryUrl"
                element={<SectionMicroemprendmientos />}
              />
              <Route
                path="publicaciones"
                element={<SectionPublicaciones />}
              />
              <Route
                path="formularioContacto/:nombre/:id"
                element={<SectionFormularioContacto />}
              />
              <Route
                path="buscar/:search"
                element={<SectionBuscarMicroemprendimiento />}
              />
              <Route
                path="Admin"
                element={<AdminDashboard />}
              />
              <Route
                path="Admin/microemprendimientos"
                element={<AdminMicroemprendimientos />}
              />
              <Route
                path="Admin/contactos"
                element={<AdminContactos />}
              />
              <Route
                path="Admin/publicaciones"
                element={<AdminPublicaciones />}
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
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
