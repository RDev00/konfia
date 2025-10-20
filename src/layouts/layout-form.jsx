export default function LayoutForm(props) {
	return(
		<div className="min-h-[100dvh] bg-[url(/public/form-background.jpg)]">
			<div className="w-full h-full backdrop-blur backdrop-brightness-60">
				{props.children}
			</div>
		</div>
	)
}