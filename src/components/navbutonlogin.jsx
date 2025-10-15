function Navbuttonlogin(props){
    return(
        <button type="button" onClick={props.functios}
        className="font-bold relative text-4xl 2xl:text-[3dvw] cursor-pointer duration-150 block aspect-square hover:scale-110 hover:bg-[rgba(0,0,0,0.2)] w-[3rem] 2xl:w-[3.5dvw] rounded-md">
      <p className="absolute top-[50%] left-[50%] transform-[translate(-50%,-55%)]>"> ☰ </p>
        </button>
    )
}

export default Navbuttonlogin;