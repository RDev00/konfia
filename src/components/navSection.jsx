import ListItem from './subcomponents/listItem';
import { useRef, useEffect } from 'react';
import getCookie from '../functions/getCookie.js';

function NavSection(props) {
  const loginButton = useRef(null);

  let account = false;

  const cookieExist = getCookie('authentification');
  if(cookieExist) { account = true }
    else { account = false };

  useEffect(() => {
    if(account === true) { loginButton.current.classList.add('hidden'); }
  })

  function redirectToLogin() { window.location.href = '/login' }

  return (
    <section ref={props.ref} className="z-5 fixed flex justify-start items-center gap-4 flex-col bg-[#F5EFEB] text-black w-full md:w-auto md:max-w-[50dvw] py-[1rem] min-h-[100dvh] top-0 left-0 hidden">

      <button onClick={props.function} className="absolute top-2 right-0 md:left-[110%] text-2xl font-bold bg-[rgba(255,255,255,0.5)] block aspect-square w-[2.5rem] rounded-full flex items-center justify-center cursor-pointer duration-250 hover:brightness-70">
        <p className="absolute top-[50%] left-[50%] transform-[translate(-50%,-55%)]"> × </p>
      </button>

      <h2 className="text-black text-center text-xl font-bold"> Configuracion </h2>
      <ul className="list-none">
        <ListItem text="Acerca de nosotros" link="/about" />
        <ListItem text="Configuracion" link="/settings" />
        <ListItem text="Informa un error" link="/report" />
      </ul>

      <button type="button" ref={loginButton} onClick={() => redirectToLogin()} className="mt-auto cursor-pointer border border-black w-[80%] rounded-md py-1 bg-black text-white duration-250 hover:scale-110"> Iniciar Sesión </button>

    </section>
  )
}

export default NavSection;