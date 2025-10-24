import DashboardLayout from '../../layouts/dashboard-layout';
import getCookie from '../../functions/getCookie';
import Header from '../../components/header';
import getStoreData from '../../hooks/get-data.store';

import { useEffect } from 'react';

import Icon from '@mdi/react';
import { mdiAccountCircle  } from '@mdi/js'
import { data } from 'react-router';

export default function StoreDashboard(){
	const token = getCookie('token');
	if(!token) return window.location.href = "/";

	useEffect(() => {
		async function getData() {
			const storeData = await getStoreData();

			return storeData
		}

		const data = getData();
	}, [])

	return (
		<DashboardLayout>
			<Header>
				<button type="button" className="ml-auto">
					<Icon path={mdiAccountCircle} size={1.5} />
				</button>
			</Header>
			<main className="bg-white min-h-[100dvh] flex flex-col items-center justify-start py-5">
				<h1 className="text-2xl text-sky-950"> Bienvenido {data.store.username} </h1>
			</main>
		</DashboardLayout>
	)
}