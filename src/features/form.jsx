import Usuario from "../components/usuario";
import Contraseña from "../components/contraseña-login";
import Logbutton from "../components/logButton";
import { useRef } from 'react';

function Form(props) {

    return(
        <div className="flex items-center justify-center min-h-screen bg-grey-100">
            <form className="flex flex-col gap-6 bg-white p-6 rounded-2xl shadow-lg w-80">
            <h2 className="flex items-center justify-center text-black text-4xl text-shadow-2xs font-medium"> Invexpress{/*Nombre de la app */} </h2>
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