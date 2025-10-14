import Header from "../features/header";
import Footer from "../features/footer";
import Form from "../features/form";


function Login () {
    return(
        <div className="bg-sky-950 text-white min-h-[100dvh] grid grid-rows-[auto_1fr_auto]">
            <header></header>
            <Form />
            <footer />
        </div>
    )
}

export default Login;