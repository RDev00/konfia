function Input( props ) {
    /* TO DO: agregar un props text en el placeholder, un props name en el name, un props ref en ref */
    /* Agregar clases,, que sea tambien responsivo y pueda modificarse el tipo con las props */
    return (
        <input type={props.type} />
    )
}

export default Input