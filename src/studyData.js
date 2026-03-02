// Study sections (non-MENQOL): demographics, habits, health, gynecology
// Each section defines questions with type, options, help text, and conditional logic

export const SECTION_BASICS = {
  id: "basics",
  name: "Datos básicos",
  emoji: "📋",
  description: "Información antropométrica básica",
  estimatedMinutes: 1,
  questions: [
    {
      id: "age",
      type: "number",
      label: "Edad (años)",
      placeholder: "Ej: 52",
      min: 30, max: 85,
      required: true,
      help: "Tu edad actual en años cumplidos. Este estudio está dirigido a mujeres de 40 a 70 años."
    },
    {
      id: "weight",
      type: "number",
      label: "Peso (kg)",
      placeholder: "Ej: 65",
      min: 30, max: 200,
      step: 0.1,
      required: false,
      help: "Tu peso actual aproximado en kilogramos."
    },
    {
      id: "height",
      type: "number",
      label: "Talla (cm)",
      placeholder: "Ej: 165",
      min: 120, max: 210,
      required: false,
      help: "Tu estatura en centímetros. Se usará junto con el peso para calcular el Índice de Masa Corporal (IMC)."
    }
  ]
};

export const SECTION_DEMOGRAPHICS = {
  id: "demographics",
  name: "Datos sociodemográficos",
  emoji: "👤",
  description: "Información sobre tu situación personal",
  estimatedMinutes: 1,
  questions: [
    {
      id: "maritalStatus",
      type: "radio",
      label: "Estado civil",
      options: [
        { value: "single", label: "Soltera" },
        { value: "married", label: "Casada / en pareja" },
        { value: "separated", label: "Separada / divorciada" },
        { value: "widowed", label: "Viuda" }
      ],
      help: "Tu situación sentimental actual."
    },
    {
      id: "education",
      type: "radio",
      label: "Nivel de estudios",
      options: [
        { value: "primary", label: "Primarios" },
        { value: "secondary", label: "Secundarios (ESO/Bachillerato)" },
        { value: "vocational", label: "Formación profesional" },
        { value: "university", label: "Universitarios" },
        { value: "postgraduate", label: "Postgrado (máster/doctorado)" }
      ],
      help: "El nivel máximo de estudios completado."
    },
    {
      id: "employment",
      type: "radio",
      label: "Situación laboral",
      options: [
        { value: "working", label: "Trabajando" },
        { value: "unemployed", label: "Desempleada" },
        { value: "retired", label: "Jubilada" },
        { value: "homemaker", label: "Labores del hogar" },
        { value: "disability", label: "Incapacidad / baja larga" }
      ],
      help: "Tu situación laboral actual."
    },
    {
      id: "ethnicity",
      type: "radio",
      label: "Grupo étnico",
      options: [
        { value: "caucasian", label: "Caucásica / blanca" },
        { value: "hispanic", label: "Hispana / latina" },
        { value: "african", label: "Africana / afrodescendiente" },
        { value: "asian", label: "Asiática" },
        { value: "other", label: "Otro / prefiero no decirlo" }
      ],
      help: "Tu grupo étnico. Esta información ayuda a contextualizar los resultados en estudios de salud."
    }
  ]
};

