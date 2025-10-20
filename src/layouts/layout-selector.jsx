export default function LayoutSelector(props){
	return(
		<div className="min-h-[100dvh] h-auto bg-[url(/selector-background.jpg)] bg-cover bg-center grid grid-template-cols-[1fr]">

			<div className="w-full h-full backdrop-blur backdrop-brightness-60 py-10 flex flex-col justify-center items-center">

				{props.children}

			</div>
		</div>
	)
}