import Input from '../../components/forms/input';
import PasswordInput from '../../components/forms/password-input';
import FormLayout from '../../components/forms/form-layout';
import LayoutForms from '../../layouts/layout-form';
import { useRef, useEffect } from 'react';

import getCookie from '../../functions/getCookie';
import login from '../../hooks/login.store';

export default function StoreLogin(){
	useEffect(() => {
		const token = getCookie('token');
		if(token) return window.location.href = '/';
	}, []);

	const message = useRef(null);
	const form = useRef(null);

	const HandleSubmit = async (e) => {
		e.preventDefault();

		form.current.classList.add('disabled');
		const inputs = form.current.querySelectorAll('input[name]');
		const body = {};

		inputs.forEach(input => {
			let name = "";
			if(input.name === "konfia-store-email") { name = "username" }
				else { name = "password" };
		  body[name] = input.value.replace(/\s+/g, '');
		});

		const res = await login(body.username, body.password);
		form.current.classList.remove('disabled');
		
		message.current.innerText = res.message;
		if(res.token){
			const expirationDate = new Date();
			expirationDate.setDate(expirationDate.getDate() + 7);

			document.cookie = `token=${res.token}; expires=${expirationDate.toUTCString()}; path=/; Secure; SameSite=Strict`;

			setTimeout(() => { window.location.href="/store/dashboard" }, 100)
		};
	}

	return (
		<LayoutForms>
			<FormLayout formRef={form} submitText="Iniciar Sesion" messageRef={message} function={(e) => HandleSubmit(e)} redirectionText="¿No tienes cuenta?" link="/store/register" linkText="¡Registrate!">

				<Input type="email" name="store-email" text="Ingresa tu correo" guide="El correo no debe contener mayusculas, tambien debe ir todo el texto junto de la siguiente manera: example@konfia.com" required="true" />
				
				<PasswordInput name="store-password" text="Ingresa tu contraseña" guide="La contraseña no debe contener espacios" />
			</FormLayout>
		</LayoutForms>
	)
}