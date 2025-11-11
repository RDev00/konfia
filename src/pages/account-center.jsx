// Importacion de elementos
import LayoutSelector from '../layouts/layout-selector';
import FormSelectorLayout from '../components/forms/form-selector-layout';
import OptionButton from '../components/forms/option-button';

//Importacion de funciones
import getCookie from '../functions/getCookie';
import { useState } from 'react';

//Importacion de iconos
import Icon from '@mdi/react';
import { mdiAccount, mdiStorefrontOutline } from '@mdi/js';

export default function AccountCenter() {

	//Verifica si el usuario tiene token, si ya tiene token entonces retorna al inicio
	useState(() => {
		const token = getCookie('token');
		if(token) return window.location.href = '/';
	}, []);

	// Funcion para hacer redireccion
	const redirect = (link) => { window.location.href = link; };
	return (
		<LayoutSelector>
			<FormSelectorLayout>
				{ /* Opcion para seleccionar la tienda */ }
				<OptionButton text="Tienda" function={() => redirect('/store/login')}>
					<Icon path={mdiStorefrontOutline} size={4} />
				</OptionButton>
				{ /* Opcion para seleccionar el usuario */ }
				<OptionButton text="Usuario" function={() => redirect('/user/login')}>
					<Icon path={mdiAccount} size={4} />
				</OptionButton>

			</FormSelectorLayout>
		</LayoutSelector>
	)
}