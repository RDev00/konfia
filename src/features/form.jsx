import Logbutton from "../components/logButton";
import { useRef } from 'react';

function Form({children}) {

    return(
        <div className="flex items-center justify-center min-h-screen">
            <form className="flex flex-col gap-6 bg-gray p-6 rounded-2xl shadow-lg w-80">
            <h2 className="flex items-center justify-center text-black text-4xl text-shadow-2xs font-medium"> Konfia{/*Nombre de la app */} </h2>
            {children}
            <Logbutton />{/*Agregar opcion para agregar texto */}
            <p></p> {/*Agregar opcion de ref */}
            </form>
        </div>
    )
}

export default Form;