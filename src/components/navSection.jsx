import ListItem from './subcomponents/listItem';

function NavSection(props) {
  return (
    <section ref={props.ref} className="z-5 fixed flex-col bg-[#F5EFEB] text-black max-w-[50dvw] py-[1rem] min-h-[100dvh] top-0 left-0 hidden">

      <button onClick={props.function} className="absolute top-2 left-[110%] text-2xl font-bold bg-[rgba(255,255,255,0.5)] block aspect-square w-[2.5rem] rounded-full flex items-center justify-center cursor-pointer duration-250 hover:brightness-70"> × </button>

      <ListItem text="Acerca de nosotros" link="/about" />

    </section>
  )
}

export default NavSection;