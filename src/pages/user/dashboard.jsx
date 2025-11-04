import DashboardLayout from '../../layouts/dashboard-layout';
import getCookie from '../../functions/getCookie';
import getUserData from '../../hooks/get-data.user';
import Header from '../../components/header';
import UserSection from '../../components/user-section';

import { useRef, useEffect, useState } from 'react';

import Icon from '@mdi/react';
import { mdiAccountCircle } from '@mdi/js';

export default function UserDashboard(){
	const token = getCookie('token');
	if(!token) return window.location.href = "/";

	const [ userData, setUserData ] = useState('');
	
	useEffect(() => {
		async function getData() {
			const res = await getUserData();
			setUserData(res.user);
		}

		getData();
	}, []);

	const goToProfile = () => { window.location.href = '/user/settings' }
	
	return (
		<DashboardLayout>
			{ userData ? (
				<>
					<Header>
						<button type="button" className="ml-auto ml-auto invert cursor-pointer" onClick={() => { goToProfile() }}>
							<Icon path={mdiAccountCircle} size={1.5} />
						</button>
					</Header>
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