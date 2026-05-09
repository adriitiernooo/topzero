"use client";

import { useState } from "react";
import Link from "next/link";

import {
  answersToPCs,
  getRealRecommendations,
  type Answers,
} from "../../lib/recommendation";

const initialAnswers: Answers = {
  lifestyle: "",
  transport: 5,
  services: [],
  budget: "",
  atmosphere: "",
  center: 5,
  tourism: "",
};

export default function QuizPage() {
  const [answers, setAnswers] = useState<Answers>(initialAnswers);

  const [showResults, setShowResults] = useState(false);

  const [realResults, setRealResults] = useState<any[]>([]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-100 px-6 py-16">
      <Link
        href="/"
        className="text-sm font-medium text-slate-500 transition hover:text-sky-600"
      >
        ← Volver al inicio
      </Link>

      <div className="mx-auto mt-16 max-w-4xl">
        {!showResults ? (
          <div className="rounded-3xl border border-white/80 bg-white/70 p-8 shadow-2xl shadow-sky-100 backdrop-blur">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-sky-600">
              Recomendador TopZero
            </p>

            <h1 className="mt-4 text-4xl font-bold text-slate-950">
              Cuéntanos cómo quieres vivir
            </h1>

            <div className="mt-10 space-y-10">
              <Question title="¿Qué tipo de vida buscas?">
                <OptionGroup
                  value={answers.lifestyle}
                  options={[
                    ["urbana", "Urbana y activa"],
                    ["equilibrada", "Equilibrada"],
                    ["tranquila", "Tranquila y residencial"],
                  ]}
                  onChange={(value) =>
                    setAnswers({ ...answers, lifestyle: value })
                  }
                />
              </Question>

              <Question title="¿Qué importancia tiene el transporte?">
                <Slider
                  value={answers.transport}
                  onChange={(value) =>
                    setAnswers({ ...answers, transport: value })
                  }
                />
              </Question>

              <Question title="¿Qué valoras cerca de casa?">
                <div className="grid gap-3 md:grid-cols-2">
                  {[
                    ["comercios", "Comercios"],
                    ["ocio", "Restaurantes y ocio"],
                    ["parques", "Parques y tranquilidad"],
                    ["servicios", "Servicios públicos"],
                  ].map(([value, label]) => {
                    const service = value as string;

                    const exists = answers.services.includes(service);

                    return (
                      <button
                        key={service}
                        type="button"
                        onClick={() => {
                          setAnswers({
                            ...answers,
                            services: exists
                              ? answers.services.filter(
                                  (s) => s !== service
                                )
                              : [...answers.services, service],
                          });
                        }}
                        className={`rounded-2xl border p-4 text-left font-medium transition ${
                          exists
                            ? "border-sky-400 bg-sky-50 text-sky-700"
                            : "border-slate-200 bg-white text-slate-700 hover:border-sky-300"
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </Question>

              <Question title="¿Cuál es tu presupuesto ideal?">
                <OptionGroup
                  value={answers.budget}
                  options={[
                    ["ajustado", "Ajustado"],
                    ["medio", "Medio"],
                    ["alto", "Alto"],
                  ]}
                  onChange={(value) =>
                    setAnswers({ ...answers, budget: value })
                  }
                />
              </Question>

              <Question title="¿Qué ambiente prefieres?">
                <OptionGroup
                  value={answers.atmosphere}
                  options={[
                    ["joven", "Joven y dinámico"],
                    ["familiar", "Familiar"],
                    ["tradicional", "Tradicional"],
                    ["moderno", "Moderno"],
                  ]}
                  onChange={(value) =>
                    setAnswers({ ...answers, atmosphere: value })
                  }
                />
              </Question>

              <Question title="¿Qué importancia tiene vivir cerca del centro?">
                <Slider
                  value={answers.center}
                  onChange={(value) =>
                    setAnswers({ ...answers, center: value })
                  }
                />
              </Question>

              <Question title="¿Prefieres una zona turística o local?">
                <OptionGroup
                  value={answers.tourism}
                  options={[
                    ["turistica", "Turística y conocida"],
                    ["local", "Local y de barrio"],
                  ]}
                  onChange={(value) =>
                    setAnswers({ ...answers, tourism: value })
                  }
                />
              </Question>
            </div>

            <button
              type="button"
              onClick={async () => {
                const results = await getRealRecommendations(answers);

                console.log("RESULTADOS:", results);

                setRealResults(results);

                setShowResults(true);
              }}
              className="mt-10 rounded-2xl bg-sky-500 px-8 py-4 font-semibold text-white shadow-xl shadow-sky-200 transition hover:-translate-y-1 hover:bg-sky-600"
            >
              Ver recomendaciones
            </button>
          </div>
        ) : (
          <div className="rounded-3xl border border-white/80 bg-white/70 p-8 shadow-2xl shadow-sky-100 backdrop-blur">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-sky-600">
              Tus zonas recomendadas
            </p>

            <h1 className="mt-4 text-4xl font-bold text-slate-950">
              Estas zonas encajan contigo
            </h1>
            <div className="mt-10 grid gap-5">
              {realResults.map((result, index) => (
                <div
                  key={`${result.district}-${index}`}
                  className="rounded-3xl bg-white p-6 shadow-lg"
                >
                  <p className="text-sm font-medium text-sky-600">
                    Recomendación #{index + 1}
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-slate-900">
                    {result.name}
                  </h2>

                  <p className="mt-3 text-slate-600">{result.description}</p>

                  <p className="mt-5 font-semibold text-sky-600">
                    Compatibilidad: {result.compatibility}%
                  </p>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setShowResults(false)}
              className="mt-8 text-sm font-medium text-slate-500 transition hover:text-sky-600"
            >
              Cambiar respuestas
            </button>
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
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>

      <div className="mt-4">{children}</div>
    </section>
  );
}

function OptionGroup({
  value,
  options,
  onChange,
}: {
  value: string;
  options: string[][];
  onChange: (value: string) => void;
}) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {options.map(([optionValue, label]) => (
        <button
          key={optionValue}
          type="button"
          onClick={() => onChange(optionValue)}
          className={`rounded-2xl border p-4 text-left font-medium transition ${
            value === optionValue
              ? "border-sky-400 bg-sky-50 text-sky-700"
              : "border-slate-200 bg-white text-slate-700 hover:border-sky-300"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
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
        min="0"
        max="10"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />

      <p className="mt-2 text-sm text-slate-500">
        Valor: {value}/10
      </p>
    </div>
  );
}