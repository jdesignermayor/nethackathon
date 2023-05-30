import { useState } from "react";
import { useForm } from "react-hook-form";
import { useGoals } from "../hooks/useGoals";
import { useAuthStore } from "../store/auth";

export default function CreateGoalButton({ onClose }) {
  const id_user = useAuthStore((state) => state.user?.id);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { insertGoal } = useGoals();

  const saveGoalSubmit = (data) => {
    setIsLoading(true);
    insertGoal({ ...data, id_user })
      .then(() => {})
      .catch((error) => {})
      .finally(() => {
        setShowModal(false);
        onClose();
        setIsLoading(false);
      });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 border p-3 rounded-full bg-blue-100 hover:text-blue-700 hover:bg-blue-200 transition-all"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Registrar una meta
      </button>

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden  overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative sm:px-3 sm:w-1/3 md:w-2/3 2xl:w-1/3 my-6 mx-auto max-w-8xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold font-recoleta">
                    Crear una meta
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <form
                  onSubmit={handleSubmit((data) => saveGoalSubmit(data))}
                  className="flex flex-col gap-5 justify-between pt-4"
                >
                  <div className="grid p-6 flex-auto gap-3">
                    <div className="grid gap-3">
                      <label htmlFor="">Título</label>
                      <input
                        type="text"
                        {...register("title", { required: true })}
                        className=" bg-gray-200 p-2 rounded-md hover:ring-4 active:ring-4"
                      />
                    </div>
                    <div className="grid gap-3">
                      <label htmlFor="description">Descripción</label>
                      <textarea
                        className=" bg-gray-200 p-2 rounded-md hover:ring-4 active:ring-4"
                        {...register("description", { required: true })}
                        id="description"
                        cols="9"
                        rows="7"
                      ></textarea>
                    </div>
                    <div className="flex gap-3">
                      <div className="grid gap-3 w-2/4">
                        <label htmlFor="date_init">Fecha de inicio</label>
                        <input
                          type="datetime-local"
                          id="date_init"
                          className=" bg-gray-200 p-2 rounded-md hover:ring-4 active:ring-4"
                          {...register("date_init", {
                            required: true,
                          })}
                        />
                      </div>
                      <div className="grid gap-3 w-2/4">
                        <label htmlFor="date_end">Fecha de fin</label>
                        <input
                          id="date_end"
                          type="datetime-local"
                          className=" bg-gray-200 p-2 rounded-md hover:ring-4 active:ring-4"
                          {...register("date_end", {
                            required: true,
                            validate: (val) => {
                              if (val < watch("date_init")) {
                                return "La fecha de fin debe ser mayor a la fecha de inicio";
                              }
                            },
                          })}
                        />
                      </div>
                    </div>
                    {errors.date_end?.message && (
                      <p className="text-red-500">{errors.date_end?.message}</p>
                    )}
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Cancelar
                    </button>
                    <button
                      disabled={isLoading}
                      className="rounded-full px-4 py-3 bg-black hover:bg-gray-800  disabled:bg-gray-500 hover:ring-4 text-white transition-all"
                      type="submit"
                    >
                      {isLoading ? "Guardando..." : "Guardar cambios"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
