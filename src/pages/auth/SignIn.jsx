import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, Link } from "wouter";
import { useAuthStore } from "../../store/auth";

import supabase from "../../../supabaseClient";

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [location, setLocation] = useLocation();

  const { register, handleSubmit } = useForm();
  const setAuth = useAuthStore((state) => state.setAuth);

  const signInProcess = async ({ email, password }) => {
    setLoading(true);
    try {
      await supabase.auth
        .signInWithPassword({
          email,
          password,
        })
        .then(async ({ data, error }) => {
          if (error) {
            setError(
              error.message ||
                "Ocurrio un error al registrarte, intenta de nuevo"
            );
            setLoading(false);
            return false;
          }

          const { session, user } = data;
          const { data: dataUser } = await supabase
            .from("tbl_users")
            .select("id,email,uid,provider")
            .eq("uid", user.id)
            .single();

          if (dataUser) {
            await setAuth({
              session,
              user: dataUser,
            });

            setLocation("/dashboard");
            setLoading(false);
          }
        });
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <div className="pt-12 px-5 md:flex justify-center w-full">
      <div className="grid lg:w-2/6">
        <p className="text-2xl">Iniciar sesión</p>
        <div className="grid gap-5">
          <form
            onSubmit={handleSubmit((data) => signInProcess(data))}
            className="flex flex-col gap-5 justify-between pt-4"
          >
            <div className="grid gap-3">
              <label htmlFor="email">Correo electrónico</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className=" bg-gray-200 p-2 rounded-md hover:ring-4 active:ring-4"
              />
            </div>
            <div className="grid gap-3">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                {...register("password", { required: true })}
                className=" bg-gray-200 p-2 rounded-md hover:ring-4 active:ring-4"
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <div>
              <button
                type="submit"
                disabled={loading}
                className={` rounded-full hover:ring-4 block text-white px-4 py-3 w-full ${
                  loading
                    ? "bg-gray-600 hover:bg-gray-700"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
               {loading ? 'Iniciando sesión...' : 'Iniciar sesión'} 
              </button>
            </div>
            <div className="flex gap-2 items-center">
              <p className=" text-sm">¿No tienes cuenta?</p>
              <Link href="/sign-up">
                <a className=" text-blue-600 ">Regístrate aquí</a>
              </Link>
            </div>
          </form>
          <div className="my-2 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
              <p className="mx-2 mb-0 text-center font-semibold">
                O
              </p>
            </div>
          <div>
            <button className="bg-black w-full hover:bg-gray-800 rounded-full hover:ring-4 block px-4 py-3 text-white">
              Iniciar sesion con Github
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
