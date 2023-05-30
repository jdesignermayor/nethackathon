import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "wouter";
import { useAuthStore } from "../../store/auth";

import supabase from "../../../supabaseClient";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useLocation();

  const setAuth = useAuthStore((state) => state.setAuth);
  const storeSession = useAuthStore((state) => state);

  const registerUser = ({ email, password }) =>
    supabase.auth.signUp({ email, password });

  const signUpProcess = async (dataFields) => {
    console.log("first storeSession:", storeSession);

    try {
      setLoading(true);
      const { data, error } = await registerUser({
        email: dataFields.email,
        password: dataFields.password,
      });

      if (error && !data.user) {
        setError(
          error.message || "Ocurrio un error al registrarte, intenta de nuevo"
        );
        setLoading(false);
        return false;
      }

      await supabase.from("tbl_users").insert({
        email: data.user.email,
        uid: data.user.id,
        provider: data.user.app_metadata.provider,
      });

      await supabase.auth
        .signInWithPassword({
          email: dataFields.email,
          password: dataFields.password,
        })
        .then(async ({ data, error }) => {
          if (error) {
            console.log("error:", error);
            return false;
          }

          const { session, user } = data;
          const { data: dataUser } = await supabase
            .from("tbl_users")
            .select("id,email,uid,provider")
            .eq("uid", user.id)
            .single();

          await setAuth({
            session: session,
            user: dataUser,
          });
        });

      setLocation("/dashboard");
      setLoading(false);
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <div className="pt-12 px-4 md:flex justify-center w-full">
      <div className="grid lg:w-2/6">
        <p className="text-2xl">Registrarme</p>

        <div className="grid gap-5">
          <form
            onSubmit={handleSubmit((data) => signUpProcess(data))}
            className="flex flex-col gap-5 justify-between pt-4"
          >
            <div className="grid gap-3">
              <label htmlFor="">Correo electrónico</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className=" bg-gray-200 p-2 rounded-md hover:ring-4 active:ring-4"
              />
            </div>
            <div className="grid gap-3">
              <label htmlFor="">Contraseña</label>
              <input
                type="password"
                {...register("password", { required: true })}
                className=" bg-gray-200 p-2 rounded-md hover:ring-4 active:ring-4"
              />
            </div>
            <div className="grid gap-3">
              <label htmlFor="">Confirmar Contraseña</label>
              <input
                type="password"
                {...register("password_confirm", {
                  required: true,
                  validate: (val) => {
                    if (watch("password") != val) {
                      return "Las Contraseñas no coinciden";
                    }
                  },
                })}
                className=" bg-gray-200 p-2 rounded-md hover:ring-4 active:ring-4"
              />
            </div>
            {errors.password_confirm?.message && (
              <p className="alerts">{errors.password_confirm?.message}</p>
            )}
            {error && <p className="text-red-500">{error}</p>}
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`rounded-full hover:ring-4 block px-4 py-3 text-white w-full ${
                  loading
                    ? "bg-gray-600 hover:bg-gray-700"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? 'Registrando...' : 'Registrarme'}
              </button>
            </div>
          </form>
          <div className="my-2 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
            <p className="mx-2 mb-0 text-center font-semibold">O</p>
          </div>
          <div>
            <button className="rounded-full bg-black hover:ring-4 block px-4 py-3 w-full text-white">
              Registrarme con Github
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
