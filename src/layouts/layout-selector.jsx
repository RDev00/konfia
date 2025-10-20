export default function LayoutSelector(props){
	return(
		<div className="min-h-[100dvh] bg-[url(/public/selector-background.jpg)] bg-cover bg-center grid grid-template-cols-[1fr]">

			<div className="w-full h-full backdrop-blur backdrop-brightness-60 grid grid-template-cols-[1fr] pt-10">

				{props.children}

			</div>
		</div>
	)
}