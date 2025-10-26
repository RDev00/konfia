import { useRef, useEffect } from 'react';
import getData from '../hooks/get-data.general';

export default function DashboardLayout(props) {
	const loadingScreen = useRef(null);

	useEffect(() => {
		async function verify(){
			return await getData();
		}

		const isAvaible = verify();

		if(isAvaible) {
			loadingScreen.current.classList.add('hidden');
			return;
		} else {
			alert("Ha ocurrido un error. Redirigiendote al inicio");
			window.location.href = "/";
		}
	}, [1]);

	return (
		<div className="bg-black min-h-[100dvh]">

			{/*Pantalla de carga*/}
			<div ref={loadingScreen} className="bg-black fixed h-[100dvh] w-[100dvw] z-1000 text-white text-center flex flex-col justify-center items-center gap-2 p-5">
				<h1 className="text-3xl md:text-6xl font-bold"> Cargando tus datos... </h1>
				<p className="opacity-80 text-sm md:text-lg"> Espera un momento en lo que cargamos tus datos, si llega a tardar mas de lo esperado reinicia la pagina o envianos un reporte </p>
			</div>

			{props.children}
		</div>
	)
}