export const SECTION_HABITS = {
  id: "habits",
  name: "Hábitos",
  emoji: "🚬",
  description: "Tabaco y alcohol",
  estimatedMinutes: 1,
  questions: [
    {
      id: "smoking",
      type: "radio",
      label: "Consumo de tabaco",
      options: [
        { value: "never", label: "Nunca he fumado" },
        { value: "former", label: "Exfumadora (dejé de fumar)" },
        { value: "occasional", label: "Fumadora ocasional" },
        { value: "daily", label: "Fumadora diaria" }
      ],
      help: "Tu relación con el tabaco. Incluye cigarrillos, tabaco de liar y vapeadores con nicotina."
    },
    // AUDIT-C: 3 questions for alcohol screening
    {
      id: "alcoholFreq",
      type: "radio",
      label: "¿Con qué frecuencia consumes bebidas alcohólicas?",
      options: [
        { value: "never", label: "Nunca" },
        { value: "monthly", label: "Una vez al mes o menos" },
        { value: "2-4month", label: "2-4 veces al mes" },
        { value: "2-3week", label: "2-3 veces por semana" },
        { value: "4+week", label: "4 o más veces por semana" }
      ],
      help: "Primera pregunta del test AUDIT-C. Incluye cerveza, vino, licores y combinados."
    },
    {
      id: "alcoholUnits",
      type: "radio",
      label: "Cuando bebes, ¿cuántas consumiciones tomas en un día normal?",
      options: [
        { value: "1-2", label: "1 o 2" },
        { value: "3-4", label: "3 o 4" },
        { value: "5-6", label: "5 o 6" },
        { value: "7-9", label: "7 a 9" },
        { value: "10+", label: "10 o más" }
      ],
      condition: { field: "alcoholFreq", notEqual: "never" },
      help: "Una consumición equivale a una cerveza (330ml), una copa de vino (150ml) o un combinado."
    },
    {
      id: "alcoholBinge",
      type: "radio",
      label: "¿Con qué frecuencia tomas 6 o más consumiciones en un solo día?",
      options: [
        { value: "never", label: "Nunca" },
        { value: "less_monthly", label: "Menos de una vez al mes" },
        { value: "monthly", label: "Mensualmente" },
        { value: "weekly", label: "Semanalmente" },
        { value: "daily", label: "A diario o casi a diario" }
      ],
      condition: { field: "alcoholFreq", notEqual: "never" },
      help: "Tercera pregunta del test AUDIT-C. Se refiere a ocasiones de consumo intenso."
    }
  ]
};

