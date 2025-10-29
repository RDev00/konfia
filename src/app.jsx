//Importacion de configuracion
import { Routes, Route } from 'react-router-dom';

//Importacion de elementos
import Home from './pages/home';
import ErrorPage from './pages/error-page';
import AccountCenter from './pages/account-center';

import StoreLogin from './pages/store/login';
import StoreRegister from './pages/store/register';
import StoreDashboard from './pages/store/dashboard';
import StoreSettings from './pages/store/settings';

import UserLogin from './pages/user/login';
import UserRegister from './pages/user/register';
import UserDashboard from './pages/user/dashboard';

//Creacion del elemento de rutas
function App(){
	return (
		<Routes>
			{ /*Rutas*/ }
			<Route path="/" element={ <Home /> } />

			<Route path="/account-center" element={ <AccountCenter /> } />

			<Route path="/store/login" element={ <StoreLogin /> } />
			<Route path="/store/register" element={ <StoreRegister /> } />
			<Route path="/store/dashboard" element={ <StoreDashboard /> } />
			<Route path="/store/settings" element={ <StoreSettings /> } />

			<Route path="/user/login" element={ <UserLogin /> } />
			<Route path="/user/register" element={ <UserRegister /> } />
			<Route path="/user/dashboard" element={ <UserDashboard /> } />

			<Route path="*" element={ <ErrorPage /> } />
		</Routes>
	)
}

export default App;