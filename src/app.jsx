//Importacion de configuracion
import { Routes, Route } from 'react-router-dom';

//Importacion de elementos
import Home from './pages/home';
import ErrorPage from './pages/errorPage';

//Creacion del elemento de rutas rutas
function App(){
	return (
		<Routes>
			{ /*Ejemplo de rutas*/ }
			<Route path="/" element={ <Home /> } />
			<Route path="/*" element={ <ErrorPage /> } />
		</Routes>
	)
}

//Exportacion de la app
export default App;