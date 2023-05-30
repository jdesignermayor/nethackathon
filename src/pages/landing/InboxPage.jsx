import image from "../../assets/peep-32.png";
import image1 from "../../assets/peep-42.png";
import image2 from "../../assets/peep-48.png";

export default function InboxPage() {
  return (
    <div className="pt-10 grid h-screen gap-36 items-center px-10 lg:px-[25%]">
      <div className="grid lg:flex  gap-8 pt-14 items-center">
        <div className="flex flex-col gap-5">
          <h1 className="font-bold text-8xl lg:text-7xl 2xl:text-9xl font-recoleta">
            Tu tranqui
          </h1>
          <p className="text-2xl">
            Establece metas, alcanza logros y obtén recompensas mientras abrazas
            hábitos saludables. ¡Una experiencia vanguardista para cuidar tu
            salud!
          </p>
        </div>
        <div>
          <img src={image} width={1500} className="z-20" alt="empty" />
        </div>
      </div>
      <div className="grid lg:flex gap-8 items-center">
        <div>
          <img src={image1} width={1000} className="z-20" alt="empty" />
        </div>
        <div className="grid gap-6">
          <p className="font-bold text-6xl font-recoleta">
            ¡Eleva tu bienestar!
          </p>
          <p className="text-2xl">
            Tranqui te permite establecer metas personalizadas y específicas en
            función de tus necesidades individuales.
          </p>
        </div>
      </div>
      <div className="grid lg:flex gap-8 items-center">
        <div className="grid gap-6">
          <p className="font-bold text-6xl font-recoleta">Cumple tus metas</p>
          <p className="text-2xl">
            Una vez que hayas definido tus metas, Tranqui te brindará una amplia
            gama de herramientas y recursos para ayudarte a alcanzarlas.
          </p>
        </div>
        <div>
          <img src={image2} width={1000} className="z-20" alt="empty" />
        </div>
      </div>
    </div>
  );
}
