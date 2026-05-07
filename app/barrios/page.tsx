import Link from "next/link";
const districts = [
  "Ciutat Vella",
  "L'Eixample",
  "Extramurs",
  "Campanar",
  "La Saïdia",
  "El Pla del Real",
  "L'Olivereta",
  "Patraix",
  "Jesús",
  "Quatre Carreres",
  "Poblats Marítims",
  "Camins al Grau",
  "Algirós",
  "Benimaclet",
  "Rascanya",
  "Benicalap",
  "Pobles del Nord",
  "Pobles de l'Oest",
  "Pobles del Sud",
];

export default function BarriosPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-100 px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
  <Link
    href="/"
    className="text-sm font-medium text-slate-500 transition hover:text-sky-600"
  >
    ← Volver al inicio
  </Link>
</div>
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-sky-600">
            Distritos de Valencia
          </p>

          <h1 className="mt-4 text-5xl font-bold tracking-tight text-slate-950 md:text-6xl">
            Explora las zonas de Valencia
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Valencia está dividida oficialmente en 19 distritos, cada uno con
            personalidad, estilo de vida y ambiente propio.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {districts.map((district) => (
            <div
              key={district}
              className="group rounded-3xl border border-white/80 bg-white/70 p-8 shadow-xl shadow-sky-100 backdrop-blur transition hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-slate-900">
                  {district}
                </p>

                <div className="rounded-full bg-sky-100 px-3 py-1 text-sm font-medium text-sky-700">
                  Distrito
                </div>
              </div>

              <p className="mt-4 leading-7 text-slate-600">
                Descubre viviendas, ambiente, servicios y estilo de vida en{" "}
                {district}.
              </p>

              <button className="mt-8 rounded-2xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-600">
                Explorar zona
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}