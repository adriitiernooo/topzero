"use client";
import dynamic from "next/dynamic";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f1ea]">
      <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#071827]/85 px-2 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between">
          <Link href="/" className="flex items-center">
           <img
              src="/images/logo-topzero1.png"
              alt="TopZero"
              className="h-35 w-auto object-contain"
              />
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-white/80 md:flex">
            <Link href="/como-funciona" className="transition hover:text-white">
              Cómo funciona
            </Link>

            <Link href="/barrios" className="transition hover:text-white">
              Distritos
            </Link>

            <Link href="/contacto" className="transition hover:text-white">
              Contacto
            </Link>
          </nav>
        </div>
      </header>

      <section className="relative h-screen overflow-hidden pt-20">
        <img
          src="/images/valencia-hero.jpg"
          alt="Valencia"
          className="absolute inset-0 h-full w-full object-cover"
        />

       <div className="absolute inset-0 bg-[#071827]/60" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6">
          <div className="max-w-4xl">
            <p className="mb-5 text-[#c7dceb] font-semibold uppercase tracking-[0.35em] text-[#9dd8ff]">
              Urban Intelligence for Valencia
            </p>

            <h1 className="text-5xl font-black leading-tight tracking-tight text-white md:text-7xl">
              Encuentra la zona de Valencia que encaja contigo
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80 md:text-xl">
              Analizamos tu estilo de vida, movilidad y preferencias urbanas
              para recomendarte los distritos que mejor se adaptan a ti.
            </p>

            <Link
              href="/quiz"
              className="mt-10 inline-flex rounded-full bg-white px-8 py-4 text-lg font-bold text-[#071827] shadow-2xl transition hover:-translate-y-1 hover:bg-[#e8f6ff]"
            >
              Empezar recomendación
            </Link>
          </div>
        </div>
      </section>
      <section className="bg-[#f6f3ee] px-6 py-28">
  <div className="mx-auto max-w-7xl space-y-28">
    <EditorialBlock
      image="/images/foto-catedral.jpg"
      label="Valencia real"
      title="Cada zona tiene una forma distinta de vivir."
      text="Valencia no es una sola ciudad. Cambia según el distrito, el ritmo, la conexión, la vida de barrio y lo que cada persona necesita para sentirse en casa."
    />

    <EditorialBlock
      reverse
      image="/images/foto-centro.jpg"
      label="Inteligencia urbana"
      title="No buscamos pisos. Buscamos estilos de vida."
      text="TopZero cruza tus preferencias con perfiles urbanos reales para recomendarte zonas que tengan sentido para tu forma de vivir, moverte y disfrutar la ciudad."
    />

    <EditorialBlock
      image="/images/foto-terraza.jpg"
      label="Lifestyle matching"
      title="Vivir bien empieza por entender cómo quieres vivir."
      text="Una terraza, una calle tranquila, una conexión rápida o un barrio con vida pueden cambiar por completo tu experiencia diaria. Por eso empezamos por ti."
    />
  </div>
</section>
     
    </main>
  );
}
function EditorialBlock({
  image,
  label,
  title,
  text,
  reverse = false,
}: {
  image: string;
  label: string;
  title: string;
  text: string;
  reverse?: boolean;
}) {
  return (
    <div
      className={`grid items-center gap-12 lg:grid-cols-2 ${
        reverse ? "lg:[&>div:first-child]:order-2" : ""
      }`}
    >
      <div className="overflow-hidden rounded-[36px] shadow-2xl shadow-slate-300/40">
        <img
          src={image}
          alt={title}
          className="text-[#c7dceb] w-full object-cover transition duration-700 hover:scale-105"
        />
      </div>

      <div className="max-w-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0f5f8f]">
          {label}
        </p>

        <h2 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-[#071827] md:text-5xl">
          {title}
        </h2>

        <p className="mt-6 text-lg leading-8 text-slate-600">
          {text}
        </p>
      </div>
    </div>
  );
}
