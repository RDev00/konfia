//Elementos
import Layout from '../layouts/layout';
import Header from '../components/header';
import Footer from '../components/footer';
import Button from '../components/button';
import HomeMain from '../components/home-main';

//Funciones
import getCookie from '../functions/getCookie';

export default function Home() {
	const redirect = () => {
		const cookie = getCookie('token');
		let link = "";

		if(cookie) {
			const link = localStorage.getItem('userType') || 'store';
			window.location.href = `${link}/dashboard`;
		}
			else { window.location.href = "/account-center" }
	}

	return (
		<Layout>
			<Header>
				<div className="ml-auto">
					<Button text="Ingresar" function={() => redirect()} />
				</div>
			</Header>

			<HomeMain />

			<Footer />
		</Layout>
	)
}