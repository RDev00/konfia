export default function Input(props) {
	return (
		<input className=""
			type={props.type}
			placeholder={props.text}
			title={props.guide}
		/>
	)
}