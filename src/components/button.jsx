export default function Button(props) {
	return (
		<button type="button" className="bg-white px-4 py-1 text-lg rounded-md cursor-pointer duration-250 hover:scale-110 hover:brightness-90" onClick={props.function}> {props.text} </button>
	)
}