function PasswordInput( props ) {
    return (
        <input type={props.type}
        placeholder={props.text || ""}
        name={props.name || ""}
        ref={props.ref}
        className={`flex flex-col text-center w-full p-2 rounded-lg bg-slate-300 text-black placeholder-gray-500 focus:ring-2 focus:outline-none transition-all duration-200 ${props.className || ""}`}
        />
    )
}
export default PasswordInput;