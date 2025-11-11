//Importacion de elementos
import Input from '../../components/forms/input';
import PasswordInput from '../../components/forms/password-input';
import FormLayout from '../../components/forms/form-layout';
import LayoutForms from '../../layouts/layout-form';
import { useRef, useEffect } from 'react';

//Importacion de funciones
import getCookie from '../../functions/getCookie';

//Importacion de conexiones
import register from '../../hooks/register.auth';
import login from '../../hooks/login.auth';

export default function UserRegister(){
  //Verificamos si el usuario ya esta registrado
	useEffect(() => {
		const token = getCookie('token');
    //Si esta registrado retornamos al inicio
		if(token) return window.location.href = '/';
	}, []);

  //Declaramos los elementos
	const message = useRef(null);
	const form = useRef(null);

  //Hacemos la funcion del submit
	const HandleSubmit = async (e) => {
  //Prevenimos recargas prematuras
  e.preventDefault();

  //Agregamos la clase deshabilitado
  form.current.classList.add('disabled');
  //Obtenemos todos los inputs
  const inputs = form.current.querySelectorAll('input[name]');
  //Hacemos el Objeto de body
  const body = {};

  inputs.forEach(input => {
    let name = "";
    switch (input.name) {
      case "konfia-user-username":
        name = "username";
        break;
      case "konfia-user-usertag":
        name = "usertag";
        break;
      case "konfia-user-password":
        name = "password";
        break;
      case "konfia-user-confirm":
        name = "confirm";
        break;
    }
		//Insertamos el valor del input y eliminamos todos los espacios
    body[name] = input.value.replace(/\s+/g, '');
  });

  //Verificamos si las contraseñas coincidenn desde el frontend
  if (body.password !== body.confirm) {
    //Sino coinciden se lo indicamos al usuario, eliminamos la clase deshabilitado y cancelamos la funcion
    message.current.innerText = "Las contraseñas no coinciden";
    form.current.classList.remove('disabled');
    return;
  }

  try {
    const res = await register(body.username, body.usertag, body.password);
    form.current.classList.remove('disabled');

    if (!res.error || res.error === "No hay errores registrados") {
      const loginRes = await login(body.usertag, body.password);
      window.location.href = "/user/dashboard";
			
			if(loginRes.token){
			const expirationDate = new Date();
			expirationDate.setDate(expirationDate.getDate() + 7);

			document.cookie = `token=${loginRes.token}; expires=${expirationDate.toUTCString()}; path=/; Secure; SameSite=Strict`;
			localStorage.setItem('userType', 'user');

			setTimeout(() => { window.location.href="/user/dashboard" }, 100)
		};
    } else {
      message.current.innerText = res.message || "Error al registrar el usuario";
    }
  } catch (err) {
    form.current.classList.remove('disabled');
    message.current.innerText = "Ocurrió un error al procesar la solicitud";
    console.error(err);
  }
};


	return (
		<LayoutForms>
			<FormLayout formRef={form} submitText="Iniciar Sesion" messageRef={message} function={(e) => HandleSubmit(e)} redirectionText="¿Ya tienes cuenta?" link="/user/login" linkText="Inicia sesion!">

				<Input type="text" name="user-username" text="Crea tu nombre de usuario" guide="el nombre de usuario debe ir sin espacios y solo letras en minusculas o numeros" />
				<Input type="text" name="user-usertag" text="Crea tu identificador de usuario" guide="el nombre de usuario debe ir sin espacios y solo letras en minusculas o numeros" pattern="[a-zñ0-9]{2,20}" required="true" />
				
				<PasswordInput name="user-password" text="Crea tu contraseña" guide="La contraseña no debe contener espacios" />
				<PasswordInput name="user-confirm" text="Confirma tu contraseña" guide="La contraseña no debe contener espacios" />
			</FormLayout>
		</LayoutForms>
	)
}