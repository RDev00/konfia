import DashboardLayout from '../../layouts/dashboard-layout';
import getCookie from '../../functions/getCookie';
import Header from '../../components/header';
import StoreSection from '../../components/store-section';
import getStoreData from '../../hooks/get-data.store';

import { useEffect, useState } from 'react';

import Icon from '@mdi/react';
import { mdiAccountCircle } from '@mdi/js';

export default function StoreDashboard(){
	const token = getCookie('token');
	if(!token) return window.location.href = "/store/login";
	const [ storename, setStorename ] = useState('usuario');
	const [ credits, setCredits ] = useState(null);
	const [ history, setHistory ] = useState(null);

	useEffect(() => {
		async function getData() {
			const storeData = await getStoreData();

			setHistory(storeData.store.historial);
			setStorename(storeData.store.username);
			setCredits(storeData.store.creditsactive);
		}

		getData();
	}, []);

	const goToProfile = () => { window.location.href = '/store/settings' };

	return (
		<DashboardLayout>
			{storename && credits && history ? (
			<>
				<Header>
					<button type="button" className="ml-auto ml-auto invert cursor-pointer" onClick={() => { goToProfile() }}>
						<Icon path={mdiAccountCircle} size={1.5} />
					</button>
				</Header>
				<main className="bg-white min-h-[100dvh] flex flex-col items-center justify-start py-5 w-full">
					<h1 className="text-2xl md:text-4xl text-sky-950 text-center"> ¡Bienvenido, {storename}! </h1>

					<section className="pt-10">
						<StoreSection credits={credits} history={history} />
					</section>
				</main>
			</>
			) : (
			<h1 className="text-4xl font-bold text-white fixed top-[50%] left-[50%] transform-[translate(-50%,-50%)]"> Cargando tus datos... </h1>
			)}
		</DashboardLayout>
	)
}