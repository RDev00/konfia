import Input from '../../components/forms/input';
import PasswordInput from '../../components/forms/password-input';
import FormLayout from '../../components/forms/form-layout';
import LayoutForms from '../../layouts/layout-form';
import { useRef, useEffect } from 'react';

import getCookie from '../../functions/getCookie';
import register from '../../hooks/register.store';

export default function StoreRegister(){
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
        case "konfia-store-username":
          name = "username"
          break;
        case "konfia-store-email":
          name = "storename"
          break;
        case "konfia-store-password":
          name = "password"
          break;
        case "konfia-store-confirm":
          name = "confirm"
          break;
      }
		  body[name] = input.value.replace(/\s+/g, '');
		});

		if(body.storename === ""
			|| body.password === ""
			|| body.confirm === ""){
		 	message.current.innerText="Datos faltantes";
			form.current.classList.remove('disabled');
			return;
		} else if(body.password !== body.confirm){
		 	message.current.innerText="Las contraseñas no coinciden";
			form.current.classList.remove('disabled');
			return;
		} else {
			const res = await register(body.username, body.storename, body.password);
			form.current.classList.remove('disabled');
			
			message.current.innerText = res.message;

			setTimeout(() => { window.location.href="/store/login" }, 100);
			return
		};
	}

	return (
		<LayoutForms>
			<FormLayout formRef={form} submitText="Iniciar Sesion" messageRef={message} function={() => HandleSubmit()} redirectionText="¿Ya tienes cuenta?" link="/store/login" linkText="Inicia sesion!">

				<Input type="username" name="store-username" text="Crea tu nombre de usuario" guide="El nombre de usuario es libre" />
				<Input type="email" name="store-email" text="Crea tu correo" guide="El correo no debe contener mayusculas, tambien debe ir todo el texto junto de la siguiente manera: example@konfia.com" pattern="^[a-zñ0-9]+@konfia\.com$" />
				<PasswordInput name="store-password" text="Ingresa tu contraseña" guide="La contraseña no debe contener espacios" />
        <PasswordInput name="store-confirm" text="Confirma tu contraseña" guide="La contraseña no debe contener espacios" />
			</FormLayout>
		</LayoutForms>
	)
}