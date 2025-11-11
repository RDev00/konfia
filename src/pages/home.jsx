// Importacion de elementos
import Layout from '../layouts/layout';
import Header from '../components/header';
import Footer from '../components/footer';
import Button from '../components/button';
import HomeMain from '../components/home-main';

// Importacion de funciones
import getCookie from '../functions/getCookie';

export default function Home() {
	//Funcion para redirigir
	const redirect = () => {
		//Obtiene la cookie de usuario
		const cookie = getCookie('token');
		//Se crea la variable userType para poder seleccionar
		let userType = "";

		//Verifica si se obtuvo la cookie
		if(cookie) {
			//Si se obtuvo se obtiene el userType de localStorage, que seria: "user", sino obtiene nada, se toma como tienda
			const userType = localStorage.getItem('userType') || 'store';
			//Redirigimos al tipo de usuario seleccionado
			window.location.href = `${userType}/dashboard`;

			//Sino se obtiene la cookie, mandamos al usuario al centro de cuentas
		} else { window.location.href = "/account-center" }
	}

	return (
		<Layout>
			<Header>
				<div className="ml-auto">
					{ /* Boton de redireccion */ }
					<Button text="Ingresar" function={() => redirect()} />
				</div>
			</Header>

			<HomeMain />

			<Footer />
		</Layout>
	)
}