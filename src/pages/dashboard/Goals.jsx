import { useState, useEffect } from "react";
import CreateGoalButton from "../../components/CreateGoalButton";
import { useGoals } from "../../hooks/useGoals";
import { useAuthStore } from "../../store/auth";
import EditGoalButton from "../../components/EditGoalButton";
import image from "../../assets/Grad_15.png";
import GoalSuccessBadge from "../../components/GoalSuccessBadge";

export default function Goals() {
  const [goals, setGoals] = useState([]);
  const { getGoalsById, deleteGoal } = useGoals();
  const id_user = useAuthStore((state) => state.user?.id);

  useEffect(() => {
    getGoalsById(id_user).then(({ goals: goalsResponse }) => {
      setGoals(goalsResponse);
    });
  }, []);

  const getGoalsAgain = () => {
    getGoalsById(id_user).then(({ goals: goalsResponse }) => {
      setGoals(goalsResponse);
    });
  };

  const deleteGoalById = (id) => {
    deleteGoal(id).then(() => {
      getGoalsAgain();
    });
  };

  return (
    <div className="flex flex-col py-7">
      <section className="flex items-center gap-4">
        <p className="font-bold text-4xl font-recoleta px-8">Metas</p>
      </section>
      <section>
        <article className="flex flex-col gap-8 p-8">
          <div className="grid gap-4">
            <div className="grid md:flex items-center justify-between">
              <p className="text-3xl font-recoleta">Listado de Metas</p>
              <CreateGoalButton onClose={getGoalsAgain} />
            </div>

            {goals?.length === 0 ? (
              <div className="w-full flex flex-col justify-center text-center items-center">
                <img src={image} width={400} className="z-20" alt="empty" />
                <p className="font-bold text-2xl font-recoleta z-10">
                  No hay nada por aquí
                </p>
                <p className=" text-gray-700">Aquí verás la lista de metas</p>
              </div>
            ) : (
              <div className="flex flex-col overflow-scroll divide-y-2 p-2 rounded-xl bg-slate-100">
                {goals?.sort((a, b) => { return a.isDone - b.isDone }).map((props) => {
                  const { id, title, description, dateInit, dateEnd, isDone } =
                    props;

                  return (
                    <div
                      key={id}
                      className="flex gap-2 p-4 items-center  bg-slate-100 hover:bg-slate-200 justify-between"
                    >
                      <div className="flex gap-2 items-center justify-between">
                        <div className= {`flex gap-2 items-center ${isDone && 'text-gray-500'}`}>
                          <p className={` ${isDone ? 'text-gray-500' : 'font-bold' }`}>{title}</p>
                          {isDone && <GoalSuccessBadge />}
                           / <p className="truncate">{description}</p>
                          / <p className="truncate">Inicio: {new Date(dateInit).toLocaleString()}</p>
                            <p>Fin: {new Date(dateEnd).toLocaleString()}</p>
                        </div>
                      
                      </div>

                      <div className="flex gap-4">
                        <EditGoalButton onClose={getGoalsAgain} disabled={isDone} data={props} />
                        <button
                          disabled={isDone}
                          onClick={() => deleteGoalById(id)}
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
                    </div>
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
