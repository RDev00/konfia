import Headerlog from "../features/headerlogin";
import Footer from "../features/footer";
import Form from "../features/form";
import Input from "../components/input";


function Login () {
    return(
        <div className="text-white min-h-[100dvh] grid grid-rows-[auto_1fr_auto]">
            <Headerlog />
            <Form>
            <Input type="text" text="Usuario" name="usuario" />
            <Input type="password" text="Contraseña" name="contraseña" className="mb-12" />
            </Form>
            <Footer />
        </div>
    )
}

export default Login;