//Importacion de configuracion
import { Routes, Route } from 'react-router-dom';

//Importacion de elementos
import Home from './pages/home';
import AccountCenter from './pages/account-center';

//Creacion del elemento de rutas
function App(){
	return (
		<Routes>
			{ /*Rutas*/ }
			<Route path="/" element={ <Home /> } />
			<Route path="/account-center" element={ <AccountCenter /> } />
		</Routes>
	)
}

export default App;