//Importacion de configuracion
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './global.css';

//Importacion de elementos
import App from './app';

//Declaracion de variables
const root = document.getElementById('root');

//Creacion de funcion
createRoot(root).render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
)