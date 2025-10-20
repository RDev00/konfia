import Input from '../../components/forms/input';
import PasswordInput from '../../components/forms/password-input';
import FormLayout from '../../components/forms/form-layout';
import LayoutForms from '../../layouts/layout-form';
import { useRef, useState } from 'react';

import getCookie from '../../functions/getCookie';
import login from '../../hooks/login.store';

export default function StoreLogin(){
	useState(() => {
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
			if(input.name === "konfia-store-email") { name = "storename" }
				else { name = "password" };
		  body[name] = input.value.replace(/\s+/g, '');;
		});

		const res = await login(body.storename, body.password);
		form.current.classList.remove('disabled');
		
		message.current.innerText = res.message;
		if(!token) return;

		const expirationDate = new Date();
		expirationDate.setDate(expirationDate.getDate() + 7);

		document.cookie = `token=${res.token}; expires=${expirationDate.toUTCString()}; path=/; Secure; SameSite=Strict`;

		setTimeout(() => { window.location.href="/store/dashboard" }, 100)
	}

	return (
		<LayoutForms>
			<FormLayout formRef={form} submitText="Iniciar Sesion" messageRef={message} function={() => HandleSubmit()}>
				<Input type="store-email" name="store-email" text="Ingresa tu correo" guide="El correo no debe contener mayusculas, tambien debe ir todo el texto junto de la siguiente manera: example@konfia.com" />
				<PasswordInput name="store-password" text="Ingresa tu contraseña" guide="La contraseña no debe contener espacios" />
			</FormLayout>
		</LayoutForms>
	)
}