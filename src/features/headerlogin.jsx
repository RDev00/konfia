import Navbuttonlogin from "../components/navbutonlogin";

function Headerlog(){
    return(
        <header>
            <Navbuttonlogin function={() => openNav()} />
        </header>
    )
}
export default Headerlog;