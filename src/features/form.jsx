import Usuario from "../components/usuario";
import Contraseña from "../components/contraseña-login";
import Logbutton from "../components/logButton";

function Form(props) {
    return(
        <div className="flex items-center justify-center min-h-screen bg-grey-100">
            <form className="bg-white p-6 rounded-2xl shadow-lg w-80">
            <h2 className="flex items-center justify-center text-black"> INVEXPRESS{/*Nombre de la app */} </h2>
            {props.children}
            <Usuario />
            <Contraseña />
            <Logbutton />{/*Agregar opcion para agregar texto */}
            <p></p> {/*Agregar opcion de ref */}
            </form>
        </div>
    )
}

export default Form;