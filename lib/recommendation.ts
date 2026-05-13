export type Answers = {
  lifeStyle: string;
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

  if (answers.lifeStyle === "urbana") PC1 += 1.2;
  if (answers.lifeStyle === "equilibrada") PC1 += 0.4;
  if (answers.lifeStyle === "tranquila") PC1 -= 1;

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
  type DistrictCode =
    | "01" | "02" | "03" | "04" | "05"
    | "06" | "07" | "08" | "09" | "10"
    | "11" | "12" | "13" | "14" | "15"
    | "16" | "17" | "18" | "19";

  type PCVector = {
    p1: number; p2: number; p3: number; p4: number;
    p5: number; p6: number; p7: number; p8: number;
  };

  const scores: Record<DistrictCode, number> = {
    "01": 0, "02": 0, "03": 0, "04": 0, "05": 0,
    "06": 0, "07": 0, "08": 0, "09": 0, "10": 0,
    "11": 0, "12": 0, "13": 0, "14": 0, "15": 0,
    "16": 0, "17": 0, "18": 0, "19": 0,
  };

  const PCA_SCORES: Record<DistrictCode, PCVector> = {
    "01": { p1: -1.103429, p2: 6.406931, p3: 0.934798, p4: -0.964649, p5: -0.207824, p6: -0.965307, p7: -0.147733, p8: 0.169553 },
    "02": { p1: -3.212679, p2: -0.373555, p3: -2.089474, p4: -0.089728, p5: 0.214602, p6: -0.698118, p7: 0.03573, p8: -0.550906 },
    "03": { p1: -3.296822, p2: 0.654648, p3: -0.889224, p4: 0.516037, p5: -0.19609, p6: 1.166108, p7: 0.793783, p8: -0.493963 },
    "04": { p1: -0.895856, p2: -0.312436, p3: -0.673895, p4: 1.652756, p5: -0.78366, p6: 0.121529, p7: -1.295504, p8: -0.139889 },
    "05": { p1: 0.135739, p2: 0.395616, p3: 2.244709, p4: 0.181378, p5: -2.023804, p6: 0.508502, p7: -0.016744, p8: -1.116584 },
    "06": { p1: -3.099279, p2: -1.373069, p3: 0.153941, p4: -0.276436, p5: 0.448385, p6: -0.934556, p7: -0.061219, p8: -0.039413 },
    "07": { p1: -1.153444, p2: -0.964373, p3: -0.153416, p4: 0.663965, p5: -0.668057, p6: -0.934688, p7: 1.809185, p8: 0.492239 },
    "08": { p1: -1.085359, p2: -0.001822, p3: -1.074993, p4: 0.6398, p5: -0.777404, p6: -0.647485, p7: -0.545936, p8: 0.861872 },
    "09": { p1: -1.3577, p2: 0.945034, p3: -1.436605, p4: 0.316616, p5: 1.02605, p6: 2.215072, p7: -0.062075, p8: 0.241425 },
    "10": { p1: 5.251289, p2: -0.012595, p3: -3.732143, p4: -2.238876, p5: -0.830071, p6: -0.052206, p7: 0.387845, p8: -0.289112 },
    "11": { p1: 1.789999, p2: -1.188111, p3: 2.41586, p4: -1.698058, p5: 0.003899, p6: 0.060126, p7: -0.188148, p8: -0.081654 },
    "12": { p1: -1.108785, p2: -1.37925, p3: -0.467573, p4: -1.733605, p5: 1.112346, p6: -0.477031, p7: -0.891003, p8: -0.874955 },
    "13": { p1: -1.075286, p2: 0.029703, p3: 1.31559, p4: -1.460705, p5: 1.643318, p6: 0.89555, p7: 0.296734, p8: 0.637343 },
    "14": { p1: -1.537407, p2: -2.085018, p3: 1.040679, p4: 0.025968, p5: 0.01649, p6: -0.541142, p7: 0.149306, p8: 0.115391 },
    "15": { p1: 1.870856, p2: -0.987951, p3: 1.924489, p4: -0.495517, p5: 0.026081, p6: 0.141254, p7: -0.045678, p8: 0.510804 },
    "16": { p1: 1.810409, p2: -0.190819, p3: 0.82232, p4: 0.455987, p5: -1.079789, p6: 0.871338, p7: 0.284321, p8: -0.151598 },
    "17": { p1: 4.192408, p2: 0.821093, p3: 0.456961, p4: 2.734206, p5: 2.205943, p6: -0.656544, p7: 0.351521, p8: -0.940266 },
    "18": { p1: 1.288841, p2: -0.648857, p3: -0.366436, p4: 1.356428, p5: -0.714821, p6: 0.174892, p7: -0.615198, p8: 0.713167 },
    "19": { p1: 2.586504, p2: 0.264833, p3: -0.425585, p4: 0.414433, p5: 0.584407, p6: -0.247295, p7: -0.239185, p8: 0.936546 }
  };

  const add = (districts: DistrictCode[], value: number) =>
    districts.forEach((d) => (scores[d] += value));

  const penalize = (districts: DistrictCode[], value: number) =>
    districts.forEach((d) => (scores[d] -= value));

  const GROUPS = {
    centroHistorico: ["01", "02", "03", "06"] as DistrictCode[],
    centroFuncional: ["01", "03", "05", "09"] as DistrictCode[],
    modernoUrbano: ["10", "12"] as DistrictCode[],
    jovenUniversitario: ["13", "14", "07"] as DistrictCode[],
    familiarResidencial: ["04", "08", "09", "15", "16"] as DistrictCode[],
    perifericoTranquilo: ["17", "18", "19", "16"] as DistrictCode[],
    turisticoOcio: ["01", "10", "11", "12"] as DistrictCode[],
    localBarrio: ["04", "05", "07", "08", "09", "13", "14", "15", "16", "17", "18", "19"] as DistrictCode[],
    ajustado: ["07", "08", "09", "13", "14", "15", "16", "18"] as DistrictCode[],
    premiumClasico: ["02", "03", "06"] as DistrictCode[],
    premiumModerno: ["10", "12"] as DistrictCode[],
  };

  const target: PCVector = {
    p1: 0, p2: 0, p3: 0, p4: 0,
    p5: 0, p6: 0, p7: 0, p8: 0,
  };

  const addTarget = (pc: keyof PCVector, value: number) => {
    target[pc] += value;
  };

  if (answers.lifeStyle === "urbana") {
    addTarget("p1", 0.6);
    addTarget("p2", 0.4);
    addTarget("p6", 0.3);
  }

  if (answers.lifeStyle === "equilibrada") {
    addTarget("p5", 0.3);
    addTarget("p6", 0.3);
  }

  if (answers.lifeStyle === "tranquila") {
    addTarget("p4", 0.5);
    addTarget("p5", 0.4);
    addTarget("p1", -0.3);
  }

  const transportWeight = (answers.transport - 5) / 5;
  addTarget("p1", transportWeight * 0.3);
  addTarget("p6", transportWeight * 0.4);
  addTarget("p7", transportWeight * 0.2);

  const centerWeight = (answers.center - 5) / 5;
  addTarget("p2", centerWeight * 0.35);
  addTarget("p1", centerWeight * 0.25);
  addTarget("p4", centerWeight * -0.25);

  if (answers.budget === "ajustado") {
    addTarget("p3", 0.5);
    addTarget("p7", 0.4);
    addTarget("p5", -0.3);
  }

  if (answers.budget === "medio") {
    addTarget("p6", 0.2);
    addTarget("p8", 0.2);
  }

  if (answers.budget === "alto") {
    addTarget("p5", 0.5);
    addTarget("p3", -0.4);
    addTarget("p4", -0.25);
  }

  if (answers.atmosphere === "joven") {
    addTarget("p7", 0.45);
    addTarget("p3", 0.25);
  }

  if (answers.atmosphere === "familiar") {
    addTarget("p4", 0.4);
    addTarget("p5", 0.35);
  }

  if (answers.atmosphere === "tradicional") {
    addTarget("p2", 0.35);
    addTarget("p5", 0.25);
  }

  if (answers.atmosphere === "moderno") {
    addTarget("p6", 0.4);
    addTarget("p8", 0.25);
  }

  if (answers.services.includes("ocio")) {
    addTarget("p1", 0.25);
    addTarget("p6", 0.2);
    addTarget("p8", 0.2);
  }

  if (answers.services.includes("comercios")) {
    addTarget("p1", 0.3);
    addTarget("p2", -0.2);
  }

  if (answers.services.includes("parques")) {
    addTarget("p4", 0.35);
    addTarget("p5", 0.25);
  }

  if (answers.services.includes("servicios_publicos")) {
    addTarget("p3", 0.35);
    addTarget("p5", 0.3);
    addTarget("p6", 0.25);
  }

  if (answers.tourism === "turistica") {
    addTarget("p3", 0.25);
    addTarget("p8", -0.25);
  }

  if (answers.tourism === "local") {
    addTarget("p4", 0.35);
    addTarget("p5", 0.25);
    addTarget("p8", 0.2);
  }

  const pcWeights: PCVector = {
    p1: 0.25, p2: 0.22, p3: 0.18, p4: 0.15,
    p5: 0.12, p6: 0.10, p7: 0.08, p8: 0.06,
  };

  const normalize = (value: number) => Math.tanh(value / 2.5);

  for (const district of Object.keys(scores) as DistrictCode[]) {
    const vector = PCA_SCORES[district];
    let pcaScore = 0;

    for (const pc of Object.keys(target) as (keyof PCVector)[]) {
      pcaScore += target[pc] * normalize(vector[pc]) * pcWeights[pc];
    }

    scores[district] += pcaScore * 1.2;
  }

  if (answers.budget === "ajustado") {
    add(GROUPS.ajustado, 4);
    penalize([...GROUPS.premiumClasico, ...GROUPS.premiumModerno, "01"], 3);
  }

  if (answers.budget === "medio") {
    add([...GROUPS.familiarResidencial, ...GROUPS.jovenUniversitario, ...GROUPS.modernoUrbano], 2);
    penalize(["01", "02", "06"], 1.5);
  }

  if (answers.budget === "alto") {
    add([...GROUPS.premiumClasico, ...GROUPS.premiumModerno], 3.2);

    if (answers.atmosphere === "tradicional") add(GROUPS.premiumClasico, 2.2);
    if (answers.atmosphere === "moderno") add(GROUPS.premiumModerno, 2.2);
    if (answers.center >= 8) add(["01", ...GROUPS.premiumClasico], 1.8);

    penalize(["07", "15", "16", "18", "19"], 3.5);
  }

  if (answers.lifeStyle === "urbana") {
    add([...GROUPS.centroHistorico, ...GROUPS.modernoUrbano, ...GROUPS.jovenUniversitario], 3);
  }

  if (answers.lifeStyle === "equilibrada") {
    add([...GROUPS.modernoUrbano, ...GROUPS.jovenUniversitario, ...GROUPS.familiarResidencial], 2.5);
  }

  if (answers.lifeStyle === "tranquila") {
    add([...GROUPS.familiarResidencial, ...GROUPS.perifericoTranquilo], 4);
    penalize([...GROUPS.turisticoOcio, "01"], 3);
  }

  if (answers.atmosphere === "joven") {
    add([...GROUPS.jovenUniversitario, ...GROUPS.modernoUrbano], 4);
    penalize(["01", "02", "06"], 2);
  }

  if (answers.atmosphere === "familiar") {
    add([...GROUPS.familiarResidencial, ...GROUPS.perifericoTranquilo], 4);
    penalize(["01", "11", "12"], 2.5);
  }

  if (answers.atmosphere === "tradicional") {
    add([...GROUPS.centroHistorico, "05", "08"], 3.5);
  }

  if (answers.atmosphere === "moderno") {
    add([...GROUPS.modernoUrbano, ...GROUPS.jovenUniversitario, "16"], 3.5);
  }

  if (answers.center >= 8) {
    add([...GROUPS.centroHistorico, ...GROUPS.centroFuncional], 3);
    penalize(GROUPS.perifericoTranquilo, 3);
  }

  if (answers.center <= 4) {
    add([...GROUPS.perifericoTranquilo, ...GROUPS.familiarResidencial], 3.5);
    penalize(GROUPS.centroHistorico, 3);
  }

  if (answers.transport >= 8) {
    add(["01", "03", "09", "10", "12", "13"], 2.5);
  }

  if (answers.transport <= 4) {
    add([...GROUPS.familiarResidencial, ...GROUPS.perifericoTranquilo], 1.5);
    penalize(["01", "03", "12"], 1.5);
  }

  if (answers.services.includes("ocio")) {
    add([...GROUPS.turisticoOcio, ...GROUPS.jovenUniversitario], 2.5);
  }

  if (answers.services.includes("comercios")) {
    add(["02", "03", "08", "09", "10", "12", "13", "14", "15"], 2);
  }

  if (answers.services.includes("parques")) {
    add([...GROUPS.familiarResidencial, ...GROUPS.perifericoTranquilo, "06"], 2.5);
    penalize(["01"], 1.5);
  }

  if (answers.services.includes("servicios_publicos")) {
    add(["05", "08", "09", "10", "15", "16", "17", "18", "19"], 2);
  }

  if (answers.tourism === "turistica") {
    add(GROUPS.turisticoOcio, 3);
  }

  if (answers.tourism === "local") {
    add(GROUPS.localBarrio, 3);
    penalize(["01", "11"], 2.5);
  }

  if (answers.lifeStyle === "tranquila" || answers.atmosphere === "familiar") {
    penalize(["01"], 2.2);
  }

  if (answers.tourism === "local") {
    penalize(["01"], 1.5);
    penalize(["01", "11", "12"], 2);
  }

  if (answers.budget === "ajustado") {
    penalize(["01", "02", "06", "10", "12"], 3);
  }

  if (answers.center >= 8) {
    penalize(["16", "17", "18", "19"], 3);
  }

  if (answers.atmosphere === "joven" && answers.budget !== "alto") {
    add(["13", "14", "07"], 3.5);
  }

  if (answers.atmosphere === "moderno" && answers.lifeStyle !== "tranquila") {
    add(["10", "12", "13"], 3);
  }

  if (answers.atmosphere === "familiar" && answers.center <= 5) {
    add(["04", "08", "15", "16", "17", "18", "19"], 3);
  }

  if (answers.budget === "alto" && answers.center >= 7) {
    add(["02", "03", "06", "01"], 3);
  }

  if (
    answers.lifeStyle === "equilibrada" &&
    answers.center >= 4 &&
    answers.center <= 7
  ) {
    add(["04", "08", "09", "10", "12", "13", "14", "15", "16"], 1.8);
    penalize(["01", "17", "18", "19"], 1.2);
  }

  if (
    answers.lifeStyle === "tranquila" &&
    answers.budget === "alto" &&
    answers.atmosphere === "familiar"
  ) {
    add(["06", "02", "04", "03", "08"], 6);
    penalize(["15", "16", "17", "18", "19"], 5);
    penalize(["07", "09", "13", "14"], 2);
  }

  const sorted = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const maxScore = Math.max(...Object.values(scores));
  const minScore = Math.min(...Object.values(scores));

  return sorted.map(([district, score], index) => {
    const info = districtInfo[district];

    const compatibility =
      maxScore === minScore
        ? 85 - index * 5
        : Math.round(72 + ((score - minScore) / (maxScore - minScore)) * 24);

    return {
      district,
      name: info?.name ?? district,
      description: info?.description ?? "",
      compatibility,
      rawScore: Number(score.toFixed(3)),
    };
  });
}