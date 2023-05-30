import { useEffect, useState } from "react";
import { Link } from "wouter";
import { useSummary } from "../../hooks/useSummary";
import { useAuthStore } from "../../store/auth";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import image from "../../assets/Grad_18.png";

export default function HomeAmin() {
  const [goalsList, setGoalsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [summary, setSummary] = useState([]);
  const [chartData, setChartData] = useState([
    {
      name: "Metas",
      total: 0,
      achieved: 0,
      unAchieved: 0,
    },
  ]);

  const { getSummaryById } = useSummary();
  const id_user = useAuthStore((state) => state.user?.id);

  useEffect(() => {
    setIsLoading(true);
    getSummaryById(id_user)
      .then((res) => {
        // const { total, achieved, unAchieved, goalsStatus } = res?.goals;
        setSummary(res?.goals);
        const { total, achieved, unAchieved, goalsStatus } = res?.goals;
        setGoalsList(goalsStatus);
        setChartData([
          {
            name: "Metas",
            total: total,
            achieved: achieved,
            unAchieved: unAchieved,
          },
        ]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id_user]);

  return (
    <div className="grid md:flex flex-col py-7">
      <section className="flex items-center gap-4">
        <p className="font-bold text-4xl font-recoleta px-8">Resumen</p>
      </section>

      {goalsList?.length === 0 ? (
        <div>
          <div className="w-full flex justify-center text-center">
            <div className="w-full flex flex-col justify-center text-center items-center">
              <img src={image} width={400} className="z-20" alt="empty" />
              <p className="font-bold text-2xl font-recoleta z-10">
                No hay nada por aquí
              </p>
              <p className=" text-gray-700">
                Aquí verás el resumen de tus metas
              </p>
            <div className="flex gap-3 pt-3">
            <Link to="/goals">
                <button className="flex items-center gap-2  p-3 rounded-full  hover:text-blue-700 bg-blue-100 transition-all">
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
                  Registrar Meta
                </button>
              </Link>
              <Link to="/progress">
                <button className="flex items-center gap-2  p-3 rounded-full  hover:text-green-700 bg-green-100 transition-all">
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
                  Registrar Progreso
                </button>
              </Link>
            </div>
            </div>
          </div>
        </div>
      ) : (
        <section className="grid lg:flex gap-5">
          <article className="flex flex-col gap-8 p-8">
            <div className="grid gap-4">
              <div className="grid md:flex gap-3 items-center justify-between">
                <p className="text-3xl font-recoleta">Metas actuales</p>
                <Link to="/goals">
                  <button className="flex items-center gap-2 border p-3 rounded-full hover:text-blue-700 hover:bg-blue-50 transition-all">
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
                    Registrar Meta
                  </button>
                </Link>
              </div>
              {goalsList?.length > 0 && (
                <>
                  <div className="flex flex-col ">
                    {isLoading ? (
                      <>Cargando...</>
                    ) : (
                      <>
                       <ResponsiveContainer width={"100%"} aspect={1}>
                        <BarChart
                          width={600}
                          height={400}
                          data={chartData}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="total" fill="#000" />
                          <Bar dataKey="achieved" fill="#2563eb" />
                          <Bar dataKey="unAchieved" fill="#606060" />
                        </BarChart>
                        </ResponsiveContainer>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </article>
          <article className="p-8">
            <div className="grid gap-4">
              <div className="grid md:flex gap-3 items-center justify-between">
                <p className="text-3xl font-recoleta">Estado de metas</p>
                <Link to="/progress">
                  <button className="flex items-center gap-2 border p-3 rounded-full hover:text-green-700 hover:bg-green-50 transition-all">
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
                    Registrar Progreso
                  </button>
                </Link>
              </div>

              {goalsList?.length > 0 && (
                <div className="flex flex-col divide-y-2 p-2 rounded-xl bg-slate-100">
                  {goalsList
                    ?.sort((a, b) => a.progress + b.progress)
                    .map((goal) => (
                      <div
                        key={goal.id}
                        className="flex gap-2 p-4 bg-slate-100 hover:bg-slate-200"
                        style={{
                          background: `linear-gradient(to right, #ceffce ${goal?.progress}%, white 0%)`,
                        }}
                      >
                        <p className="font-bold">{goal.title}</p>/
                        <p>{goal.description}</p>/<p>{goal.progress} % </p>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </article>
        </section>
      )}
    </div>
  );
}
