"use client";

import { useState } from "react";
import NeighborhoodCard from "@/components/NeighborhoodCard";
import Link from "next/link";

export default function Home() {
  const [started, setStarted] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-100 px-6">
      <header className="mx-auto flex max-w-6xl items-center justify-between py-6">
        <div className="font-bold text-slate-950 text-2xl">
          Top<span className="text-sky-500">Zero</span>
        </div>

        <nav 
        className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          <Link href="/como-funciona">
          Cómo funciona
          </Link>
          <Link href="/barrios">
            Barrios
          </Link>
          <Link href="/contacto">
            Contacto
          </Link>
        </nav>
      </header>

      <section className="mx-auto flex min-h-[calc(100vh-96px)] max-w-4xl items-center justify-center text-center">
        {!started ? (
          <div>
            <div className="mb-6 inline-flex rounded-full border border-sky-200 bg-white/70 px-4 py-2 text-sm font-medium text-sky-700 shadow-sm">
              Valencia Home Match
            </div>

            <h1 className="text-5xl font-bold tracking-tight text-slate-950 md:text-7xl">
              Encuentra tu zona ideal para vivir en Valencia
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Responde unas preguntas sobre tu estilo de vida y te
              recomendaremos los barrios que mejor encajan contigo.
            </p>

            <div className="mt-10 flex justify-center">
              <button
                onClick={() => setStarted(true)}
                className="rounded-2xl bg-sky-500 px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-sky-200 transition hover:-translate-y-1 hover:bg-sky-600"
              >
                Empezar recomendación
              </button>
            </div>

            <div className="mx-auto mt-14 max-w-2xl rounded-3xl border border-white/80 bg-white/70 p-6 text-left shadow-2xl shadow-sky-100 backdrop-blur">
              <p className="text-sm font-medium text-sky-700">Vista previa</p>

              <h2 className="mt-3 text-2xl font-bold text-slate-900">
                Tu barrio recomendado podría ser...
              </h2>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <NeighborhoodCard
                  title="Benimaclet"
                  description="Joven, conectado y con vida local."
                  color="bg-sky-50"
                />

                <NeighborhoodCard
                  title="Ruzafa"
                  description="Creativo, céntrico y con mucho ocio."
                  color="bg-blue-50"
                />

                <NeighborhoodCard
                  title="Patacona"
                  description="Playa, calma y estilo mediterráneo."
                  color="bg-blue-50"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-3xl">
            <p className="text-sm font-medium text-sky-600">
              Pregunta 1 de 10
            </p>

            <h2 className="mt-4 text-4xl font-bold text-slate-900 md:text-5xl">
              ¿Qué estilo de vida buscas?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-slate-600">
              Elige la opción que más se parece a lo que tienes en mente.
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <button className="rounded-2xl bg-white p-6 text-left text-lg font-medium text-slate-800 shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
                 Cerca de la playa
              </button>

              <button className="rounded-2xl bg-white p-6 text-left text-lg font-medium text-slate-800 shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
                 Vida urbana y ocio
              </button>

              <button className="rounded-2xl bg-white p-6 text-left text-lg font-medium text-slate-800 shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
                 Tranquilidad
              </button>

              <button className="rounded-2xl bg-white p-6 text-left text-lg font-medium text-slate-800 shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
                 Ambiente joven
              </button>
            </div>

            <button
              onClick={() => setStarted(false)}
              className="mt-8 text-sm font-medium text-slate-500 transition hover:text-sky-600"
            >
              Volver al inicio
            </button>
          </div>
        )}
      </section>
    </main>
  );
}