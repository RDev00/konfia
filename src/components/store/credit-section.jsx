export default function CreditSection(props){
	return(
    <section ref={props.ref} className="bg-gray-200 w-full px-5 py-3 text-white rounded-b-md">
      {props.credits && props.credits.length > 0 ? (
        <>
          <h3 className="mb-2 text-green-700">Créditos activos</h3>
          {props.credits.some((credit) => credit.isActive) ? (
            props.credits
              .filter((credit) => credit.isActive)
              .map((credit) => (
                <div key={credit._id} className="flex justify-start items-center">
                  <p className="text-gray-700">Usuario: {credit.username}</p>
                  <p className="ml-auto text-green-500">Crédito: {credit.credit}</p>
                </div>
              ))
          ) : (
            <p className="text-gray-700 mb-3">No hay créditos activos</p>
          )}
          <h3 className="mt-4 mb-2 text-red-700">Créditos inactivos</h3>
          {props.credits.some((credit) => !credit.isActive) ? (
            props.credits
              .filter((credit) => !credit.isActive)
              .map((credit) => (
                <div key={credit._id} className="flex justify-start items-center">
                  <p className="text-gray-700">Usuario: {credit.username}</p>
                  <p className="ml-auto text-red-700">Crédito: {credit.credit}</p>
                </div>
              ))
          ) : (
            <p className="text-gray-700">No hay créditos inactivos</p>
          )}
        </>
      ) : (
          <p className="text-gray-700 text-center my-2 text-lg font-bold"> ¿Sin créditos? ¡Prueba registrar uno nuevo! </p>
      )}
      {props.credits && (
        <div className="flex flex-col items-center justify-center mt-5">
          {props.credits.some(credit => credit.isActive) ? (
            <button type="button" className="bg-green-400 px-5 py-1 rounded-md cursor-pointer relative mt-2 duration-200 hover:brightness-110 hover:scale-105 text-sm md:text-base" onClick={props.function} >
              Registrar nuevo pago
            </button>
          ) : (
            <button type="button" className="bg-gray-400 px-5 py-1 rounded-md cursor-not-allowed mt-2 text-sm md:text-base" disabled >
              No hay créditos activos actualmente
            </button>
          )}
        </div>
      )}
    </section>
	)
}