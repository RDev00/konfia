import Icon from '@mdi/react';
import { mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js';
import { useRef, useState } from 'react';

export default function PasswordInput(props) {
	const input = useRef(null);
	const [isVisible, setIsVisible] = useState(false);
	const [inputType, setInputType] = useState('password');

	const toggleVisibility = (e) => {
		e.preventDefault();
		e.stopPropagation();
		const newVisibility = !isVisible;
		const newType = newVisibility ? "text" : "password";
		
		setInputType(newType);
		setIsVisible(newVisibility);
	}

	return (
		<div className="flex gap-1 w-[90%] relative">
			<input 
				ref={input} 
				type={inputType}
				className="backdrop-brightness-90 py-2 px-3 rounded-md text-center focus:outline-none w-full pr-12"
				placeholder={props.text}
				title={props.guide}
				name={`konfia_${props.name}`}
			/>

			<button 
				type="button" 
				className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
				onClick={toggleVisibility}
				onMouseDown={(e) => e.preventDefault()}
			>
				<Icon path={isVisible ? mdiEyeOffOutline : mdiEyeOutline} size={0.9}/>
			</button>
		</div>
	)
}