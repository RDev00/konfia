import  Form  from "../features/form";
import Input from "../components/input";
import Header from "../features/header";
import Footer from "../features/footer";

function Register(){
    return (
        <div className="text-white min-h-[100dvh] grid grid-rows-[auto_1fr_auto]">
            <Header />
            <Form>
            <Input type="text" text="Usuario" name="usuario" />
            <Input type="email" text="example@gmail.com" name="email" />
            <Input type="password" text="Contraseña" name="contraseña" className="mb-12" />
            </Form>
            <Footer />
        </div>
    )
}
export default Register;