import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../store/auth";
import { useProgress } from "../hooks/useProgress";

export default function EditPogressButton(props) {
  const { onClose, goal, progress, disabled } = props;

  const id_user = useAuthStore((state) => state.user?.id);
  const [showModal, setShowModal] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: progress.id,
      idGoal: progress.idGoal,
    },
  });

  const { updateProgress } = useProgress();

  const saveProgressSubmit = (data) => {
    updateProgress({ ...data, id_user })
      .then(() => {})
      .catch((error) => {})
      .finally(() => {
        setShowModal(false);
        onClose();
      });
  };

  return (
    <>
      <button
        disabled={disabled}
        onClick={() => setShowModal(true)}
        className="flex gap-2 hover:text-blue-600 disabled:text-gray-500 transition-all"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
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
                        {...register("goal", {
                          required: true,
                          disabled: true,
                          value: progress.idGoal,
                        })}
                        className="bg-gray-200 p-2 rounded-md hover:ring-4 active:ring-4"
                      >
                        <option key={progress.idGoal} value={progress.idGoal}>
                          {goal.title}
                        </option>
                      </select>
                    </div>
                    <div className="grid gap-3">
                      <label htmlFor="">Título</label>
                      <input
                        type="text"
                        {...register("title", {
                          required: true,
                          value: progress.title,
                        })}
                        className=" bg-gray-200 p-2 rounded-md hover:ring-4 active:ring-4"
                      />
                    </div>
                    <div className="grid gap-3">
                      <label htmlFor="">Descripción</label>
                      <textarea
                        className=" bg-gray-200 p-2 rounded-md hover:ring-4 active:ring-4"
                        id="description"
                        cols="9"
                        rows="7"
                        {...register("description", {
                          required: true,
                          value: progress.description,
                        })}
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
