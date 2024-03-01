import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import App from './App.jsx';
import './assets/styles/index.css';
import { LandingPage } from './views/LandingPage.jsx';
import { LoginPrueba } from './views/LoginPrueba.jsx';

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
						element={<LoginPrueba />}
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
