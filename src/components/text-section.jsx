export default function TextSection(props){
	return (
		<section className="flex flex-col gap-1 bg-slate-200 rounded-lg px-3 py-3 md:w-[45%] duration-200 cursor-normal hover:scale-105 hover:brightness-90">
			<h2 className="text-lg font-bold text-center"> {props.title} </h2>
			<p> {props.children} </p>
		</section>
	)
}