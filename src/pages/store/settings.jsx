import { useRef, useState, useEffect } from 'react';

import DashboardLayout from '../../layouts/dashboard-layout';
import getStoreData from '../../hooks/get-data.store';
import logout from '../../functions/logout';
import getCookie from '../../functions/getCookie';
import Header from '../../components/header';
import SettingsOption from '../../components/settings-option';

import Icon from '@mdi/react';
import { mdiHomeCircle, mdiAccountCircle, mdiShieldEditOutline, mdiHelp, mdiBugOutline, mdiScaleBalance, mdiDeleteOutline, mdiLogout } from '@mdi/js';

export default function StoreSettings() {
	const [ storeData, setStoreData ] = useState(null);

	const goToDashboard = () => { window.location.href = '/store/dashboard' }
	
	useEffect(() => {
		async function getData(){
			const fetchStoreData = await getStoreData();

			setStoreData(fetchStoreData.store);
		}

		getData();

		const token = getCookie('token');
		if(!token) return window.location.href="/"
	});

	return (
		<DashboardLayout>
			<Header>
				<button type="button" className="ml-auto invert cursor-pointer" onClick={() => { goToDashboard() }}>
					<Icon path={mdiHomeCircle} size={1.5} />
				</button>
			</Header>

			<main className="bg-white min-h-[100dvh] flex flex-col items-center py-5">
				<section className="bg-gray-200	w-[90dvw] max-w-[500px] px-2 py-1 rounded-md flex items-center gap-2">
					<Icon path={mdiAccountCircle} size={"13%"} />
					<article>
						{storeData ? (
						<>
							<p className="text-xl md:text-2xl font-bold text-gray-900">
							{storeData.username}
							</p>
							<p className="text-xs md:text-sm text-gray-700 opacity-80">
								{storeData.storename}
							</p>
						</>
						) : (
						<p> Cargando... </p>
						)}
					</article>
				</section>

				<section className="bg-gray-200	w-[90dvw] max-w-[500px] py-2 rounded-md flex flex-col items-center mt-5">
					<SettingsOption icon={mdiShieldEditOutline} text="Cambiar contraseña" />
					<SettingsOption icon={mdiHelp} text="Acerca de" />
					<SettingsOption icon={mdiBugOutline} text="Informar un error" />
					<SettingsOption icon={mdiScaleBalance} text="Terminos y condiciones" />
					<SettingsOption icon={mdiDeleteOutline} text="Eliminar la cuenta" />

					<button className="mt-10 flex bg-blue-600 w-[90%] flex justify-center py-2 rounded-md cursor-pointer duration-300 hover:scale-105 hover:brightness-80" onClick={() => logout()}>
						<div className="flex gap-1 items-center invert">
							<Icon path={mdiLogout} size={1} />
							<p className="text-lg"> Cerrar sesion </p>
						</div>
					</button>
				</section>
			</main>
		</DashboardLayout>
	)
}