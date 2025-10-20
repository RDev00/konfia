export default function Header(props) {
	return (
		<header className="bg-emerald-200 flex items-center justify-start px-4 py-2 sticky top-0 z-2">
			<a href="/" className="text-white font-bold text-3xl duration-200 hover:scale-105"> Konfia </a>
			{props.children}
		</header>
	)
}