import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../store/auth";
import { useProgress } from "../hooks/useProgress";

export default function CreatePogressButton({ goals, onClose }) {
  const id_user = useAuthStore((state) => state.user?.id);
  const [showModal, setShowModal] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const { insertProgress } = useProgress();

  const saveProgressSubmit = (data) => {
    console.log("data:", data);
    insertProgress({ ...data, id_user })
      .then(() => {})
      .catch((error) => {})
      .finally(() => {
        setShowModal(false);
        reset({
          title: "",
          description: "",
        });
        onClose();
      });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 border p-3 rounded-full bg-green-100 hover:text-green-700 hover:bg-green-200 transition-all"
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
        Registrar progreso
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
                    Registrar progreso
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
                  onSubmit={handleSubmit((data) => saveProgressSubmit(data))}
                >
                  <div className="grid p-6 flex-auto gap-3">
                    <div className="grid gap-3">
                      <label htmlFor="">Selecciona la meta</label>
                      <select
                        name=""
                        id=""
                        {...register("goal", { required: true })}
                        className="bg-gray-200 p-2 rounded-md hover:ring-4 active:ring-4"
                      >
                        {goals?.length > 0 &&
                          goals?.map((goal) => {
                            return (
                              <option key={goal.id} value={goal.id}>
                                {goal.title}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <div className="grid gap-3">
                      <label htmlFor="">Título</label>
                      <input
                        type="text"
                        {...register("title", { required: true })}
                        className=" bg-gray-200 p-2 rounded-md hover:ring-4 active:ring-4"
                      />
                    </div>
                    <div className="grid gap-3">
                      <label htmlFor="">Descripción</label>
                      <textarea
                        className=" bg-gray-200 p-2 rounded-md hover:ring-4 active:ring-4"
                        id="description"
                        cols="9"
                        rows="2"
                        {...register("description", { required: false })}
                      ></textarea>
                    </div>
                  </div>
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Cancelar
                    </button>
                    <button
                      className="rounded-full px-4 py-3 bg-black hover:bg-gray-800 hover:ring-4 text-white transition-all"
                      type="submit"
                    >
                      Guardar cambios
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
