"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

import {
  getRealRecommendations,
  type Answers,
} from "../../lib/recommendation";

const ValenciaMap = dynamic(
  () => import("../../components/ValenciaMap"),
  {
    ssr: false,
  }
);


const initialAnswers: Answers = {
  lifeStyle: "",
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

            <div className="space-y-10 p-8 md:p-12">
              <Question title="¿Qué tipo de vida buscas?">
                <OptionGroup
                  value={answers.lifeStyle}
                  options={[
                    ["urbana", "Urbana y activa"],
                    ["equilibrada", "Equilibrada"],
                    ["tranquila", "Tranquila y residencial"],
                  ]}
                  onChange={(value) =>
                    setAnswers({ ...answers, lifeStyle: value })
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
                              ? answers.services.filter((s) => s !== service)
                              : [...answers.services, service],
                          });
                        }}
                        className={`rounded-2xl border px-5 py-4 text-left font-medium transition ${
                          exists
                            ? "border-[#071827] bg-[#071827] text-[#fffaf2] shadow-lg shadow-[#b9a98d]/25"
                            : "border-[#ddd3c4] bg-[#fffaf2] text-[#5f6773] hover:border-[#315b74] hover:text-[#071827]"
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
              <ValenciaMap
                recommended={realResults.map((r) => r.district)}
              />
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
          className={`rounded-2xl border px-5 py-4 text-left font-medium transition ${
            value === optionValue
              ? "border-[#071827] bg-[#071827] text-[#fffaf2] shadow-lg shadow-[#b9a98d]/25"
              : "border-[#ddd3c4] bg-[#fffaf2] text-[#5f6773] hover:border-[#315b74] hover:text-[#071827]"
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
        className="w-full accent-[#071827]"
      />

      <p className="mt-2 text-sm text-[#5f6773]">
        Valor: {value}/10
      </p>
    </div>
  );
}
