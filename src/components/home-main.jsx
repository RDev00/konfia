import AboutSection from './main-sections/about';
import TACSection from './main-sections/tac';

export default function HomeMain() {
	return (
		<main className="bg-white flex flex-col justify-start items-center min-h-[85dvh] pb-10">

			<section className="bg-[url(/home-background.jpg)] bg-center bg-cover bg-no-repeat w-full min-h-[50dvh] grid grid-template-cols-[1fr] mb-15">

				<div className="h-full text-white flex flex-col items-center justify-center backdrop-blur backdrop-brightness-60 text-center">

					<img src="/icons/main-header.png" className="w-[80%] max-w-[300px]" />
					<p className="text-xl opacity-80"> La confianza de siempre, ahora en tus manos... </p>

				</div>
			</section>
			<AboutSection />
			<TACSection />
		</main>
	)
}