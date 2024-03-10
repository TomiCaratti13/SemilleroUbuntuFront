import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import App from './App.jsx';
import './assets/styles/index.css';
import { LandingPage } from './views/LandingPage.jsx';
import Login from './views/Login.jsx';
import { SectionPublicaciones } from './views/SectionPublicaciones.jsx';
import { SectionMicroemprendmientos } from './views/SectionMicroemprendimientos.jsx';
import { SectionFormularioContacto } from './views/SectionFormularioContacto.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
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
            path="microemprendimientos"
            element={<SectionMicroemprendmientos />}
          />
          <Route
            path="publicaciones"
            element={<SectionPublicaciones />}
          />
          <Route
            path="formularioContacto"
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
  </React.StrictMode>
);
