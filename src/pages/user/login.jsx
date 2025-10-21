import Input from '../../components/forms/input';
import PasswordInput from '../../components/forms/password-input';
import FormLayout from '../../components/forms/form-layout';
import LayoutForms from '../../layouts/layout-form';
import { useRef, useEffect } from 'react';

import getCookie from '../../functions/getCookie';
import login from '../../hooks/login.auth';

export default function UserLogin(){
	useEffect(() => {
		const token = getCookie('token');
		if(token) return window.location.href = '/';
	}, []);

	const message = useRef(null);
	const form = useRef(null);

	const HandleSubmit = async () => {
		form.current.classList.add('disabled');
		const inputs = form.current.querySelectorAll('input[name]');
		const body = {};

		inputs.forEach(input => {
			let name = "";
			if(input.name === "konfia-user-email") { name = "storename" }
				else { name = "password" };
		  body[name] = input.value.replace(/\s+/g, '');
		});

		const res = await login(body.storename, body.password);
		form.current.classList.remove('disabled');
		
		message.current.innerText = res.message;
		if(res.token){
			const expirationDate = new Date();
			expirationDate.setDate(expirationDate.getDate() + 7);

			document.cookie = `token=${res.token}; expires=${expirationDate.toUTCString()}; path=/; Secure; SameSite=Strict`;

			setTimeout(() => { window.location.href="/user/dashboard" }, 100)
		};
	}

	return (
		<LayoutForms>
			<FormLayout formRef={form} submitText="Iniciar Sesion" messageRef={message} function={() => HandleSubmit()} redirectionText="¿No tienes cuenta?" link="/user/register" linkText="¡Registrate!">

				<Input type="text" name="user-username" text="Ingresa tu nombre de usuario" guide="el nombre de usuario debe ir sin espacios y solo letras en minusculas o numeros" />
				
				<PasswordInput name="user-password" text="Ingresa tu contraseña" guide="La contraseña no debe contener espacios" />
			</FormLayout>
		</LayoutForms>
	)
}