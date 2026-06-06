export type Answers = {
  renta: number;
  poblacion: number;
  servicios: number;
  unicos: number;
};

export type Recommendation = {
  district: string;
  name: string;
  description: string;
  cluster: string;
  compatibility: number;
};

type DistrictRow = {
  Distrito: string;
  nombre_distrito: string;
  cluster_recomendador: string;
  renta_media_ponderada: number;
  poblacion_total_distrito: number;
  tiempo_medio_servicios: number;
  tiempo_medio_unicos: number;
};

type Model = {
  clases: string[];
  variables: string[];
  coeficientes: Record<string, Record<string, number>>;
};

const districtDescriptions: Record<string, string> = {
  "01": "Centro histórico, vida urbana, cultura y mucho movimiento.",
  "02": "Zona elegante, céntrica, comercial y muy bien conectada.",
  "03": "Equilibrio entre centro, servicios y vida residencial.",
  "04": "Residencial, familiar, con zonas verdes y buena conexión.",
  "05": "Cercana al centro, tradicional y con buena vida de barrio.",
  "06": "Zona tranquila, consolidada, verde y con perfil premium.",
  "07": "Residencial, accesible y con buena conexión urbana.",
  "08": "Barrio local, familiar, tranquilo y con identidad propia.",
  "09": "Residencial, práctico y bien conectado con el centro.",
  "10": "Moderno, amplio y cercano a zonas icónicas de Valencia.",
  "11": "Ambiente marítimo, playa, vida local y carácter valenciano.",
  "12": "Conexión entre centro, puerto y Ciudad de las Artes.",
  "13": "Joven, universitario, dinámico y bien conectado.",
  "14": "Ambiente joven, alternativo, local y con mucha vida social.",
  "15": "Residencial, accesible y con fuerte vida de barrio.",
  "16": "Zona residencial, práctica y con buena proyección.",
  "17": "Más tranquilo, rural y alejado del ritmo urbano.",
  "18": "Entorno residencial, periférico y más calmado.",
  "19": "Naturaleza, calma, huerta y cercanía al sur de Valencia.",
};

function cleanCSVValue(value: string) {
  return value
    .trim()
    .replace(/^\uFEFF/, "")
    .replace(/^"|"$/g, "");
}

function parseCSV(text: string): DistrictRow[] {
  const lines = text.trim().split(/\r?\n/);

  const headers = lines[0]
    .split(",")
    .map((h) => cleanCSVValue(h));

  return lines.slice(1).map((line) => {
    const values = line
      .split(",")
      .map((v) => cleanCSVValue(v));

    const row: Record<string, string> = {};

    headers.forEach((header, i) => {
      row[header] = values[i];
    });

    return {
      Distrito: String(row.Distrito).padStart(2, "0"),
      nombre_distrito: row.nombre_distrito,
      cluster_recomendador: row.cluster_recomendador,
      renta_media_ponderada: Number(row.renta_media_ponderada),
      poblacion_total_distrito: Number(row.poblacion_total_distrito),
      tiempo_medio_servicios: Number(row.tiempo_medio_servicios),
      tiempo_medio_unicos: Number(row.tiempo_medio_unicos),
    };
  });
}

function scaleAnswer(value: number, min: number, max: number) {
  return min + ((value - 1) / 9) * (max - min);
}

function softmax(scores: Record<string, number>) {
  const max = Math.max(...Object.values(scores));
  const expScores = Object.fromEntries(
    Object.entries(scores).map(([k, v]) => [k, Math.exp(v - max)])
  );

  const total = Object.values(expScores).reduce((a, b) => a + b, 0);

  return Object.fromEntries(
    Object.entries(expScores).map(([k, v]) => [k, v / total])
  );
}

