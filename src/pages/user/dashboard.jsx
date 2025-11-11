//Importacion de elementos
import DashboardLayout from '../../layouts/dashboard-layout';
import Header from '../../components/header';
import UserSection from '../../components/user-section';

//Importacion de funciones
import { useEffect, useState } from 'react';
import getCookie from '../../functions/getCookie';

//Importacion de hooks
import getUserData from '../../hooks/get-data.user';

//Importacion de iconos
import Icon from '@mdi/react';
import { mdiAccountCircle } from '@mdi/js';

export default function UserDashboard(){
	//obtenemos el token de usuario
	const token = getCookie('token');
	//Sino hay token regresamos al inicio
	if(!token) return window.location.href = "/";

	//declaramos la variable de datos de usuario
	const [ userData, setUserData ] = useState('');
	
	//Obtenemos los datos del usuario
	useEffect(() => {
		//Hacemos la funcion
		async function getData() {
			const res = await getUserData();
			setUserData(res.user);
		}

		//La ejecutamos
		getData();
	}, []);

	//Creamos la funcion para ir a la configuracion del perfil
	const goToProfile = () => { window.location.href = '/user/settings' }
	
	return (
		<DashboardLayout>
			{ /* Se verifica si hay datos de usuario */ }
			{ userData ? (
				<> { /* Si hay datos de usuario mostramos el dashboard */ }
					<Header>
						{ /* Boton para mandar a la configuracion del usuario */ }
						<button type="button" className="ml-auto ml-auto invert cursor-pointer" onClick={() => { goToProfile() }}>
							<Icon path={mdiAccountCircle} size={1.5} />
						</button>
					</Header>

					{ /* Mostamos el dashboard */ }
					<main className="bg-white min-h-[100dvh] flex flex-col items-center justify-start py-5 w-full">
						<h1 className="text-2xl md:text-4xl text-sky-950 text-center"> ¡Bienvenido, {userData.username}! </h1>
	
						<section className="pt-10">
							<UserSection UID={userData._id} history={userData.history} />
						</section>
					</main>
				</>
			) : (	
				<h1 className="text-xl md:text-4xl font-bold text-white fixed top-[50%] left-[50%] transform-[translate(-50%,-50%)] text-center"> Cargando tus datos... </h1>
			) }
		</DashboardLayout>
	)
}