import NavButton from '../components/navButton';
import NavSection from '../components/navSection';
import { useRef } from 'react';

function Header(props) {
  const navSection = useRef(null);

  function openNav() {
    navSection.current.classList.add('flex');
    navSection.current.classList.remove('hidden');
    navSection.current.classList.remove('slide-right');
    navSection.current.classList.add('slide-left');
  }

  function closeNav() {
  navSection.current.classList.add('slide-right');
  navSection.current.classList.remove('slide-left');  
  const handleAnimationEnd = () => {
    navSection.current.classList.remove('flex');
    navSection.current.classList.add('hidden');
    navSection.current.removeEventListener('animationend', handleAnimationEnd);
  };
  
  navSection.current.addEventListener('animationend', handleAnimationEnd);
}

  return (
    <header className="bg-sky-900 px-[1rem] py-[0.5rem] 2xl:px-[1dvw] 2xl:py-[0.5dvw] z-2">
      <NavButton function={() => openNav()} />
        {props.children}
      <NavSection ref={navSection} function={() => closeNav()} />
    </header>
  )
}

export default Header;