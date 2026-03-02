// STRAW+10 simplified classification of reproductive stage
// Based on Stages of Reproductive Aging Workshop + 10

export function classifyReproductiveStage(gynecology) {
  if (!gynecology) return null;

  const { lastPeriod, irregularCycles, oophorectomy, hysterectomy, chemoRadio } = gynecology;

  // Surgical menopause
  if (oophorectomy === "bilateral") {
    return {
      stage: "surgical_menopause",
      label: "Menopausia quirúrgica",
      description: "La extirpación de ambos ovarios produce una menopausia inmediata.",
      color: "#8B5CF6",
      bg: "#F5F3FF"
    };
  }

  // Chemo/radio-induced menopause
  if (chemoRadio === true && (lastPeriod === "1-5years" || lastPeriod === "5+years")) {
    return {
      stage: "induced_menopause",
      label: "Menopausia inducida",
      description: "La quimioterapia o radioterapia pélvica puede producir una menopausia prematura.",
      color: "#8B5CF6",
      bg: "#F5F3FF"
    };
  }

  // No period data or surgical absence without bilateral oophorectomy
  if (lastPeriod === "surgical") {
    if (hysterectomy === true) {
      return {
        stage: "hysterectomy",
        label: "Histerectomía (sin ovarios extirpados)",
        description: "La histerectomía sin extirpación de ovarios no causa menopausia, pero impide usar la menstruación como indicador. La función ovárica puede continuar.",
        color: "#94A3B8",
        bg: "#F8FAFC"
      };
    }
    return {
      stage: "unknown",
      label: "No clasificable",
      description: "Sin menstruación por causa quirúrgica o tratamiento. No se puede determinar la etapa usando criterios menstruales.",
      color: "#94A3B8",
      bg: "#F8FAFC"
    };
  }

  // Postmenopause: no period for ≥12 months
  if (lastPeriod === "1-5years" || lastPeriod === "5+years") {
    return {
      stage: "postmenopause",
      label: "Postmenopausia",
      description: "Llevas más de 12 meses sin menstruación. La menopausia se confirma tras 12 meses consecutivos de amenorrea.",
      color: "#7C9CE8",
      bg: "#EEF2FF"
    };
  }

  // Late perimenopause: amenorrhea 60 days to 12 months
  if (lastPeriod === "6-12months" || irregularCycles === "skipping") {
    return {
      stage: "late_perimenopause",
      label: "Perimenopausia tardía",
      description: "Has experimentado periodos de amenorrea de más de 60 días. Estás en la fase tardía de la transición menopáusica.",
      color: "#F59E0B",
      bg: "#FFFBEB"
    };
  }

  // Early perimenopause: cycle variability ≥7 days
  if (lastPeriod === "3-6months" || irregularCycles === "variable") {
    return {
      stage: "early_perimenopause",
      label: "Perimenopausia temprana",
      description: "Tus ciclos están empezando a ser irregulares con variaciones de más de 7 días. Estás en las primeras etapas de la transición menopáusica.",
      color: "#22C55E",
      bg: "#F0FDF4"
    };
  }

  // Premenopause: regular cycles
  if (lastPeriod === "current" && (irregularCycles === "regular" || !irregularCycles)) {
    return {
      stage: "premenopause",
      label: "Premenopausia",
      description: "Tus ciclos menstruales siguen siendo regulares. Aún no has iniciado la transición menopáusica.",
      color: "#22C55E",
      bg: "#F0FDF4"
    };
  }

  // If current period but irregular
  if (lastPeriod === "current" && irregularCycles === "variable") {
    return {
      stage: "early_perimenopause",
      label: "Perimenopausia temprana",
      description: "Sigues teniendo menstruaciones pero con variaciones. Estás en las primeras etapas de la transición menopáusica.",
      color: "#22C55E",
      bg: "#F0FDF4"
    };
  }

  if (irregularCycles === "stopped") {
    return {
      stage: "postmenopause",
      label: "Postmenopausia",
      description: "Tu menstruación se ha detenido. Si llevas más de 12 meses sin regla, se confirma la menopausia.",
      color: "#7C9CE8",
      bg: "#EEF2FF"
    };
  }

  return {
    stage: "unknown",
    label: "No determinado",
    description: "Con la información proporcionada no se puede clasificar con certeza tu etapa reproductiva.",
    color: "#94A3B8",
    bg: "#F8FAFC"
  };
}

// Calculate BMI from weight (kg) and height (cm)
export function calculateBMI(weight, height) {
  if (!weight || !height || height < 100) return null;
  const heightM = height / 100;
  const bmi = weight / (heightM * heightM);
  return {
    value: Math.round(bmi * 10) / 10,
    category: bmi < 18.5 ? "Bajo peso" :
              bmi < 25 ? "Normopeso" :
              bmi < 30 ? "Sobrepeso" :
              "Obesidad",
    color: bmi < 18.5 ? "#F59E0B" :
           bmi < 25 ? "#22C55E" :
           bmi < 30 ? "#F59E0B" :
           "#EF4444"
  };
}
