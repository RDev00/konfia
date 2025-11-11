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
import UserSettings from './pages/user/settings';
import Profile from './pages/user/profile';

//Creacion del elemento de rutas
function App(){
	return (
		<Routes>
			{ /*Rutas*/ }
			<Route path="/" element={ <Home /> } />

			{ /* Centro de cuentas */ }
			<Route path="/account-center" element={ <AccountCenter /> } />

			{ /* Todo el apartado de tienda:
			- /store/login: Inicio de sesion
			- /store/register: Registro de usuario
			- /store/dashboard: pagina de inicio (necesita token de usuario)
			- /store/settings: configuracion de la cuenta (necesita token de usuario) */ }
			<Route path="/store/login" element={ <StoreLogin /> } />
			<Route path="/store/register" element={ <StoreRegister /> } />
			<Route path="/store/dashboard" element={ <StoreDashboard /> } />
			<Route path="/store/settings" element={ <StoreSettings /> } />

			{ /* Es lo mismo que la seccion de tiendas, excepto la seccion de profile */ }
			<Route path="/user/login" element={ <UserLogin /> } />
			<Route path="/user/register" element={ <UserRegister /> } />
			<Route path="/user/dashboard" element={ <UserDashboard /> } />
			<Route path="/user/settings" element={ <UserSettings /> } />
			{ /* Seccion de perfil de usuario, accede a su ID con React params */ }
			<Route path="/user/profile/:userId" element={<Profile />} />

			<Route path="/*" element={ <ErrorPage /> } />
		</Routes>
	)
}

export default App;