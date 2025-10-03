//Importacion de configuracion
import { Routes, Route } from 'react-router-dom';

//Importacion de elementos
import Home from './pages/home';

//Creacion del elemento de rutas rutas
function App(){
	return (
		<Routes>
			{ /*Ejemplo de rutas*/ }
			<Route path="/" element={ <Home /> } />
			<Route path="/*" element={ <h1> Error example </h1> } />
		</Routes>
	)
}

//Exportacion de la app
export default App;