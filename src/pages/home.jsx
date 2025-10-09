import Header from '../features/header';
import Footer from '../features/footer';
import HomePage from '../features/homepage';
import HomePageLogin from '../components/homepage-login';

function Home() {
  //Obtener la cookie de la cuenta
  //Si tiene cuenta redirigir a dashboard
  //Sino no hacer nada

  return (
    <div className="bg-black text-white min-h-[100dvh] grid grid-rows-[auto_1fr_auto]">
      <Header>
        <HomePageLogin />
      </Header>
      <HomePage />
      <Footer />
    </div>
  )
}

export default Home;