export const SECTION_HEALTH = {
  id: "health",
  name: "Antecedentes de salud",
  emoji: "🏥",
  description: "Condiciones médicas relevantes",
  estimatedMinutes: 3,
  questions: [
    {
      id: "hta",
      type: "yesno",
      label: "Hipertensión arterial",
      help: "Tensión arterial alta diagnosticada por un médico (≥140/90 mmHg). Incluye si tomas medicación para controlarla."
    },
    {
      id: "diabetes",
      type: "yesno",
      label: "Diabetes",
      help: "Diabetes tipo 1, tipo 2 o gestacional diagnosticada. Incluye prediabetes si fue diagnosticada."
    },
    {
      id: "dyslipidemia",
      type: "yesno",
      label: "Dislipemia (colesterol/triglicéridos altos)",
      help: "Niveles elevados de colesterol total, LDL o triglicéridos diagnosticados por análisis de sangre."
    },
    {
      id: "thyroid",
      type: "radio",
      label: "Problemas de tiroides",
      options: [
        { value: "no", label: "No" },
        { value: "hypo", label: "Hipotiroidismo" },
        { value: "hyper", label: "Hipertiroidismo" },
        { value: "other", label: "Otro problema tiroideo" }
      ],
      help: "Alteraciones en la función del tiroides. El hipotiroidismo (tiroides lenta) es más frecuente en mujeres."
    },
    {
      id: "pcos",
      type: "yesno",
      label: "Síndrome de ovario poliquístico (SOP)",
      help: "Diagnosticado por un ginecólogo. Puede incluir irregularidades menstruales, acné y aumento de vello."
    },
    {
      id: "depression",
      type: "radio",
      label: "Depresión",
      options: [
        { value: "no", label: "No" },
        { value: "past", label: "Sí, en el pasado" },
        { value: "current", label: "Sí, actualmente" }
      ],
      help: "Depresión diagnosticada por un profesional de salud mental, en cualquier momento de tu vida."
    },
    {
      id: "anxiety_dx",
      type: "radio",
      label: "Trastorno de ansiedad",
      options: [
        { value: "no", label: "No" },
        { value: "past", label: "Sí, en el pasado" },
        { value: "current", label: "Sí, actualmente" }
      ],
      help: "Ansiedad generalizada u otro trastorno de ansiedad diagnosticado."
    },
    {
      id: "osteoporosis",
      type: "yesno",
      label: "Osteoporosis u osteopenia",
      help: "Disminución de la densidad ósea diagnosticada por densitometría. La osteopenia es el estadio previo a la osteoporosis."
    },
    {
      id: "fractures",
      type: "yesno",
      label: "Fracturas por fragilidad",
      help: "Fracturas óseas producidas por traumatismos leves (caída de propia altura) en edad adulta. Incluye vértebras, cadera, muñeca."
    },
    {
      id: "corticoids",
      type: "yesno",
      label: "Uso prolongado de corticoides",
      help: "Tratamiento con corticoides (prednisona, cortisona, etc.) durante más de 3 meses seguidos. No incluye cremas ni inhaladores."
    },
    {
      id: "arthrosis",
      type: "yesno",
      label: "Artrosis",
      help: "Desgaste del cartílago articular diagnosticado. Frecuente en rodillas, caderas, manos y columna."
    },
    {
      id: "arthritis",
      type: "yesno",
      label: "Artritis reumatoide u otra artritis inflamatoria",
      help: "Enfermedad autoinmune que causa inflamación de las articulaciones, diferente de la artrosis."
    },
    {
      id: "seriousIllness",
      type: "radio",
      label: "¿Has tenido alguna enfermedad grave?",
      options: [
        { value: "no", label: "No" },
        { value: "cancer", label: "Cáncer" },
        { value: "cardiovascular", label: "Enfermedad cardiovascular" },
        { value: "other", label: "Otra enfermedad grave" }
      ],
      help: "Enfermedades importantes como cáncer (cualquier tipo), infarto, ictus u otras condiciones graves."
    },
    {
      id: "seriousIllnessDetail",
      type: "text",
      label: "Especifica cuál",
      placeholder: "Tipo de enfermedad",
      condition: { field: "seriousIllness", notEqual: "no" },
      help: "Indica brevemente qué enfermedad y cuándo fue diagnosticada."
    },
    {
      id: "currentMedications",
      type: "radio",
      label: "¿Tomas medicación de forma habitual?",
      options: [
        { value: "no", label: "No" },
        { value: "1-2", label: "1-2 medicamentos" },
        { value: "3-5", label: "3-5 medicamentos" },
        { value: "6+", label: "6 o más medicamentos" }
      ],
      help: "Medicamentos que tomas diariamente o de forma regular (no incluyas suplementos vitamínicos ni tratamientos puntuales)."
    }
  ]
};

