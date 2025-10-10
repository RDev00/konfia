function ErrorMain() {
  return (
    <main className="w-full h-full bg-linear-to-b from-gray-900 to-slate-950">
      <div className="flex flex-col justify-center items-center gap-2 fixed top-[50%] left-[50%] transform-[translate(-50%,-50%)_scale(1.1)] text-center">
        <h1 className="text-6xl 2xl:text-8xl"> Lo sentimos... </h1>
        <h2 className="text-xl 2xl:text-4xl text-[rgba(255,255,255,0.7)]"> La pagina que buscabas no se encuentra disponible actualmente </h2>

        <a href="/" className="border border-blue-400 bg-blue-400 px-4 py-1 rounded-md cursor-pointer duration-250 mt-3 hover:scale-110 hover:border-white hover:bg-white hover:text-black"> Regresar al inicio </a>
      </div>
    </main>
  )
}

export default ErrorMain;