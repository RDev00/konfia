//Importacion de configuracion
import { Routes, Route } from 'react-router-dom';

//Importacion de elementos
import Home from './pages/home';
import ErrorPage from './pages/errorPage';
import Dashboard from './pages/dashboard';
import Login from './pages/login'
import Register from './pages/register';

//Creacion del elemento de rutas rutas
function App(){
	return (
		<Routes>
			{ /*Ejemplo de rutas*/ }
			<Route path="/" element={ <Home /> } />
			<Route path="/dashboard" element={ <Dashboard /> } />
			<Route path="/*" element={ <ErrorPage /> } />
			<Route path="/Login" element={ <Login /> } />
			<Route path="/Register" element={ <Register /> } />
		</Routes>
	)
}

//Exportacion de la app
export default App;