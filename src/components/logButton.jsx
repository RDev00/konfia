function Logbutton(props){
    return(
    <button type="button" onClick={props.function} 
      className="w-full bg-[#1a2a40] text-white font-semibold py-3 rounded-xl hover:bg-[#223a57] transition cursor-pointer">
        iniciar sesion
    </button>
    )
}
export default Logbutton