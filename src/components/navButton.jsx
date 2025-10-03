function NavButton(props) {
  return (
    <button type="button" onClick={props.function} 
      className="font-bold text-4xl cursor-pointer duration-150 block aspect-square hover:scale-110 hover:bg-[rgba(0,0,0,0.2)] w-[3rem] h-[3rem] rounded-md">
      ☰
    </button>
  )
}

export default NavButton;