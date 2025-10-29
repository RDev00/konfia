export default function CreditSection(props){
	return(
    <section ref={props.ref} className="bg-gray-200 w-full px-5 py-3 text-white rounded-b-md">
      {props.credits && props.credits.length > 0 ? (
        <>
          <h3 className="mb-2 text-green-700">Créditos activos</h3>
          {props.credits.some((credit) => credit.isAvaible) ? (
            props.credits
              .filter((credit) => credit.isAvaible)
              .map((credit) => (
                <div key={credit._id} className="flex justify-start items-center">
                  <p className="text-gray-700">Usuario: {credit.username}</p>
                  <p className="ml-auto text-green-400">Crédito: {credit.credit}</p>
                </div>
              ))
          ) : (
            <p className="text-gray-700 mb-3">No hay créditos activos</p>
          )}
          <h3 className="mt-4 mb-2 text-red-700">Créditos inactivos</h3>
          {props.credits.some((credit) => !credit.isAvaible) ? (
            props.credits
              .filter((credit) => !credit.isAvaible)
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
        <p className="text-gray-700">No hay créditos disponibles actualmente</p>
      )}

      <div className="w-full flex justify-center pt-5">
        <button type="button" className="bg-green-600 px-5 py-1 rounded-md cursor-pointer duration-250 hover:scale-105 hover:brightness-120"> Registrar nuevo pago </button>  
      </div>
    </section>
	)
}