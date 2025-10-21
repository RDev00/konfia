import Input from '../../components/forms/input';
import PasswordInput from '../../components/forms/password-input';
import FormLayout from '../../components/forms/form-layout';
import LayoutForms from '../../layouts/layout-form';
import { useRef, useEffect } from 'react';

import getCookie from '../../functions/getCookie';
import register from '../../hooks/register.auth';

export default function UserRegister(){
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
			switch (input.name){
				case "konfia-user-username":
					name = "username"
					break;
				case "konfia-user-password":
					name = "password"
					break;
				case "konfia-user-confirm":
					name = "confirm"
					break;
			}
		  body[name] = input.value.replace(/\s+/g, '');
		});

		if(body.password !== body.confirm) {
			message.current.innerText = "Las contraseñas no coinciden";
			form.current.classList.remove('disabled');
		} else {
			const res = await register(body.username, body.password);
			form.current.classList.remove('disabled');
			
			message.current.innerText = res.message;
		}
	}

	return (
		<LayoutForms>
			<FormLayout formRef={form} submitText="Iniciar Sesion" messageRef={message} function={() => HandleSubmit()} redirectionText="¿Ya tienes cuenta?" link="/user/login" linkText="Inicia sesion!">

				<Input type="text" name="user-username" text="Ingresa tu nombre de usuario" guide="el nombre de usuario debe ir sin espacios y solo letras en minusculas o numeros" pattern="[a-zñ0-9]{2,20}" />
				
				<PasswordInput name="user-password" text="Ingresa tu contraseña" guide="La contraseña no debe contener espacios" />
				<PasswordInput name="user-confirm" text="Confirma tu contraseña" guide="La contraseña no debe contener espacios" />
			</FormLayout>
		</LayoutForms>
	)
}