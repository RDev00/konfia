import Header from '../features/header';
import Footer from '../features/footer';
import HomePage from '../features/homepage';

function Home() {
  return (
    <div className="bg-black text-white min-h-[100dvh] grid grid-rows-[auto_1fr_auto]">
      <Header />
      <HomePage />
      <Footer />
    </div>
  )
}

export default Home;