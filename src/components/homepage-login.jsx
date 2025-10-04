import { useRef } from 'react';

function HomePageLogin() {
	const storeInput = useRef(null)

	function redirectToLogin() {
		let inputText = storeInput.current.value;
		inputText = inputText.replace(/\s/g, '');
		if(inputText.length >= 1) {
			localStorage.setItem('store', inputText);
		}

		window.location.href = "/login";
	}

	return (
		<div className="fixed top-[50%] left-[50%] transform-[translate(-50%,-50%)] flex flex-col justify-center items-center gap-3">
			<h2 className="text-6xl font-bold"> Invexpress </h2>
			<div className="flex flex-col md:flex-row justify-center items-center gap-3">
				<input placeholder="Ingresa el nombre de tu tienda" ref={storeInput} className="border border-white px-3 py-1 rounded-md bg-[rgba(0,0,0,0.3)] focus:outline-none focus:scale-105 duration-250 text-center w-full md:w-auto text-lg md:text-base" />
				<button type="button" onClick={() => redirectToLogin()} className="border border-white px-3 py-1 rounded-md duration-250 cursor-pointer bg-[rgba(0,0,0,0.3)] hover:text-black hover:bg-[#F5EFEB] hover:scale-110 hover:bg-[#0000] focus:outline-none focus:text-black focus:bg-[#F5EFEB] focus:scale-110 focus:bg-[#0000] w-[80%] md:w-auto text-md"> Login </button>
			</div>
		</div>
	)
}

export default HomePageLogin;