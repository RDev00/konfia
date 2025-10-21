import Input from '../../components/forms/input';
import PasswordInput from '../../components/forms/password-input';
import FormLayout from '../../components/forms/form-layout';
import LayoutForms from '../../layouts/layout-form';
import { useRef, useState } from 'react';

import getCookie from '../../functions/getCookie';
import register from '../../hooks/register.store';

export default function StoreRegister(){
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
      switch (input.name){
        case "konfia-store-username":
          name = "username"
          break;
        case "konfia-store-email":
          name = "storename"
          break;
        case "konfia-store-password":
          name = "password"
          break;
      }
		  body[name] = input.value.replace(/\s+/g, '');;
		});

		const res = await register(body.storename, body.password);
		form.current.classList.remove('disabled');
		
		message.current.innerText = res.message;

		setTimeout(() => { window.location.href="/store/login" }, 100);
	}

	return (
		<LayoutForms>
			<FormLayout formRef={form} submitText="Iniciar Sesion" messageRef={message} function={() => HandleSubmit()}>

				<Input type="store-username" name="store-username" text="Crea tu nombre de usuario" guide="El nombre de usuario es libre" />
				<Input type="store-email" name="store-email" text="Crea tu correo" guide="El correo no debe contener mayusculas, tambien debe ir todo el texto junto de la siguiente manera: example@konfia.com" />
				<PasswordInput name="store-password" text="Ingresa tu contraseña" guide="La contraseña no debe contener espacios" />
        <PasswordInput name="store-confirm" text="Confirma tu contraseña" guide="La contraseña no debe contener espacios" />
			</FormLayout>
		</LayoutForms>
	)
}