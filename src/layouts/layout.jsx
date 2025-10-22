export default function Layout(props) {
	return (
		<div className="bg-black min-h-[100dvh] grid grid-template-rows-[auto_1fr_auto]">
			{props.children}
		</div>
	)
}