export default function HistorySection(props){
  const history = props.history;

	return(
    <section ref={props.ref} className="bg-gray-200 w-full px-5 py-3 text-white rounded-b-md hidden">
      {history && history.length > 0 ?
      history.map((payment, index) => 
        ( <div key={index} className="mb-2">
          <p className="text-gray-600">
            ¡Pagaste
            <span className="text-green-600"> ${payment.payment} </span>
            con éxito a {payment.store}! </p>
        </div>
        )) :
         ( <p className="text-gray-700 text-center my-2 text-lg font-bold"> Nada nuevo por aquí... </p> )}
    </section>
	)
}