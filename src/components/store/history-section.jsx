export default function HistorySection(props){
  const history = props.history;

	return(
    <section ref={props.ref} className="bg-gray-200 w-full px-5 py-3 text-white rounded-b-md hidden">
      { history && history.lenght > 0 ? ()
        /* history.forEach() */
        : ( <p> No hay historial </p> ) }
    </section>
	)
}