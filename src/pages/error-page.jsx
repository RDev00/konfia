//Importacion de elementos
import Layout from '../layouts/layout';
import Header from '../components/header';
import Footer from '../components/footer';

export default function ErrorPage() {
	return (
		<Layout>
			<Header />
			<main className="bg-white h-[90dvh] flex flex-col justify-center items-center text-center">
				<h1 className="text-4xl md:text-6xl text-gray-800 font-bold"> Lo sentimos... </h1>
				<p className="text-base md:text-xl text-gray-800 opacity-80"> La pagina que buscabas no esta actualmente disponible </p>

				<a type="button" href="/" className="mt-5 bg-emerald-200 text-lg px-3 py-1 rounded-md text-gray-700 cursor-pointer duration-300 hover:brightness-90 hover:scale-105">
					Regresar al inicio
				</a>
			</main>
			<Footer />
		</Layout>
	)
}