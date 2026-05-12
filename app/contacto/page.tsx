import Link from "next/link";

export default function ContactoPage() {
  return (
    <main className="min-h-screen bg-[#f3efe7] px-6 py-10 text-[#071827]">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="text-sm font-medium text-[#5f6773] transition hover:text-[#071827]"
        >
          ← Volver al inicio
        </Link>

        <section className="mt-24 grid gap-14 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#315b74]">
              Contacto
            </p>

            <h1 className="mt-8 text-5xl font-black leading-[1] tracking-tight md:text-7xl">
              Hablemos de cómo quieres vivir Valencia.
            </h1>

            <p className="mt-8 text-xl leading-9 text-[#5f6773]">
              Escríbenos si tienes dudas, propuestas o quieres saber más sobre
              TopZero.
            </p>

            <div className="mt-14 border-t border-[#d8d2c8] pt-8">
              <p className="text-sm uppercase tracking-[0.25em] text-[#315b74]">
                Email directo
              </p>

              <p className="mt-3 text-2xl font-bold text-[#071827]">
                info@topzero.es
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-[36px] border border-[#d8d2c8] bg-[#fffaf2] shadow-2xl shadow-[#b9a98d]/20">
            <div className="border-b border-[#d8d2c8] px-8 py-8 md:px-10">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#315b74]">
                Formulario
              </p>

              <h2 className="mt-5 text-4xl font-black leading-tight tracking-tight text-[#071827]">
                Cuéntanos tu caso.
              </h2>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#5f6773]">
                Puedes escribirnos directamente mediante el formulario integrado.
              </p>
            </div>

            <iframe
              src="https://form.typeform.com/to/SRI1yzkB?typeform-medium=embed-snippet"
              width="100%"
              height="650"
              frameBorder="0"
              className="bg-[#fffaf2]"
            />
          </div>
        </section>
      </div>
    </main>
  );
}