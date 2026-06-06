"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

import {
  getRealRecommendations,
  type Answers,
  type Recommendation,
} from "../../lib/recommendation";

const ValenciaMap = dynamic(() => import("../../components/ValenciaMap"), {
  ssr: false,
});

const initialAnswers: Answers = {
  renta: 5,
  poblacion: 5,
  servicios: 5,
  unicos: 5,
};

export default function QuizPage() {
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [showResults, setShowResults] = useState(false);
  const [realResults, setRealResults] = useState<Recommendation[]>([]);

  return (
    <main className="min-h-screen bg-[#f3efe7] px-6 py-10 text-[#071827]">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link
          href="/"
          className="text-sm font-medium text-[#5f6773] transition hover:text-[#071827]"
        >
          ← Volver al inicio
        </Link>

        <p className="hidden text-sm font-semibold uppercase tracking-[0.3em] text-[#315b74] md:block">
          TopZero
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-5xl">
        {!showResults ? (
          <div className="overflow-hidden rounded-[40px] border border-[#ddd3c4] bg-[#fffaf2] shadow-2xl shadow-[#b9a98d]/25">
            <div className="border-b border-[#e4dacb] bg-[#071827] px-8 py-10 text-[#fffaf2] md:px-12">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#c7dceb]">
                Recomendador TopZero
              </p>

              <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight tracking-tight md:text-6xl">
                Cuéntanos cómo quieres vivir
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#e7edf2]/80">
                Responde unas preguntas sobre tu estilo de vida y traduciremos
                tus preferencias en distritos de Valencia que encajan contigo.
              </p>
            </div>

            <div className="grid gap-8 p-8 md:p-12">
              <Question title="¿Qué importancia das a vivir en una zona de renta alta?">
                <Slider
                  value={answers.renta}
                  onChange={(value) =>
                    setAnswers({ ...answers, renta: value })
                  }
                />
              </Question>

              <Question title="¿Que importancia le das a vivir en una zona tranquila y residencial?">
                <Slider
                  value={answers.poblacion}
                  onChange={(value) =>
                    setAnswers({ ...answers, poblacion: value })
                  }
                />
              </Question>

              <Question title="¿Qué importancia das a tener servicios cerca?">
                <Slider
                  value={answers.servicios}
                  onChange={(value) =>
                    setAnswers({ ...answers, servicios: value })
                  }
                />
              </Question>

              <Question title="¿Qué importancia das a estar cerca de puntos importantes de la ciudad?">
                <Slider
                  value={answers.unicos}
                  onChange={(value) =>
                    setAnswers({ ...answers, unicos: value })
                  }
                />
              </Question>

              <button
                type="button"
                onClick={async () => {
                  const results = await getRealRecommendations(answers);
                  setRealResults(results);
                  setShowResults(true);
                }}
                className="mt-4 inline-flex rounded-full bg-[#071827] px-8 py-4 text-lg font-bold text-[#fffaf2] shadow-2xl shadow-[#b9a98d]/30 transition hover:-translate-y-1 hover:bg-[#123047]"
              >
                Ver recomendaciones
              </button>
            </div>
          </div>
        ) : (
          <div className="overflow-hidden rounded-[40px] border border-[#ddd3c4] bg-[#fffaf2] shadow-2xl shadow-[#b9a98d]/25">
            <div className="border-b border-[#e4dacb] bg-[#071827] px-8 py-10 text-[#fffaf2] md:px-12">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#c7dceb]">
                Tus zonas recomendadas
              </p>

              <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight tracking-tight md:text-6xl">
                Estas zonas encajan contigo
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#e7edf2]/80">
                Hemos cruzado tus respuestas con los perfiles urbanos de
                Valencia para encontrar los distritos más afines.
              </p>
            </div>

            <div className="grid gap-5 p-8 md:p-12">
              {realResults.map((result, index) => (
                <div
                  key={`${result.district}-${index}`}
                  className="rounded-3xl border border-[#ddd3c4] bg-[#f8f5ef] p-6 shadow-lg shadow-[#b9a98d]/15"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#315b74]">
                    Recomendación #{index + 1}
                  </p>

                  <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                      <h2 className="text-3xl font-bold text-[#071827]">
                        {result.name}
                      </h2>

                      <p className="mt-3 max-w-2xl text-[#5f6773]">
                        {result.description}
                      </p>
                    </div>

                    <div className="rounded-full bg-[#071827] px-5 py-3 text-sm font-bold text-[#fffaf2]">
                      {result.compatibility}% match
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-8 pb-0 md:p-12 md:pb-0">
              <ValenciaMap recommended={realResults.map((r) => r.district)} />
            </div>

            <div className="px-8 pb-10 md:px-12">
              <button
                type="button"
                onClick={() => setShowResults(false)}
                className="text-sm font-medium text-[#5f6773] transition hover:text-[#071827]"
              >
                Cambiar respuestas
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function Question({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-xl font-bold text-[#071827]">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Slider({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <input
        type="range"
        min="1"
        max="10"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[#071827]"
      />

      <p className="mt-2 text-sm text-[#5f6773]">Valor: {value}/10</p>
    </div>
  );
}
