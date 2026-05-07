import Link from "next/link";
const steps = [
  {
    number: "01",
    title: "Respondes unas preguntas",
    description:
      "Te preguntamos sobre presupuesto, estilo de vida, transporte, preferencias y prioridades.",
  },
  {
    number: "02",
    title: "Analizamos tus preferencias",
    description:
      "Nuestro sistema cruza tus respuestas con características de los distritos y barrios de Valencia.",
  },
  {
    number: "03",
    title: "Calculamos compatibilidad",
    description:
      "Cada zona recibe una puntuación según lo bien que encaja contigo.",
  },
  {
    number: "04",
    title: "Te recomendamos zonas",
    description:
      "Recibes una selección de distritos y barrios con motivos claros, pros y contras.",
  },
];

export default function ComoFuncionaPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-100 px-6 py-16">
        <div className="mx-auto mb-10 max-w-6xl">
            <div className="mb-10">
  <Link
    href="/"
    className="text-sm font-medium text-slate-500 transition hover:text-sky-600"
  >
    ← Volver al inicio
  </Link>
</div>
</div>
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-sky-600">
            Cómo funciona
          </p>

          <h1 className="mt-4 text-5xl font-bold tracking-tight text-slate-950 md:text-6xl">
            De tus preferencias a tu zona ideal
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            La idea es sencilla: tú nos cuentas cómo quieres vivir y nosotros
            transformamos esas respuestas en recomendaciones claras.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-3xl border border-white/80 bg-white/70 p-8 shadow-xl shadow-sky-100 backdrop-blur transition hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="mb-6 inline-flex rounded-2xl bg-sky-100 px-4 py-2 text-sm font-bold text-sky-700">
                {step.number}
              </div>

              <h2 className="text-2xl font-bold text-slate-900">
                {step.title}
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-3xl border border-white/80 bg-slate-950 p-8 text-white shadow-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-sky-300">
            Próximamente
          </p>

          <h2 className="mt-4 text-3xl font-bold">
            Árbol de decisión personalizado
          </h2>

          <p className="mt-4 max-w-3xl leading-8 text-slate-300">
            Cuando el árbol de decisión esté definido, conectaremos cada
            respuesta con una lógica más precisa para recomendar zonas según
            presupuesto, movilidad, cercanía al mar, tranquilidad, servicios y
            estilo de vida.
          </p>
        </div>
      </div>
    </main>
  );
}