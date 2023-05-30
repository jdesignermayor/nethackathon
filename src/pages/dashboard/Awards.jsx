import { useEffect, useState } from "react";
import { useAwards } from "../../hooks/useAwards";
import { useAuthStore } from "../../store/auth";
import awardicon from "../../assets/trophy.png"

export default function Awards() {
  const [awards, setAwards] = useState([]);
  const id_user = useAuthStore((state) => state.user?.id);
  const { getAwardsById } = useAwards();

  useEffect(() => {
    getAwardsById(id_user).then((awardsResponse) => {
      console.log("awardsResponse:", awardsResponse);
      setAwards(awardsResponse.award);
    });
  }, []);

  return (
    <div className="flex flex-col  py-7">
      <section className="flex items-center gap-4">
        <p className="font-bold text-4xl font-recoleta px-8">Recompensas</p>
      </section>
      <section>
        <article className="flex flex-col gap-8 p-8">
          <div className="grid gap-4">
            <div className="grid md:flex items-center justify-between">
              <p className="text-3xl font-recoleta">Historial de recompensas</p>
            </div>
            <div className="flex ">
              {awards?.length > 0
                ? awards?.map((award) => {
                    return (
                      <div key={award.id} className="flex w-96 gap-4 flex-col justify-center items-center text-center p-2 bg-yellow-50 rounded-xl">
                        <img src={awardicon} width={100} alt={award.description} />
                        <p className=" font-recoleta font-bold">{award.description}</p>
                        <p>{new Date(award.createdAt).toLocaleString()}</p>
                      </div>
                    );
                  })
                : "No hay nada por aquí :("}
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}
