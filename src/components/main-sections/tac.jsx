import TextSection from '../text-section';

export default function TACSection(){
	return (
		<div className="w-[90dvw] md:w-[80dvw] flex flex-col md:flex-row md:flex-wrap gap-5 md:gap-7 justify-center">
			<h2 className="font-bold text-center w-full text-4xl"> Terminos y condiciones </h2>

			<TextSection title="Aceptación de los Términos">
				Al registrar una cuenta o utilizar Konfia, aceptas estos términos y nuestra Política de Privacidad. Si no estás de acuerdo, no debes usar la aplicación.
			</TextSection>

			<TextSection title="Descripción del Servicio">
				Konfia es una plataforma digital que facilita la gestión de créditos (sistema de "fiado") entre tiendas de abarrotes y sus clientes. No somos una institución financiera regulada, sino un intermediario tecnológico.
			</TextSection>

			<TextSection title="Registro y Cuenta">
				Eres responsable de la confidencialidad de tu cuenta y contraseña. La tienda es responsable de verificar la identidad y capacidad de pago de sus clientes.
			</TextSection>

			<TextSection title="Obligaciones de los Usuarios">
				Utilizar la plataforma solo para fines legales y autorizados. No realizar actividades fraudulentas, abusivas o que infrinjan derechos de terceros. Mantener un comportamiento ético en las transacciones de crédito.
			</TextSection>

			<TextSection title="Limitación de Responsabilidad">
				Konfia no se hace responsable por deudas impagas entre tiendas y clientes. No garantizamos la disponibilidad ininterrumpida del servicio. El uso de la aplicación es bajo tu propio riesgo.
			</TextSection>

			<TextSection title="Propiedad intelectual">
				Todo el contenido, código y marcas de Konfia son propiedad de sus desarrolladores y están protegidos por leyes de propiedad intelectual. El hecho de ser OpenSource <b> NO INDICA </b> que estas permitido a copiar y pegar el codigo completo en tu pagina web.
			</TextSection>

			<TextSection title="Modificaciones">
				Nos reservamos el derecho de modificar estos términos en cualquier momento. Las actualizaciones se notificarán a través de la aplicación.
			</TextSection>

			<TextSection title="Ley Aplicable">
				Estos términos se rigen por las leyes de México. Cualquier disputa se resolverá en los tribunales competentes de la Ciudad de México.
			</TextSection>
			
		</div>
	)
}