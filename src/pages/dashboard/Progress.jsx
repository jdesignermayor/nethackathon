import { useEffect } from "react";
import { useProgress } from "../../hooks/useProgress";
import { useAuthStore } from "../../store/auth";

import CreatePogressButton from "../../components/CreateProgressButton";
import EditPogressButton from "../../components/EditProgressButton";
import image from "../../assets/Grad_07.png";
import GoalSuccessBadge from "../../components/GoalSuccessBadge";

export default function Progress() {
  const { goalsAndProgressList, getProgressListByGoalId, deleteProgress } =
    useProgress();

  const id_user = useAuthStore((state) => state.user?.id);

  const deleteProgressById = (id) => {
    deleteProgress(id).then(() => {
      getProgressListAgain();
    });
  };

  const getProgressListAgain = () => {
    getProgressListByGoalId(id_user);
  };

  useEffect(() => {
    getProgressListByGoalId(id_user);
  }, []);

  return (
    <div className="flex flex-col  py-7">
      <section className="flex items-center gap-4">
        <p className="font-bold text-4xl font-recoleta px-8">Progreso</p>
      </section>
      <section>
        <article className="flex flex-col gap-8 p-8">
          <div className="grid gap-4">
            <div className="grid md:flex items-center justify-between">
              <p className="text-3xl font-recoleta">Historial de progreso</p>
              <CreatePogressButton
                goals={goalsAndProgressList}
                onClose={getProgressListAgain}
              />
            </div>
            {goalsAndProgressList?.length === 0 ? (
              <div className="w-full flex flex-col justify-center text-center items-center">
                <img src={image} width={400} className="z-20" alt="empty" />
                <p className="font-bold text-2xl font-recoleta z-10">
                  No hay nada por aquí
                </p>
                <p className=" text-gray-700">
                  Aquí verás la lista de metas con su respectivo progreso
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {goalsAndProgressList?.sort((a, b) => { return a.isDone - b.isDone })?.map((goal) => {
                  return (
                    <>
                      <div
                        key={goal.id}
                        className={`flex gap-3 flex-col divide-y-2 p-2 rounded-xl bg-slate-100`}
                      >
                        <div className="flex justify-between items-center gap-2">
                          <div className="flex items-center gap-3">
                            <div className="flex gap-2 items-center">
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
                                  d="M4.5 12.75l6 6 9-13.5"
                                />
                              </svg>
                              <p className="font-bold text-xl">{goal.title}</p>
                            </div>
                            {goal.isDone && (<GoalSuccessBadge />)}
                          </div>
                          <div>
                            <div>
                              <p>
                                Fecha límite:{" "}
                                {new Date(goal.dateEnd).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                        <ul className="flex flex-col gap-2 pt-3">
                          {goal?.progressList.length > 0 ? (
                            goal.progressList?.sort((a, b) => { return a.isDone - b.isDone }).map((progress) => {
                              return (
                                <ol
                                  key={progress.id}
                                  className={`flex bg-slate-200 hover:bg-slate-300 py-3 px-4 rounded-xl justify-between `}
                                >
                                  <div>Progreso: <span className="font-bold">{progress.title}</span> / {progress.description}</div>
                                  <div className="flex gap-4">
                                    <EditPogressButton
                                      goal={goal}
                                      progress={progress}
                                      disabled={goal.isDone}
                                      onClose={getProgressListAgain}
                                    />
                                    <button
                                      disabled={goal.isDone}
                                      onClick={() =>
                                        deleteProgressById(progress.id)
                                      }
                                      className="flex gap-2 hover:text-red-600 disabled:text-gray-500 transition-all"
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
                                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                        />
                                      </svg>
                                    </button>
                                  </div>
                                </ol>
                              );
                            })
                          ) : (
                            <p>Sin progreso aún</p>
                          )}
                        </ul>
                      </div>
                    </>
                  );
                })}
              </div>
            )}
          </div>
        </article>
      </section>
    </div>
  );
}
