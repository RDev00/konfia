import TextSection from '../text-section';

export default function AboutSection(){
	return (
		<div id="about" className="w-[90dvw] md:w-[80dvw] flex flex-col md:flex-row md:flex-wrap gap-5 md:gap-7 justify-center mb-10">
			<h2 className="font-bold text-center w-full text-4xl"> Acerca de </h2>

			<TextSection title="¿Qué es Konfia?">
				Konfia es una plataforma financiera digital diseñada para modernizar y llevar la confianza tradicional del "fiado" en las tiendas de abarrotes a la era digital. Nuestra misión es empoderar a las tiendas de abarrotes, especialmente a las nuevas y medianas, proporcionándoles una herramienta ágil y segura para gestionar el crédito de sus clientes.
			</TextSection>

			<TextSection title="Funcionamiento">
				Konfia permite a los dueños de tiendas registrar ventas a crédito de manera digital, los clientes pueden solicitar y llevar un control de sus deudas de forma transparente y los pagos se realizan de forma segura a través de la plataforma.
			</TextSection>

			<TextSection title="Tecnología">
				Desarrollada con el stack MERN, Konfia garantiza un rendimiento óptimo, escalabilidad y una experiencia de usuario fluida en dispositivos móviles y escritorio.
			</TextSection>

			<TextSection title="Valores">
				Confianza porque digitalizamos la relación de confianza entre tiendas y clientes, simplicidad en una interfaz intuitiva para una fácil adopción e innovación debido a las soluciones tecnológicas accesibles para negocios pequeños.
			</TextSection>

			<TextSection title="Impacto">
				Konfia busca reducir la morosidad, optimizar la administración del crédito y fortalecer la economía local, permitiendo que las tiendas crezcan sin perder su esencia comunitaria.
			</TextSection>
			
		</div>
	)
}