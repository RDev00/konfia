import { useRef, useState, useEffect } from 'react';

import DashboardLayout from '../../layouts/dashboard-layout';
import FoldableFormLayout from '../../components/forms/foldable-form-layout';
import Input from '../../components/forms/input';
import PasswordInput from '../../components/forms/password-input';
import getStoreData from '../../hooks/get-data.store';
import updateStore from '../../hooks/update.store';
import deleteStore from '../../hooks/delete.store';
import logout from '../../functions/logout';
import getCookie from '../../functions/getCookie';
import Header from '../../components/header';
import SettingsOption from '../../components/settings-option';

import Icon from '@mdi/react';
import { mdiHomeCircle, mdiAccountCircle, mdiShieldEditOutline, mdiHelp, mdiScaleBalance, mdiDeleteOutline, mdiLogout, mdiSquareEditOutline } from '@mdi/js';

export default function StoreSettings() {
	const [ storeData, setStoreData ] = useState(null);

	const usernameForm = useRef(null);
	const usernameFormSection	 = useRef(null);
	const [ usernameFormMessage, setUsernameFormMessage ] = useState("");

	const passwordForm = useRef(null);
	const passwordFormSection	 = useRef(null);
	const [ passwordFormMessage, setPasswordFormMessage ] = useState("");

	const deleteAccountForm = useRef(null);
	const deleteAccountFormSection = useRef(null);
	const [ deleteAccountFormMessage, setDeleteAccountFormMessage ] = useState('');

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

	const href = (link) => { window.location.href = link };

	const openFoldableForm = (form, section) => {
		const formCurrent = form.current;
		const sectionCurrent = section.current;

    sectionCurrent.classList.remove('hidden');
    formCurrent.classList.add('konfia-fold');
    formCurrent.classList.remove('konfia-hide');
	};

	const closeFoldableForm = (form, section) => {
		const formCurrent = form.current;
		const sectionCurrent = section.current;

    formCurrent.classList.add('konfia-hide');
    formCurrent.classList.remove('konfia-fold');
    setTimeout(() => {
      sectionCurrent.classList.add('hidden')
    }, 500)
	};

	const updateData = async() => {
		const fetchStoreData = await getStoreData();

		setStoreData(fetchStoreData);
	}

	const changeUsername = async(e) => {
		e.preventDefault();
		setUsernameFormMessage("")
		const form = usernameForm.current;

		const insertedUsername = form.querySelector('input[name="konfia-new-username"]');
		const insertedPassword = form.querySelector('input[name="konfia-password"]');

		if(insertedUsername !== storeData.username || !insertedUsername || !insertedPassword) {
			const res = await updateStore(insertedUsername.value, null, insertedPassword.value);
			setUsernameFormMessage(res.message);
			insertedUsername.value = "";
			insertedPassword.value = "";
			updateData();

			setTimeout(() => {
				closeFoldableForm(usernameForm, usernameFormSection);
			}, 200);
		} else {
			setUsernameFormMessage("El nombre debe ser uno diferente al que tienes actualmente");
		}
	};

	const changePassword = async(e) => {
		e.preventDefault();
		setPasswordFormMessage("");
		const form = passwordForm.current;

		const insertedNewPassword = form.querySelector('input[name="konfia-new-password"]');
		const insertedPassword = form.querySelector('input[name="konfia-password"]');

			if (insertedNewPassword && insertedPassword) {
				const res = await updateStore(null, insertedNewPassword.value, insertedPassword.value);
				setPasswordFormMessage(res.message);
				insertedNewPassword.value = "";
				insertedPassword.value = "";
				updateData();

				setTimeout(() => {
					closeFoldableForm(passwordForm, passwordFormSection);
				}, 200);
			} else {
				setPasswordFormMessage("No se ingresaron las contraseñas");
			}
	};


	const deleteAccount = async(e) => {
		e.preventDefault();
		setDeleteAccountFormMessage("");
		const form = deleteAccountForm.current;

		const insertedPassword = form.querySelector('input[name="konfia-password"]');

		if(insertedPassword){
			const res = await deleteStore(insertedPassword.value);
			setDeleteAccountFormMessage(res.message);

			if(!res.error || res.error === "No hay errores registrados") { logout(); }
		} else {
			setDeleteAccountFormMessage("No se ingreso la contraseña")
		}

	}

	return (
		<DashboardLayout>
			<Header>
				<button type="button" className="ml-auto cursor-pointer" onClick={() => { goToDashboard() }}>
					<Icon path={mdiHomeCircle} size={1.5} />
				</button>
			</Header>

			<main className="bg-white min-h-[100dvh] flex flex-col items-center py-5">
				<section className="bg-gray-200	w-[90dvw] max-w-[500px] px-2 py-1 rounded-md flex justify-between">
					<div className="w-[80%] flex items-center gap-2">
						<Icon path={mdiAccountCircle} size={1.4} />
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
						</div>
					<button type="button" className="cursor-pointer duration-100 hover:scale-105" onClick={() => openFoldableForm(usernameForm, usernameFormSection)}>
						<Icon path={mdiSquareEditOutline} size={1} />
					</button>
				</section>

				<section className="bg-gray-200	w-[90dvw] max-w-[500px] py-2 rounded-md flex flex-col items-center mt-5">
					<SettingsOption icon={mdiShieldEditOutline} text="Cambiar contraseña" function={() => openFoldableForm(passwordForm, passwordFormSection)} />
					<SettingsOption icon={mdiHelp} text="Acerca de" function={() => {href("/#about")}} />
					<SettingsOption icon={mdiScaleBalance} text="Terminos y condiciones" function={() => {href("/#terms-and-conditions")}} />
					<SettingsOption icon={mdiDeleteOutline} text="Eliminar la cuenta" function={() => openFoldableForm(deleteAccountForm, deleteAccountFormSection)} />

					<button className="mt-10 flex bg-blue-600 w-[90%] flex justify-center py-2 rounded-md cursor-pointer duration-300 hover:scale-105 hover:brightness-80" onClick={() => logout()}>
						<div className="flex gap-1 items-center invert">
							<Icon path={mdiLogout} size={1} />
							<p className="text-lg"> Cerrar sesion </p>
						</div>
					</button>
				</section>
			</main>

			<FoldableFormLayout ref={usernameFormSection} formRef={usernameForm} closeFunction={() => { closeFoldableForm(usernameForm, usernameFormSection) }} headerText="¿Cambiar nombre de usuario?" submitText="Cambiar" submitFunction={(e) => { changeUsername(e) }} message={usernameFormMessage}>
				<Input type="text" text="Ingresa tu nuevo nombre de usuario" name="new-username" />
				<PasswordInput text="Ingresa tu contraseña actual" name="password" />
			</FoldableFormLayout>

			<FoldableFormLayout ref={passwordFormSection} formRef={passwordForm} closeFunction={() => { closeFoldableForm(passwordForm, passwordFormSection) }} headerText="¿Cambiar contraseña?" submitText="Cambiar" submitFunction={(e) => { changePassword(e) }} message={passwordFormMessage}>
				<PasswordInput text="Ingresa tu nueva contraseña" name="new-password" />
				<PasswordInput text="Ingresa tu contraseña actual" name="password" />
			</FoldableFormLayout>

			<FoldableFormLayout ref={deleteAccountFormSection} formRef={deleteAccountForm} closeFunction={() => { closeFoldableForm(deleteAccountForm, deleteAccountFormSection) }} headerText="¿Estas seguro de querer eliminar tu cuenta?" submitText="Eliminar" submitFunction={(e) => { deleteAccount(e) }} message={deleteAccountFormMessage}>
				<PasswordInput text="Ingresa tu contraseña" name="password" />
			</FoldableFormLayout>
		</DashboardLayout>
	)
}