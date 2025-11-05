export default function FormLayout(props){
	const redirection = () => { window.location.href = '/' };

	return (
		<form ref={props.formRef} className="px-4 py-4 max-w-[300px] w-[80dvw] bg-white rounded-lg flex flex-col justify-center items-center gap-3" onSubmit={props.function}>
			<img src="/icons/form-header.png" className="w-[80%] cursor-pointer duration-250 hover:scale-110 hover:brightness-80 mb-4" onClick={() => redirection()} />

			{props.children}

			<button type="submit" className="bg-sky-500 w-[90%] px-1 py-1 rounded-md text-white text-lg font-bold cursor-pointer duration-150 hover:scale-110 hover:brightness-90 mt-4 disabled:pointer-events-none disabled:grayscale">
				{props.submitText}
			</button>
			<p className="text-sm"> {props.redirectionText} <a href={props.link} className="text-blue-600 hover:text-purple-600"> {props.linkText} </a> </p>
			<p ref={props.messageRef} className="opacity-70 text-sm"></p>
		</form>
	)
}