export default function FormSelectorLayout(props){
	const redirection = () => { window.location.href = '/' };

	return (
		<form className="px-4 pt-4 pb-6 max-w-[300px] w-[80dvw] bg-white fixed top-[50%] left-[50%] transform-[translate(-50%,-50%)] rounded-lg flex flex-col justify-center items-center gap-6">
			<img src="/icons/form-header.png" className="w-[80%] cursor-pointer duration-250 hover:scale-110 hover:brightness-80" onClick={() => redirection()} />
			{props.children}
		</form>
	)
}