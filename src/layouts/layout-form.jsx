export default function LayoutForm(props) {
	return(
		<div className="min-h-[100dvh] bg-[url(/forms-background.jpg)] bg-cover bg-center grid grid-template-cols-[1fr]">
			<div className="w-full h-full backdrop-blur backdrop-brightness-60">
				{props.children}
			</div>
		</div>
	)
}