export const SECTION_GYNECOLOGY = {
  id: "gynecology",
  name: "Historia ginecológica",
  emoji: "🩺",
  description: "Información sobre tu salud reproductiva",
  estimatedMinutes: 3,
  questions: [
    {
      id: "menarche",
      type: "number",
      label: "Edad de la primera menstruación (menarquia)",
      placeholder: "Ej: 12",
      min: 8, max: 20,
      help: "La edad a la que tuviste tu primera regla. El promedio es entre 11 y 13 años."
    },
    {
      id: "lastPeriod",
      type: "radio",
      label: "¿Cuándo fue tu última menstruación?",
      options: [
        { value: "current", label: "Dentro de los últimos 3 meses" },
        { value: "3-6months", label: "Hace 3-6 meses" },
        { value: "6-12months", label: "Hace 6-12 meses" },
        { value: "1-5years", label: "Hace 1-5 años" },
        { value: "5+years", label: "Hace más de 5 años" },
        { value: "surgical", label: "No tengo reglas por cirugía" }
      ],
      help: "Aproximadamente cuánto tiempo ha pasado desde tu último periodo menstrual."
    },
    {
      id: "irregularCycles",
      type: "radio",
      label: "En el último año, ¿has notado cambios en tus ciclos menstruales?",
      options: [
        { value: "regular", label: "Mis ciclos siguen siendo regulares" },
        { value: "variable", label: "Variaciones de más de 7 días entre ciclos" },
        { value: "skipping", label: "He saltado periodos (amenorrea >60 días)" },
        { value: "stopped", label: "Ya no tengo menstruación" },
        { value: "na", label: "No aplica (cirugía/tratamiento)" }
      ],
      condition: { field: "lastPeriod", notEqual: "surgical" },
      help: "Los cambios en la regularidad de los ciclos son uno de los primeros signos de la transición menopáusica."
    },
    {
      id: "pregnancies",
      type: "number",
      label: "Número de embarazos",
      placeholder: "0",
      min: 0, max: 20,
      help: "Total de embarazos, incluyendo los que no llegaron a término (abortos espontáneos o interrupciones)."
    },
    {
      id: "deliveries",
      type: "number",
      label: "Número de partos",
      placeholder: "0",
      min: 0, max: 15,
      help: "Partos a término (vaginales o cesáreas). No incluye abortos."
    },
    {
      id: "breastfeeding",
      type: "radio",
      label: "¿Has dado lactancia materna?",
      options: [
        { value: "no", label: "No" },
        { value: "less6m", label: "Sí, menos de 6 meses en total" },
        { value: "6-12m", label: "Sí, entre 6 y 12 meses en total" },
        { value: "12+m", label: "Sí, más de 12 meses en total" }
      ],
      help: "Duración total acumulada de lactancia materna (sumando todos los hijos)."
    },
    {
      id: "hysterectomy",
      type: "yesno",
      label: "¿Te han realizado una histerectomía?",
      help: "Extirpación quirúrgica del útero. Puede ser total (útero + cuello) o subtotal (solo cuerpo del útero)."
    },
    {
      id: "oophorectomy",
      type: "radio",
      label: "¿Te han extirpado los ovarios?",
      options: [
        { value: "no", label: "No" },
        { value: "unilateral", label: "Sí, uno (ooforectomía unilateral)" },
        { value: "bilateral", label: "Sí, ambos (ooforectomía bilateral)" }
      ],
      help: "La extirpación de ambos ovarios causa menopausia quirúrgica inmediata."
    },
    {
      id: "chemoRadio",
      type: "yesno",
      label: "¿Has recibido quimioterapia o radioterapia pélvica?",
      help: "Estos tratamientos pueden afectar la función ovárica y adelantar la menopausia."
    },
    {
      id: "contraceptives",
      type: "radio",
      label: "Uso de anticonceptivos hormonales",
      options: [
        { value: "never", label: "Nunca" },
        { value: "past", label: "En el pasado" },
        { value: "current", label: "Actualmente" }
      ],
      help: "Píldora, parche, anillo, DIU hormonal, implante u otros métodos hormonales."
    },
    {
      id: "thm",
      type: "radio",
      label: "Tratamiento hormonal de la menopausia (THM)",
      options: [
        { value: "never", label: "Nunca" },
        { value: "past", label: "En el pasado" },
        { value: "current", label: "Actualmente" }
      ],
      help: "Terapia hormonal sustitutiva prescrita para síntomas de menopausia (estrógenos, progesterona, tibolona, etc.)."
    },
    {
      id: "thmDuration",
      type: "radio",
      label: "Duración del tratamiento hormonal",
      options: [
        { value: "less1y", label: "Menos de 1 año" },
        { value: "1-3y", label: "1-3 años" },
        { value: "3-5y", label: "3-5 años" },
        { value: "5+y", label: "Más de 5 años" }
      ],
      condition: { field: "thm", notEqual: "never" },
      help: "Duración total del tratamiento hormonal de la menopausia."
    }
  ]
};

