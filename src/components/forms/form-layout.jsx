export default function FormLayout(props){
	const redirection = () => { window.location.href = '/' };

	return (
		<form ref={props.formRef} className="px-4 py-4 max-w-[300px] w-[80dvw] bg-white fixed top-[50%] left-[50%] transform-[translate(-50%,-50%)] rounded-lg flex flex-col justify-center items-center gap-3">
			<img src="/icons/form-header.png" className="w-[80%] cursor-pointer duration-250 hover:scale-110 hover:brightness-80 mb-4" onClick={() => redirection()} />

			{props.children}

			<button type="button" onClick={props.function} className="bg-sky-500 w-[90%] px-1 py-1 rounded-md text-white text-lg font-bold cursor-pointer duration-150 hover:scale-110 hover:brightness-90 mt-4 disabled:pointer-events-none disabled:grayscale">
				{props.submitText}
			</button>
			<p ref={props.messageRef} className="opacity-70 text-sm"> </p>
			<p className="text-sm"> {props.redirection} </p>
		</form>
	)
}