function predictCluster(model: Model, input: Record<string, number>) {
  const scores: Record<string, number> = {};

  // Clase referencia: probabilidad base con score 0
  const reference = model.clases[0];
  scores[reference] = 0;

  Object.entries(model.coeficientes).forEach(([cluster, coefs]) => {
    let score = coefs["(Intercept)"] ?? 0;

    model.variables.forEach((variable) => {
      score += (coefs[variable] ?? 0) * input[variable];
    });

    scores[cluster] = score;
  });

  const probabilities = softmax(scores);

  return Object.entries(probabilities).sort((a, b) => b[1] - a[1])[0][0];
}

function distance(a: Record<string, number>, b: DistrictRow) {
  return (
    Math.abs(a.renta_media_ponderada - b.renta_media_ponderada) +
    Math.abs(a.poblacion_total_distrito - b.poblacion_total_distrito) +
    Math.abs(a.tiempo_medio_servicios - b.tiempo_medio_servicios) +
    Math.abs(a.tiempo_medio_unicos - b.tiempo_medio_unicos)
  );
}

export async function getRealRecommendations(
  answers: Answers
): Promise<Recommendation[]> {
  const [modelRes, districtsRes] = await Promise.all([
    fetch("/data/modelo_recomendador.json"),
    fetch("/data/tabla_clusters_final.csv"),
  ]);

  const model: Model = await modelRes.json();
  const districts = parseCSV(await districtsRes.text());

  const ranges = {
    renta_media_ponderada: {
      min: Math.min(...districts.map((d) => d.renta_media_ponderada)),
      max: Math.max(...districts.map((d) => d.renta_media_ponderada)),
    },
    poblacion_total_distrito: {
      min: Math.min(...districts.map((d) => d.poblacion_total_distrito)),
      max: Math.max(...districts.map((d) => d.poblacion_total_distrito)),
    },
    tiempo_medio_servicios: {
      min: Math.min(...districts.map((d) => d.tiempo_medio_servicios)),
      max: Math.max(...districts.map((d) => d.tiempo_medio_servicios)),
    },
    tiempo_medio_unicos: {
      min: Math.min(...districts.map((d) => d.tiempo_medio_unicos)),
      max: Math.max(...districts.map((d) => d.tiempo_medio_unicos)),
    },
  };

  const input = {
    renta_media_ponderada: scaleAnswer(
      answers.renta,
      ranges.renta_media_ponderada.min,
      ranges.renta_media_ponderada.max
    ),
    poblacion_total_distrito: scaleAnswer(
      answers.poblacion,
      ranges.poblacion_total_distrito.min,
      ranges.poblacion_total_distrito.max
    ),
    tiempo_medio_servicios: scaleAnswer(
      11 - answers.servicios,
      ranges.tiempo_medio_servicios.min,
      ranges.tiempo_medio_servicios.max
    ),
    tiempo_medio_unicos: scaleAnswer(
      11 - answers.unicos,
      ranges.tiempo_medio_unicos.min,
      ranges.tiempo_medio_unicos.max
    ),
  };

  const clusterGanador = predictCluster(model, input);

  let candidatos = districts.filter(
    (d) => d.cluster_recomendador === clusterGanador
  );

  if (candidatos.length < 3) {
    candidatos = districts;
  }

  const sorted = candidatos
    .map((d) => ({
      ...d,
      distancia: distance(input, d),
    }))
    .sort((a, b) => a.distancia - b.distancia)
    .slice(0, 3);

  const maxDist = Math.max(...sorted.map((d) => d.distancia));
  const minDist = Math.min(...sorted.map((d) => d.distancia));

  return sorted.map((d, index) => ({
    district: d.Distrito,
    name: d.nombre_distrito,
    description:
      districtDescriptions[d.Distrito] ??
      `Distrito perteneciente al perfil ${d.cluster_recomendador}.`,
    cluster: d.cluster_recomendador,
    compatibility:
      maxDist === minDist
        ? 90 - index * 5
        : Math.round(95 - ((d.distancia - minDist) / (maxDist - minDist)) * 18),
  }));
}
