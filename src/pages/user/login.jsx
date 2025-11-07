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

	const HandleSubmit = async (e) => {
		e.preventDefault();

		form.current.classList.add('disabled');
		const inputs = form.current.querySelectorAll('input[name]');
		const body = {};

		inputs.forEach(input => {
			let name = "";
			switch (input.name) {
				case "konfia-user-usertag":
					name = "usertag"
					break;
				case "konfia-user-password":
					name = "password"
					break;
			}
		  body[name] = input.value.replace(/\s+/g, '');
		});

		const res = await login(body.usertag, body.password);
		form.current.classList.remove('disabled');
		
		message.current.innerText = res.message;
		if(res.token){
			const expirationDate = new Date();
			expirationDate.setDate(expirationDate.getDate() + 7);

			document.cookie = `token=${res.token}; expires=${expirationDate.toUTCString()}; path=/; Secure; SameSite=Strict`;
			localStorage.setItem('userType', 'user');

			setTimeout(() => { window.location.href="/user/dashboard" }, 100)
		};
	}

	return (
		<LayoutForms>
			<FormLayout formRef={form} submitText="Iniciar Sesion" messageRef={message} function={(e) => HandleSubmit(e)} redirectionText="¿No tienes cuenta?" link="/user/register" linkText="¡Registrate!">

				<Input type="text" name="user-usertag" text="Ingresa tu nombre de usuario" guide="el nombre de usuario debe ir sin espacios y solo letras en minusculas o numeros" required="true" />
				
				<PasswordInput name="user-password" text="Ingresa tu contraseña" guide="La contraseña no debe contener espacios" />
			</FormLayout>
		</LayoutForms>
	)
}