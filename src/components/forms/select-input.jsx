export default function SelectInput(props) {
  return (
    props.options && props.options.length > 0 ? (
      <select
        className="backdrop-brightness-90 w-[90%] py-2 px-1 rounded-md text-center focus:outline-none border border-gray-300"
        name={`konfia-${props.name}`}
        onChange={props.onChange}
        value={props.value}
      >
        <option value="">Selecciona un crédito...</option>

        {props.options
          .filter(option => option.isActive)
          .map(option => (
            <option key={option._id} value={option._id}>
              {option.username} — ${option.credit}
            </option>
          ))}
      </select>
    ) : (
      <p className="text-sm text-gray-400 italic">No hay créditos disponibles</p>
    )
  );
}