// Quick version: reduced set of key questions about reproductive stage and health
export const SECTION_QUICK_STAGE = {
  id: "quickStage",
  name: "Tu etapa",
  emoji: "🔄",
  description: "Información sobre tu etapa reproductiva",
  estimatedMinutes: 1,
  questions: [
    {
      id: "lastPeriod",
      type: "radio",
      label: "¿Cuándo fue tu última menstruación?",
      options: [
        { value: "current", label: "Dentro de los últimos 3 meses" },
        { value: "3-6months", label: "Hace 3-6 meses" },
        { value: "6-12months", label: "Hace 6-12 meses" },
        { value: "1-5years", label: "Hace 1-5 años" },
        { value: "5+years", label: "Hace más de 5 años" },
        { value: "surgical", label: "No tengo reglas por cirugía/tratamiento" }
      ],
      help: "Aproximadamente cuánto tiempo ha pasado desde tu último periodo menstrual."
    },
    {
      id: "irregularCycles",
      type: "radio",
      label: "En el último año, ¿has notado cambios en tus ciclos?",
      options: [
        { value: "regular", label: "Mis ciclos siguen siendo regulares" },
        { value: "variable", label: "Variaciones de más de 7 días entre ciclos" },
        { value: "skipping", label: "He saltado periodos (amenorrea >60 días)" },
        { value: "stopped", label: "Ya no tengo menstruación" },
        { value: "na", label: "No aplica" }
      ],
      condition: { field: "lastPeriod", notEqual: "surgical" },
      help: "Los cambios en la regularidad son uno de los primeros signos de la transición menopáusica."
    },
    {
      id: "hysterectomy",
      type: "yesno",
      label: "¿Te han realizado una histerectomía?",
      help: "Extirpación quirúrgica del útero."
    },
    {
      id: "oophorectomy",
      type: "radio",
      label: "¿Te han extirpado los ovarios?",
      options: [
        { value: "no", label: "No" },
        { value: "unilateral", label: "Sí, uno" },
        { value: "bilateral", label: "Sí, ambos" }
      ],
      help: "La extirpación de ambos ovarios causa menopausia quirúrgica inmediata."
    }
  ]
};

export const SECTION_QUICK_HEALTH = {
  id: "quickHealth",
  name: "Salud y hábitos",
  emoji: "💊",
  description: "Información clave sobre tu salud",
  estimatedMinutes: 1,
  questions: [
    {
      id: "thm",
      type: "radio",
      label: "Tratamiento hormonal de la menopausia (THM)",
      options: [
        { value: "never", label: "Nunca" },
        { value: "past", label: "En el pasado" },
        { value: "current", label: "Actualmente" }
      ],
      help: "Terapia hormonal sustitutiva prescrita para síntomas de menopausia."
    },
    {
      id: "depression",
      type: "radio",
      label: "¿Has tenido depresión diagnosticada?",
      options: [
        { value: "no", label: "No" },
        { value: "past", label: "Sí, en el pasado" },
        { value: "current", label: "Sí, actualmente" }
      ],
      help: "Depresión diagnosticada por un profesional de salud mental."
    },
    {
      id: "hta",
      type: "yesno",
      label: "¿Tienes hipertensión arterial?",
      help: "Tensión arterial alta diagnosticada por un médico."
    },
    {
      id: "smoking",
      type: "radio",
      label: "Consumo de tabaco",
      options: [
        { value: "never", label: "Nunca he fumado" },
        { value: "former", label: "Exfumadora" },
        { value: "current", label: "Fumadora activa" }
      ],
      help: "Tu relación con el tabaco."
    },
    {
      id: "physicalActivity",
      type: "radio",
      label: "¿Cómo describirías tu nivel de actividad física habitual?",
      options: [
        { value: "sedentary", label: "Sedentaria (poco o nada de ejercicio)" },
        { value: "light", label: "Ligera (paseos, tareas del hogar)" },
        { value: "moderate", label: "Moderada (ejercicio 2-3 veces/semana)" },
        { value: "active", label: "Activa (ejercicio 4+ veces/semana)" }
      ],
      help: "Una autoevaluación general de cuánto te mueves en una semana típica."
    }
  ]
};

// Helper to check if a question's condition is met
export function isConditionMet(question, sectionAnswers) {
  if (!question.condition) return true;
  const { field, notEqual, equal } = question.condition;
  const value = sectionAnswers[field];
  if (notEqual !== undefined) return value !== notEqual;
  if (equal !== undefined) return value === equal;
  return true;
}

// Count visible (condition-met) questions in a section
export function countVisibleQuestions(section, sectionAnswers) {
  return section.questions.filter(q => isConditionMet(q, sectionAnswers)).length;
}
