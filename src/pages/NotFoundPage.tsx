import { Link } from "react-router";

export const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 max-w-lg mx-auto text-center">
      <h1 className="w-full text-9xl font-black text-[#34b524]">404</h1>
      <p className="w-full">Mmmm... Parece que no hay nada aquí.</p>
      <p className="w-full text-2xl text-pretty">
        Si estás seguro de que hay algo, puedes volver a iniciar sesión o
        visitar la página de inicio.
      </p>

      <Link
        to="/"
        className="w-max font-medium text-xl mx-0 gap-2 p-4 rounded-lg bg-[#34b524] text-white"
      >
        Volver a la página de inicio
      </Link>
    </div>
  );
};
