export type Answers = {
  lifestyle: string;
  transport: number;
  services: string[];
  budget: string;
  atmosphere: string;
  center: number;
  tourism: string;
};

const districtInfo: Record<string, { name: string; description: string }> = {
  "01": {
    name: "Ciutat Vella",
    description: "Centro histórico, vida urbana, cultura y mucho movimiento.",
  },
  "02": {
    name: "L'Eixample",
    description: "Zona elegante, céntrica, comercial y muy bien conectada.",
  },
  "03": {
    name: "Extramurs",
    description: "Equilibrio entre centro, servicios y vida residencial.",
  },
  "04": {
    name: "Campanar",
    description: "Residencial, familiar, con zonas verdes y buena conexión.",
  },
  "05": {
    name: "La Saïdia",
    description: "Cercana al centro, tradicional y con buena vida de barrio.",
  },
  "06": {
    name: "El Pla del Real",
    description: "Zona tranquila, consolidada, verde y con perfil premium.",
  },
  "07": {
    name: "L'Olivereta",
    description: "Residencial, accesible y con buena conexión urbana.",
  },
  "08": {
    name: "Patraix",
    description: "Barrio local, familiar, tranquilo y con identidad propia.",
  },
  "09": {
    name: "Jesús",
    description: "Residencial, práctico y bien conectado con el centro.",
  },
  "10": {
    name: "Quatre Carreres",
    description: "Moderno, amplio y cercano a zonas icónicas de Valencia.",
  },
  "11": {
    name: "Poblats Marítims",
    description: "Ambiente marítimo, playa, vida local y carácter valenciano.",
  },
  "12": {
    name: "Camins al Grau",
    description: "Conexión entre centro, puerto y Ciudad de las Artes.",
  },
  "13": {
    name: "Algirós",
    description: "Joven, universitario, dinámico y bien conectado.",
  },
  "14": {
    name: "Benimaclet",
    description: "Ambiente joven, alternativo, local y con mucha vida social.",
  },
  "15": {
    name: "Rascanya",
    description: "Residencial, accesible y con fuerte vida de barrio.",
  },
  "16": {
    name: "Benicalap",
    description: "Zona residencial, práctica y con buena proyección.",
  },
  "17": {
    name: "Pobles del Nord",
    description: "Más tranquilo, rural y alejado del ritmo urbano.",
  },
  "18": {
    name: "Pobles de l'Oest",
    description: "Entorno residencial, periférico y más calmado.",
  },
  "19": {
    name: "Pobles del Sud",
    description: "Naturaleza, calma, huerta y cercanía al sur de Valencia.",
  },
};

export function answersToPCs(answers: Answers) {
  let PC1 = 0;
  let PC2 = 0;
  let PC3 = 0;

  if (answers.lifestyle === "urbana") PC1 += 1.2;
  if (answers.lifestyle === "equilibrada") PC1 += 0.4;
  if (answers.lifestyle === "tranquila") PC1 -= 1;

  PC1 += answers.transport * 0.15;
  PC1 += answers.center * 0.12;

  if (answers.budget === "ajustado") PC3 += 0.8;
  if (answers.budget === "medio") PC3 += 0.2;
  if (answers.budget === "alto") PC3 -= 0.8;

  if (answers.atmosphere === "joven") PC2 += 0.6;
  if (answers.atmosphere === "familiar") PC2 -= 0.2;
  if (answers.atmosphere === "tradicional") PC2 -= 0.5;
  if (answers.atmosphere === "moderno") PC2 += 0.8;

  if (answers.tourism === "turistica") PC2 += 0.7;
  if (answers.tourism === "local") PC2 -= 0.6;

  if (answers.services.includes("comercios")) PC1 += 0.3;
  if (answers.services.includes("ocio")) PC1 += 0.5;
  if (answers.services.includes("parques")) PC1 -= 0.3;
  if (answers.services.includes("servicios")) PC1 += 0.4;

  return { PC1, PC2, PC3 };
}

export async function getRealRecommendations(answers: Answers) {
  const scores: Record<string, number> = {
    "01": 0,
    "02": 0,
    "03": 0,
    "04": 0,
    "05": 0,
    "06": 0,
    "07": 0,
    "08": 0,
    "09": 0,
    "10": 0,
    "11": 0,
    "12": 0,
    "13": 0,
    "14": 0,
    "15": 0,
    "16": 0,
  };

  // =========================
  // PERFIL URBANO JOVEN
  // =========================

  if (answers.atmosphere === "joven") {
    scores["13"] += 4;
    scores["14"] += 5;
    scores["12"] += 3;
  }

  if (answers.services.includes("ocio")) {
    scores["01"] += 2;
    scores["13"] += 3;
    scores["14"] += 4;
  }

  // =========================
  // PREMIUM CLÁSICO
  // =========================

  if (
    answers.budget === "alto" &&
    answers.atmosphere === "tradicional"
  ) {
    scores["02"] += 5;
    scores["06"] += 5;
    scores["03"] += 3;
  }

  // =========================
  // PREMIUM MODERNO
  // =========================

  if (
    answers.budget === "alto" &&
    answers.atmosphere === "moderno"
  ) {
    scores["10"] += 5;
    scores["12"] += 4;
    scores["04"] += 3;
  }

  // =========================
  // FAMILIAR FUNCIONAL
  // =========================

  if (answers.atmosphere === "familiar") {
    scores["08"] += 4;
    scores["09"] += 4;
    scores["16"] += 4;
    scores["04"] += 3;
  }

  if (answers.services.includes("parques")) {
    scores["04"] += 3;
    scores["08"] += 2;
    scores["16"] += 2;
  }

  // =========================
  // MODERNO ACCESIBLE
  // =========================

  if (answers.budget === "ajustado") {
    scores["07"] += 3;
    scores["15"] += 3;
    scores["16"] += 2;
    scores["09"] += 2;
  }

  // =========================
  // TRANSPORTE Y CENTRO
  // =========================

  if (answers.transport >= 8) {
    scores["01"] += 2;
    scores["02"] += 2;
    scores["03"] += 2;
    scores["12"] += 2;
  }

  if (answers.center >= 8) {
    scores["01"] += 3;
    scores["02"] += 3;
    scores["03"] += 2;
  }

  if (answers.center <= 4) {
    scores["16"] += 2;
    scores["15"] += 2;
    scores["08"] += 1;
  }

  // =========================
  // TURÍSTICO VS LOCAL
  // =========================

  if (answers.tourism === "turistica") {
  scores["11"] += 5; // Poblats Marítims
  scores["12"] += 4; // Camins al Grau
  scores["10"] += 4; // Quatre Carreres
  scores["01"] += 2; // Ciutat Vella
}
  if (
  answers.tourism === "turistica" &&
  answers.atmosphere === "moderno" &&
  answers.center <= 5
) {
  scores["11"] += 4;
  scores["12"] += 4;
  scores["10"] += 3;
}

  if (answers.tourism === "local") {
    scores["14"] += 3;
    scores["08"] += 2;
    scores["15"] += 2;
  }

  const sorted = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return sorted.map(([district, score], index) => {
    const info = districtInfo[district];

    return {
      district,
      name: info?.name ?? district,
      description: info?.description ?? "",
      compatibility: 94 - index * 7,
      rawScore: score,
    };
  });
}