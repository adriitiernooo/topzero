import Link from "next/link";

export default function ContactoPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-100 px-6 py-16">
      <div className="mb-10">
        <Link
          href="/"
          className="text-sm font-medium text-slate-500 transition hover:text-sky-600"
        >
          ← Volver al inicio
        </Link>
      </div>

      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-sky-600">
            Contacto
          </p>

          <h1 className="mt-4 text-5xl font-bold tracking-tight text-slate-950 md:text-6xl">
            Hablemos
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Estamos construyendo una nueva forma de descubrir dónde vivir en
            Valencia. Si quieres colaborar, preguntar algo o simplemente seguir
            el proyecto, puedes escribirnos.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/80 bg-white/70 p-8 shadow-2xl shadow-sky-100 backdrop-blur">
            <h2 className="text-2xl font-bold text-slate-900">
              Envíanos un mensaje
            </h2>

            <div className="mt-8 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Nombre
                </label>

                <input
                  type="text"
                  placeholder="Tu nombre"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 outline-none transition focus:border-sky-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 outline-none transition focus:border-sky-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Mensaje
                </label>

                <textarea
                  placeholder="Escribe tu mensaje..."
                  rows={6}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 outline-none transition focus:border-sky-400"
                />
              </div>

              <button className="rounded-2xl bg-sky-500 px-8 py-4 font-semibold text-white shadow-xl shadow-sky-200 transition hover:-translate-y-1 hover:bg-sky-600">
                Enviar mensaje
              </button>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-3xl bg-slate-950 p-8 text-white shadow-2xl">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-sky-300">
                Valencia Home Match
              </p>

              <h2 className="mt-4 text-3xl font-bold">
                Construyendo el futuro de la búsqueda inmobiliaria
              </h2>
              <p className="mt-6 leading-8 text-slate-300">
                Somos un grupo de estudiantes de la Universidad Politecnica de Valencia apasionados por la tecnología, el diseño y la ciudad.
                </p>
              <p className="mt-6 leading-8 text-slate-300">
                Nuestro objetivo es ayudar a las personas a encontrar no solo
                una vivienda, sino el entorno que mejor encaja con su vida.
              </p>
            </div>

            <div className="mt-12 space-y-6">
              <div>
                <p className="text-sm text-slate-400">Email</p>
                <p className="mt-1 text-lg font-medium">
                  info@topzero.es
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-400">Ubicación</p>
                <p className="mt-1 text-lg font-medium">
                  Valencia, España
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-400">Estado</p>
                <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-4 py-2 text-sm font-medium text-emerald-300">
                  <div className="h-2 w-2 rounded-full bg-emerald-400" />
                  Proyecto en desarrollo
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}