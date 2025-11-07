export default function Input(props) {
	return (
		<input className="backdrop-brightness-90 w-[90%] py-2 px-1 rounded-md text-center focus:outline-none invalid:border invalid:border-pink-600 invalid:text-pink-600"
			type={props.type}
			placeholder={props.text}
			title={props.guide}
			name={`konfia-${props.name}`}
			pattern={props.pattern}
			ref={props.ref}
			required={props.required}/>
	)
}