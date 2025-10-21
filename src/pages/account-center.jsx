import LayoutSelector from '../layouts/layout-selector';
import FormSelectorLayout from '../components/forms/form-selector-layout';
import OptionButton from '../components/forms/option-button';

import getCookie from '../functions/getCookie';
import { useState } from 'react';
import Icon from '@mdi/react';
import { mdiAccount, mdiStorefrontOutline } from '@mdi/js';

export default function AccountCenter() {
	useState(() => {
		const token = getCookie('token');
		if(token) return window.location.href = '/';
	}, []);

	const redirect = (link) => { window.location.href = link; };
	return (
		<LayoutSelector>
			<FormSelectorLayout>

				<OptionButton text="Tienda" function={() => redirect('/store/login')}>
					<Icon path={mdiStorefrontOutline} size={4} />
				</OptionButton>

				<OptionButton text="Usuario" function={() => redirect('/user/login')}>
					<Icon path={mdiAccount} size={4} />
				</OptionButton>

			</FormSelectorLayout>
		</LayoutSelector>
	)
}