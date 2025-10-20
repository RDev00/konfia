export default function Input(props) {
	return (
		<input className="backdrop-brightness-90 w-[90%] py-2 px-1 rounded-md text-center focus:outline-none"
			type={props.type}
			placeholder={props.text}
			title={props.guide}
			name={`konfia-${props.name}`}/>
	)
}