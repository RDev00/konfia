//Importacion de elementos
import DashboardLayout from '../../layouts/dashboard-layout';
import FoldableFormLayout from '../../components/forms/foldable-form-layout';
import Input from '../../components/forms/input';
import PasswordInput from '../../components/forms/password-input';
import Header from '../../components/header';
import SettingsOption from '../../components/settings-option';

//Importacion de funciones
import { useRef, useState, useEffect } from 'react';
import logout from '../../functions/logout';
import getCookie from '../../functions/getCookie';

//Importacion de conexiones
import getUserData from '../../hooks/get-data.user';
import updateUser from '../../hooks/update.user';
import deleteUser from '../../hooks/delete.user';

//Importacion de iconos
import Icon from '@mdi/react';
import { mdiHomeCircle, mdiAccountCircle, mdiShieldEditOutline, mdiHelp, mdiScaleBalance, mdiDeleteOutline, mdiLogout, mdiSquareEditOutline } from '@mdi/js';

export default function UserSettings() {
	//Hacemos la constante para guardar los datos de usuario
	const [ userData, setUserData ] = useState(null);

	//Declaracion de formularios, sus secciones y las funciones para insertar mensajes
	const usernameForm = useRef(null);
	const usernameFormSection	 = useRef(null);
	const [ usernameFormMessage, setUsernameFormMessage ] = useState("");

	const passwordForm = useRef(null);
	const passwordFormSection	 = useRef(null);
	const [ passwordFormMessage, setPasswordFormMessage ] = useState("");

	const deleteAccountForm = useRef(null);
	const deleteAccountFormSection = useRef(null);
	const [ deleteAccountFormMessage, setDeleteAccountFormMessage ] = useState('');

	//Creamos la funcion para redirigir al dashboard
	const goToDashboard = () => { window.location.href = '/store/dashboard' }
	
	//Verificamos si existe el token
	useEffect(() => {
		const token = getCookie('token');
		if(!token) return window.location.href="/";

		//Obtenemos los datos del usuario y los guardamos
    async function getData() {
      const res = await getUserData();
      setUserData(res.user);
    }

		//Ejecutamos la funcion
    getData();
	});

	//Creamos la funcion para redirigir
	const href = (link) => { window.location.href = link };

	//Creamos una funcion para abrir forms foldables
	const openFoldableForm = (form, section) => {
		const formCurrent = form.current;
		const sectionCurrent = section.current;

    sectionCurrent.classList.remove('hidden');
    formCurrent.classList.add('konfia-fold');
    formCurrent.classList.remove('konfia-hide');
	};

	//Y creamos la funcion para cerrarlos
	const closeFoldableForm = (form, section) => {
		const formCurrent = form.current;
		const sectionCurrent = section.current;

    formCurrent.classList.add('konfia-hide');
    formCurrent.classList.remove('konfia-fold');
    setTimeout(() => {
      sectionCurrent.classList.add('hidden')
    }, 500)
	};

	//Creamos una funcion para actualizar los datos del usuario
	const updateData = async() => {
    const res = await getUserData();

    setUserData(res.user);
	}

	//Creamos una funcion para cambiar de usuario
	const changeUsername = async(e) => {
		//Prevenimos recargas prematuras
		e.preventDefault();
		//Limpiamos el mensaje de respuesta
		setUsernameFormMessage("");
		//Declaramos el formulario
		const form = usernameForm.current;

		//Obtenemos los valores ingresados
		const insertedUsername = form.querySelector('input[name="konfia-new-username"]');
		const insertedPassword = form.querySelector('input[name="konfia-password"]');

		if(insertedUsername !== userData.username && insertedUsername.value && insertedPassword.value) {
			//Si se ingreso el nombre de usuario y no es el mismo entonces ejecutamos la conexion para cambiarlo en el servidor
			const res = await updateUser(insertedUsername.value, null, insertedPassword.value);
			//Retornamos la respuesta
			setUsernameFormMessage(res.message);
			//Regresamos los valores a vacios
			insertedUsername.value = "";
			insertedPassword.value = "";
			//Actualizamos la informacion del usuario
			updateData();

			//Cerramos el formulario un poco despues
			setTimeout(() => {
				closeFoldableForm(usernameForm, usernameFormSection);
			}, 200);
		} else {
			//Si llega a ocurrir algo, lo indicamos
			setUsernameFormMessage("Hubo un error al querer cambiar el nombre del usuario");
		}
	};

	//Esta funcion es exactamente lo mismo que lo de arriba
	const changePassword = async(e) => {
		e.preventDefault();
		setPasswordFormMessage("");
		const form = passwordForm.current;

		const insertedNewPassword = form.querySelector('input[name="konfia-new-password"]');
		const insertedPassword = form.querySelector('input[name="konfia-password"]');

			if (insertedNewPassword && insertedPassword) {
				const res = await updateUser(null, insertedNewPassword.value, insertedPassword.value);
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

	//Funcion para eliminar la cuenta
	const deleteAccount = async(e) => {
		e.preventDefault();
		setDeleteAccountFormMessage("");
		const form = deleteAccountForm.current;

		const insertedPassword = form.querySelector('input[name="konfia-password"]');

		if(insertedPassword) {
			//Si se ingreso la contraseña ejecutamos la conexion
      const res = await deleteUser(insertedPassword.value);
			//mostramos el mensaje
      setDeleteAccountFormMessage(res.message);
		
			//Sino hay errores hacemos logout
      if(!res.error || res.error === "No hay errores registrados"){ logout(); };
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
							{userData ? (
							<>
								<p className="text-xl md:text-2xl font-bold text-gray-900">
								{userData.username}
								</p>
								<p className="text-xs md:text-sm text-gray-700 opacity-80">
									@{userData.usertag}
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