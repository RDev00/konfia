//Importacion de configuracion
import { Routes, Route } from 'react-router-dom';

//Importacion de elementos
import Home from './pages/home';
import AccountCenter from './pages/account-center';
import StoreLogin from './pages/store/login';
import StoreRegister from './pages/store/register';
import UserLogin from './pages/user/login';
import UserRegister from './pages/user/register';

//Creacion del elemento de rutas
function App(){
	return (
		<Routes>
			{ /*Rutas*/ }
			<Route path="/" element={ <Home /> } />

			<Route path="/account-center" element={ <AccountCenter /> } />

			<Route path="/store/login" element={ <StoreLogin /> } />
			<Route path="/store/register" element={ <StoreRegister /> } />

			<Route path="/user/login" element={ <UserLogin /> } />
			<Route path="/user/register" element={ <UserRegister /> } />
		</Routes>
	)
}

export default App;