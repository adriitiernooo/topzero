import Link from "next/link";

const districts = [
  {
    name: "Ciutat Vella",
    subtitle: "Historia, cultura y vida urbana.",
  },
  {
    name: "L'Eixample",
    subtitle: "Elegancia, gastronomía y ritmo premium.",
  },
  {
    name: "Extramurs",
    subtitle: "Equilibrio entre centro y calma.",
  },
  {
    name: "Campanar",
    subtitle: "Residencial, moderno y familiar.",
  },
  {
    name: "La Saïdia",
    subtitle: "Autenticidad y vida local.",
  },
  {
    name: "El Pla del Real",
    subtitle: "Exclusividad y calidad de vida.",
  },
  {
    name: "L'Olivereta",
    subtitle: "Vida residencial accesible y tradicional.",
  },
  {
    name: "Patraix",
    subtitle: "Barrio tranquilo y funcional.",
  },
  {
    name: "Jesús",
    subtitle: "Conexión, servicios y vida cotidiana.",
  },
  {
    name: "Quatre Carreres",
    subtitle: "Expansión moderna y conexión.",
  },
  {
    name: "Poblats Marítims",
    subtitle: "Mediterráneo, playa y lifestyle.",
  },
  {
    name: "Camins al Grau",
    subtitle: "Modernidad, servicios y cercanía al mar.",
  },
  {
    name: "Algirós",
    subtitle: "Universitario, dinámico y bien conectado.",
  },
  {
    name: "Benimaclet",
    subtitle: "Joven, creativo y universitario.",
  },
  {
    name: "Rascanya",
    subtitle: "Residencial práctico y familiar.",
  },
  {
    name: "Benicalap",
    subtitle: "Crecimiento urbano y accesibilidad.",
  },
  {
    name: "Pobles del Nord",
    subtitle: "Calma, huerta y ritmo mediterráneo.",
  },
  {
    name: "Pobles de l'Oest",
    subtitle: "Entorno local y residencial.",
  },
  {
    name: "Pobles del Sud",
    subtitle: "Naturaleza, desconexión y amplitud.",
  },
];

export default function BarriosPage() {
  return (
    <main className="min-h-screen bg-[#f3efe7] text-[#071827]">
      <section className="px-6 py-10">
        <div className="mx-auto max-w-[1600px]">
          <Link
            href="/"
            className="text-sm font-medium text-[#5f6773] transition hover:text-[#071827]"
          >
            ← Volver al inicio
          </Link>

          <div className="mt-28 max-w-6xl">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#315b74]">
              Distritos de Valencia
            </p>

            <h1 className="mt-8 text-[6rem] font-black leading-[0.9] tracking-tight">
              Explora Valencia distrito a distrito.
            </h1>

            <p className="mt-10 max-w-3xl text-2xl leading-10 text-[#5f6773]">
              Cada zona tiene una personalidad distinta, un ritmo diferente y
              una forma propia de vivir la ciudad.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-32">
        <div className="mx-auto max-w-[1600px] border-t border-[#d8d2c8]">
          {districts.map((district, index) => (
            <div
              key={district.name}
              className="group border-b border-[#d8d2c8] py-16 transition"
            >
              <div className="flex items-start justify-between gap-10">
                <div className="flex gap-10">
                  <p className="mt-3 text-sm font-semibold tracking-[0.3em] text-[#315b74]">
                    {String(index + 1).padStart(2, "0")}
                  </p>

                  <div>
                    <h2 className="text-5xl font-black tracking-tight transition duration-300 group-hover:translate-x-1">
                      {district.name}
                    </h2>

                    <p className="mt-5 max-w-3xl text-xl leading-9 text-[#5f6773]">
                      {district.subtitle}
                    </p>
                  </div>
                </div>

                <a
                 href={`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(
                district.name + " Valencia"
                 )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#071827] transition hover:translate-x-1"
                >
                  Explorar →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}