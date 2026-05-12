import Link from "next/link";

export default function ComoFuncionaPage() {
  return (
    <main className="min-h-screen bg-[#f3efe7] text-[#071827]">
      <section className="px-6 py-10">
  <div className="mx-auto max-w-[1700px]">
    <Link
      href="/"
      className="text-sm font-medium text-[#5f6773] transition hover:text-[#071827]"
    >
      ← Volver al inicio
    </Link>

    <div className="mt-28">
      <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#315b74]">
        Cómo funciona
      </p>

      <h1 className="mt-8 max-w-[1500px] text-[6rem] font-black leading-[0.9] tracking-tight text-[#071827]">
        Primero entendemos tu forma de vivir.
      </h1>

      <div className="mt-16 grid gap-16 lg:grid-cols-[1fr_460px]">
        <p className="max-w-4xl text-2xl leading-10 text-[#5f6773]">
          TopZero convierte preferencias personales en una lectura urbana de
          Valencia. El resultado no es una búsqueda genérica: es una
          recomendación de distritos con sentido.
        </p>

        <div className="border-l border-[#cfc6b8] pl-10">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#315b74]">
            De la persona al lugar
          </p>

          <p className="mt-6 text-3xl font-bold leading-tight">
            No preguntamos dónde quieres vivir. Primero entendemos cómo.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

      <section className="px-6 py-28">
        <div className="mx-auto max-w-7xl border-y border-[#cfc6b8]">
          <ProcessRow
            number="01"
            title="Señales personales"
            text="Recogemos preferencias sobre movilidad, ambiente, centralidad, presupuesto, vida local, ocio y tranquilidad."
          />

          <ProcessRow
            number="02"
            title="Lectura urbana"
            text="Traducimos esas respuestas en perfiles urbanos: joven conectado, familiar funcional, premium clásico, moderno accesible o marítimo."
          />

          <ProcessRow
            number="03"
            title="Afinidad por distrito"
            text="Ordenamos los distritos de Valencia según su compatibilidad con tu forma de vivir y mostramos las mejores opciones."
          />
        </div>
      </section>

      <section className="px-6 pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[36px] bg-[#071827] p-10 text-[#fffaf2] md:p-12">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#c7dceb]">
                Filosofía TopZero
              </p>

              <h2 className="mt-8 text-4xl font-black leading-tight tracking-tight md:text-6xl">
                La mejor zona no siempre es la más famosa.
              </h2>
            </div>

            <div className="rounded-[36px] border border-[#d8d2c8] bg-[#fffaf2] p-10 md:p-12">
              <p className="text-xl leading-9 text-[#5f6773]">
                Valencia cambia completamente según desde dónde la vivas.
                Algunas zonas son movimiento, otras calma. Algunas son conexión,
                otras barrio. Algunas son playa, otras vida urbana. TopZero
                existe para encontrar ese punto exacto entre ciudad y persona.
              </p>

              <Link
                href="/quiz"
                className="mt-10 inline-flex rounded-full bg-[#071827] px-8 py-4 text-lg font-bold text-[#fffaf2] transition hover:-translate-y-1 hover:bg-[#123047]"
              >
                Probar recomendador
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function ProcessRow({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="grid gap-8 border-b border-[#cfc6b8] py-14 last:border-b-0 md:grid-cols-[120px_300px_1fr]">
      <p className="text-sm font-semibold tracking-[0.3em] text-[#315b74]">
        {number}
      </p>

      <h2 className="text-3xl font-bold tracking-tight text-[#071827]">
        {title}
      </h2>

      <p className="max-w-2xl text-lg leading-8 text-[#5f6773]">{text}</p>
    </div>
  );
}