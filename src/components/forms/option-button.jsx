export default function OptionButton(props) {
	return (
		<button type="button" onClick={props.function} className="flex flex-col justify-center items-center aspect-square bg-slate-200 rounded-md p-2 cursor-pointer duration-110 hover:scale-110 hover:brightness-90">
			{props.children}
			<p> {props.text} </p>
		</button>
	)
}