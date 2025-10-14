function Form(props) {
    return(
        <form className="">
            <h2> INVEXPRESS{/*Nombre de la app */} </h2>
            {props.children}
            <button></button> {/*Agregar opcion para agregar texto */}
            <p></p> {/*Agregar opcion de ref */}
        </form>
    )
}

export default Form;