//Immportacion de configuracion
import { Routes, Route } from 'react-router-dom';

//Ejemplo de elementos
function Home() {
	return (
		<h1 className="text-red-500"> Hello, world! </h1>
	)
}
function Error() {
	return (
		<h1> Error example </h1>
	)
}

//Creacion del elemento de rutas rutas
function App(){
	return (
		<Routes>
			{ /*Ejemplo de rutas*/ }
			<Route path="/" element={ <Home /> } />
			<Route path="/*" element={ <Error /> } />
		</Routes>
	)
}

//Exportacion de la app
export default App;