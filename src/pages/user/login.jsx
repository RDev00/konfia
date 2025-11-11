// Importacion de elementos
import Input from '../../components/forms/input';
import PasswordInput from '../../components/forms/password-input';
import FormLayout from '../../components/forms/form-layout';
import LayoutForms from '../../layouts/layout-form';
import { useRef, useEffect } from 'react';

//Importacion de funciones
import getCookie from '../../functions/getCookie';

//Importacion de conexiones
import login from '../../hooks/login.auth';

export default function UserLogin(){
	//Verificamos si el usuario esta registrado
	useEffect(() => {
		const token = getCookie('token');
		//Si esta registrado retornamos al inicio
		if(token) return window.location.href = '/';
	}, []);

	//Declaramos los elementos
	const message = useRef(null);
	const form = useRef(null);

	//Creamos la funcion HandleSubmit (presionar submit) para loguear al usuario
	const HandleSubmit = async (e) => {
		//prevenimos que recargue
		e.preventDefault();

		//Hacemos que mientras la funcion se ejecuta, el form este deshabilitado
		form.current.classList.add('disabled');
		//Obtenemos el valor de los inputs
		const inputs = form.current.querySelectorAll('input[name]');
		//Creamos un Objeto con valores vacios para luego agregar los valores ahi
		const body = {};

		//Separamos cada valor y le asignamos un nombre en base al nombre del input
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
			//Insertamos el valor del input y eliminamos todos los espacios
		  body[name] = input.value.replace(/\s+/g, '');
		});

		//Ejecutamos la conexion enviando el usertag (identificador de usuario) y la contraseña
		const res = await login(body.usertag, body.password);
		//Despues de enviarlo eliminamos la clase de deshabilitado, en caso de que haya un problema de contraseñas o hasta servidor
		form.current.classList.remove('disabled');
		
		//Insertamos el mensaje de respuesta
		message.current.innerText = res.message;
		//Verificamos si hay token (inicio de sesion exitoso)
		if(res.token){
			//Si retorno un token, entonces guardamos una cookie con ese token, el cual expira en 7 dias
			const expirationDate = new Date();
			expirationDate.setDate(expirationDate.getDate() + 7);

			document.cookie = `token=${res.token}; expires=${expirationDate.toUTCString()}; path=/; Secure; SameSite=Strict`;
			localStorage.setItem('userType', 'user');

			//Esperamos un poco y redirigimos al dashboard correspondiente, en este caso usuario 
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