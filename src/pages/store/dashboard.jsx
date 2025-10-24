import DashboardLayout from '../../layouts/dashboard-layout';
import getCookie from '../../functions/getCookie';
import Header from '../../components/header';
import SectionFoldable from '../../components/section-foldable';
import getStoreData from '../../hooks/get-data.store';

import { useEffect, useState } from 'react';

import Icon from '@mdi/react';
import { mdiAccountCircle } from '@mdi/js';
import { data } from 'react-router';

export default function StoreDashboard(){
	const token = getCookie('token');
	if(!token) return window.location.href = "/";
	const [ storename, setStorename ] = useState('usuario');
	const [ clients, setClients ] = useState({});

	useEffect(() => {
		async function getData() {
			const storeData = await getStoreData();

			setStorename(storeData.store.username);
			setClients(storeData.store.clientsdata);
		}

		getData();
	}, []);
	return (
		<DashboardLayout>
			<Header>
				<button type="button" className="ml-auto">
					<Icon path={mdiAccountCircle} size={1.5} />
				</button>
			</Header>
			<main className="bg-white min-h-[100dvh] flex flex-col items-center justify-start py-5 w-full">
				<h1 className="text-2xl md:text-4xl text-sky-950 text-center"> ¡Bienvenido, {storename}! </h1>

				<section className="pt-10">
					{/* Obtener los clientes y separar las secciones */}
					<SectionFoldable text="Clientes" clients={clients} />
				</section>
			</main>
		</DashboardLayout>
	)
}