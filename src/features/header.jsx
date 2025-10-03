import NavButton from '../components/navButton';
import NavSection from '../components/navSection';
import { useRef } from 'react';

function Header(props) {
  const navSection = useRef(null);

  //Funcion para togglear el nav
  function toggleNav() {
    //Buscar si el nav tiene la clase
    if(1 != 1){
      //Si tiene la clase lo cambiamos a hidden
    } else {
      //Sino eliminamos hidden
    }
  }

  return (
    <header>
      <NavButton function={() => { toggleNav }} />
      <NavSection ref={navSection} />
    </header>
  )
}

export default Header;