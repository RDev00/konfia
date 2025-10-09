import Header from "../features/header";
import Footer from "../features/footer";
import ErrorMain from "../features/errormain";

function ErrorPage() {
  return (
    <div className="bg-black text-white min-h-[100dvh] grid grid-rows-[auto_1fr_auto]">
      <Header />
      <ErrorMain />
      <Footer />
    </div>
  )
}

export default ErrorPage;