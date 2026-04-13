// Study sections (non-MENQOL): demographics, habits, health, gynecology
// Updated with CS questionnaire questions - all text directed at women

export const SECTION_BASICS = {
  id: "basics",
  name: "Datos personales",
  emoji: "📋",
  description: "Información personal básica",
  estimatedMinutes: 2,
  questions: [
    {
      id: "nombre",
      type: "text",
      label: "Nombre",
      placeholder: "Tu nombre",
      required: true,
      help: "Tu nombre de pila."
    },
    {
      id: "apellido",
      type: "text",
      label: "Apellido",
      placeholder: "Tu apellido",
      required: true,
      help: "Tu primer apellido."
    },
    {
      id: "email",
      type: "text",
      label: "Email",
      placeholder: "tucorreo@ejemplo.com",
      required: true,
      help: "Tu dirección de correo electrónico."
    },
    {
      id: "age",
      type: "select",
      label: "Edad (años)",
      options: Array.from({ length: 31 }, (_, i) => ({ value: String(i + 40), label: `${i + 40} años` })),
      required: true,
      help: "Tu edad actual en años cumplidos. Este estudio está dirigido a mujeres de 40 a 70 años."
    },
    {
      id: "weight",
      type: "select",
      label: "Peso (kg)",
      options: Array.from({ length: 271 }, (_, i) => ({ value: String(i + 30), label: `${i + 30} kg` })),
      required: false,
      help: "Tu peso actual aproximado en kilogramos."
    },
    {
      id: "height",
      type: "select",
      label: "Talla (cm)",
      options: Array.from({ length: 171 }, (_, i) => ({ value: String(i + 80), label: `${i + 80} cm` })),
      required: false,
      help: "Tu estatura en centímetros."
    }
  ]
};

export const SECTION_DEMOGRAPHICS = {
  id: "demographics",
  name: "Datos sociodemográficos",
  emoji: "👤",
  description: "Información sobre tu situación personal",
  estimatedMinutes: 2,
  questions: [
    {
      id: "maritalStatus",
      type: "radio",
      label: "Estado civil / Situación de convivencia",
      options: [
        { value: "single", label: "Soltera" },
        { value: "married", label: "Casada / Pareja de hecho" },
        { value: "separated", label: "Divorciada / Separada" },
        { value: "widowed", label: "Viuda" }
      ],
      help: "Tu situación sentimental o de convivencia actual."
    },
    {
      id: "education",
      type: "radio",
      label: "Nivel máximo de estudios completados",
      options: [
        { value: "none", label: "Sin estudios / Estudios incompletos" },
        { value: "primary", label: "Estudios primarios" },
        { value: "secondary", label: "Estudios secundarios / Bachillerato / Formación Profesional" },
        { value: "university", label: "Estudios universitarios o superiores" }
      ],
      help: "El nivel máximo de estudios que has completado."
    },
    {
      id: "employment",
      type: "radio",
      label: "Situación laboral actual",
      options: [
        { value: "working", label: "Trabajando (cuenta ajena o propia)" },
        { value: "unemployed", label: "En situación de desempleo" },
        { value: "homemaker", label: "Labores del hogar" },
        { value: "retired", label: "Jubilada / Pensionista" },
        { value: "disability", label: "Incapacidad laboral" }
      ],
      help: "Tu situación laboral actual."
    },
    {
      id: "ethnicity",
      type: "radio",
      label: "¿Con qué grupo étnico o de origen se identifica principalmente?",
      options: [
        { value: "caucasian", label: "Blanca / Caucásica (origen europeo)" },
        { value: "arab", label: "Árabe / Magrebí / Oriente Medio" },
        { value: "hispanic", label: "Hispana / Latina" },
        { value: "african", label: "Negra / Afrodescendiente" },
        { value: "asian", label: "Asiática" },
        { value: "romani", label: "Gitana / Pueblo Rom" },
        { value: "mixed", label: "Mestiza / Multirracial" },
        { value: "other", label: "Otro" },
        { value: "prefer_not", label: "Prefiero no contestar" }
      ],
      help: "Marque solo una opción."
    }
  ]
};

export const SECTION_HABITS = {
  id: "habits",
  name: "Hábitos",
  emoji: "🚬",
  description: "Tabaco, alcohol y actividad física",
  estimatedMinutes: 2,
  questions: [
    {
      id: "smoking",
      type: "radio",
      label: "Consumo de tabaco",
      options: [
        { value: "never", label: "Nunca he fumado" },
        { value: "former", label: "Exfumadora (hace más de 1 año)" },
        { value: "current", label: "Fumadora actual" }
      ],
      help: "Tu relación actual con el tabaco."
    },
    {
      id: "smokingAmount",
      type: "select",
      label: "Indique cuántos cigarrillos al día",
      options: Array.from({ length: 100 }, (_, i) => ({ value: String(i + 1), label: `${i + 1} ${i + 1 === 1 ? "cigarrillo" : "cigarrillos"}` })),
      condition: { field: "smoking", equal: "current" },
      help: "Número aproximado de cigarrillos al día."
    },
    {
      id: "alcoholFreq",
      type: "radio",
      label: "¿Con qué frecuencia consume alguna bebida alcohólica?",
      options: [
        { value: "never", label: "Nunca" },
        { value: "monthly", label: "Una vez al mes o menos" },
        { value: "2-4month", label: "De 2 a 4 veces al mes" },
        { value: "2-3week", label: "De 2 a 3 veces a la semana" },
        { value: "4+week", label: "4 o más veces a la semana" }
      ],
      help: "Incluye cerveza, vino, licores y combinados. Si nunca consume alcohol, pase a la siguiente sección."
    },
    {
      id: "alcoholUnits",
      type: "radio",
      label: "¿Cuántas consumiciones/unidades de bebidas alcohólicas suele tomar en un día de consumo normal?",
      options: [
        { value: "1-2", label: "1 o 2" },
        { value: "3-4", label: "3 o 4" },
        { value: "5-6", label: "5 o 6" },
        { value: "7-9", label: "7 a 9" },
        { value: "10+", label: "10 o más" }
      ],
      condition: { field: "alcoholFreq", notEqual: "never" },
      help: "Una unidad equivale a una copa de vino, una caña de cerveza o un chupito de licor."
    },
    {
      id: "alcoholBinge",
      type: "radio",
      label: "¿Con qué frecuencia toma 4 o más consumiciones de alcohol en un solo día o en una misma ocasión?",
      options: [
        { value: "never", label: "Nunca" },
        { value: "less_monthly", label: "Menos de una vez al mes" },
        { value: "monthly", label: "Mensualmente" },
        { value: "weekly", label: "Semanalmente" },
        { value: "daily", label: "A diario o casi a diario" }
      ],
      condition: { field: "alcoholFreq", notEqual: "never" },
      help: "Se refiere a ocasiones de consumo intenso en un corto período de tiempo."
    },
    {
      id: "physicalActivity",
      type: "radio",
      label: "¿Actualmente realiza ejercicio físico con regularidad (2 o más veces a la semana)?",
      options: [
        { value: "none", label: "No realizo ejercicio" },
        { value: "aerobic", label: "Sí, principalmente aeróbico o cardiovascular (correr, nadar, ciclismo o similares)" },
        { value: "strength", label: "Sí, principalmente de fuerza (máquinas, pesas, gomas o peso corporal)" },
        { value: "combined", label: "Sí, una combinación de ejercicio aeróbico y de fuerza" }
      ],
      help: "Indique qué tipo de ejercicio realiza predominantemente."
    }
  ]
};

export const SECTION_HEALTH = {
  id: "health",
  name: "Antecedentes de salud",
  emoji: "🏥",
  description: "Condiciones médicas relevantes",
  estimatedMinutes: 4,
  questions: [
    {
      id: "hta",
      type: "radio",
      label: "Hipertensión arterial diagnosticada por un médico",
      options: [
        { value: "no", label: "No" },
        { value: "yes_no_tx", label: "Sí, sin tratamiento farmacológico" },
        { value: "yes_tx", label: "Sí, en tratamiento farmacológico" }
      ],
      help: "Tensión arterial alta diagnosticada por un médico."
    },
    {
      id: "diabetes",
      type: "radio",
      label: "Diabetes Tipo II",
      options: [
        { value: "no", label: "No" },
        { value: "yes_no_tx", label: "Sí, sin tratamiento farmacológico" },
        { value: "yes_tx", label: "Sí, en tratamiento farmacológico" }
      ],
      help: "Diabetes tipo 2 diagnosticada por un médico."
    },
    {
      id: "dyslipidemia",
      type: "radio",
      label: "Hipercolesterolemia / Dislipemia (Colesterol o triglicéridos altos)",
      options: [
        { value: "no", label: "No" },
        { value: "yes_no_tx", label: "Sí, sin tratamiento farmacológico" },
        { value: "yes_tx", label: "Sí, en tratamiento farmacológico" }
      ],
      help: "Niveles elevados de colesterol o triglicéridos diagnosticados."
    },
    {
      id: "cardiovascular",
      type: "yesno",
      label: "Eventos cardiovasculares previos (Infarto, angina, ictus/accidente cerebrovascular)",
      help: "Indica si has sufrido algún evento cardiovascular grave."
    },
    {
      id: "hypothyroidism",
      type: "radio",
      label: "Hipotiroidismo",
      options: [
        { value: "no", label: "No" },
        { value: "yes_no_tx", label: "Sí, sin tratamiento farmacológico" },
        { value: "yes_tx", label: "Sí, en tratamiento farmacológico" }
      ],
      help: "Función tiroidea reducida diagnosticada por un médico."
    },
    {
      id: "hyperthyroidism",
      type: "radio",
      label: "Hipertiroidismo",
      options: [
        { value: "no", label: "No" },
        { value: "yes_no_tx", label: "Sí, sin tratamiento farmacológico" },
        { value: "yes_tx", label: "Sí, en tratamiento farmacológico" }
      ],
      help: "Función tiroidea excesiva diagnosticada por un médico."
    },
    {
      id: "pcos",
      type: "yesno",
      label: "Síndrome de Ovarios Poliquísticos (SOP) en su juventud/adultez",
      help: "Diagnosticado por un ginecólogo durante tu juventud o adultez."
    },
    {
      id: "depression",
      type: "radio",
      label: "Depresión clínica diagnosticada",
      options: [
        { value: "no", label: "No" },
        { value: "yes_no_tx", label: "Sí, sin tratamiento" },
        { value: "yes_tx", label: "Sí, en tratamiento" }
      ],
      help: "Depresión diagnosticada por un profesional de salud mental."
    },
    {
      id: "seriousIllness",
      type: "yesno",
      label: "¿Padece actualmente alguna enfermedad grave, crónica, autoinmune o un cáncer activo que requiera seguimiento hospitalario o tratamiento médico continuo?",
      help: "Por ejemplo: cáncer en tratamiento activo, Lupus, Esclerosis Múltiple, Insuficiencia Renal Crónica, Enfermedad de Crohn, Artritis Reumatoide severa, etc."
    },
    {
      id: "seriousIllnessDetail",
      type: "text",
      label: "Por favor, especifique de qué enfermedad se trata",
      placeholder: "Nombre de la enfermedad",
      condition: { field: "seriousIllness", equal: true },
      help: "Indique brevemente qué enfermedad padece."
    },
    {
      id: "seriousIllnessTreatment",
      type: "radio",
      label: "¿Recibe actualmente algún tratamiento médico continuado para esta enfermedad?",
      options: [
        { value: "no", label: "No" },
        { value: "yes", label: "Sí" }
      ],
      condition: { field: "seriousIllness", equal: true },
      help: "Por ejemplo: Quimioterapia, Tamoxifeno, Inmunosupresores, Terapias biológicas..."
    },
    {
      id: "seriousIllnessTreatmentDetail",
      type: "text",
      label: "Indique cuál es el tratamiento",
      placeholder: "Ej. Quimioterapia, Tamoxifeno...",
      condition: { field: "seriousIllnessTreatment", equal: "yes" },
      help: "Nombre del tratamiento que está recibiendo."
    },
    {
      id: "osteoporosis",
      type: "radio",
      label: "¿Padece usted osteopenia u osteoporosis diagnosticada?",
      options: [
        { value: "no", label: "No" },
        { value: "osteopenia", label: "Osteopenia" },
        { value: "osteoporosis", label: "Osteoporosis" }
      ],
      help: "Disminución de la densidad ósea diagnosticada por densitometría."
    },
    {
      id: "osteoporosisTreatment",
      type: "yesno",
      label: "¿Está en tratamiento farmacológico para la osteopenia/osteoporosis?",
      condition: { field: "osteoporosis", notEqual: "no" },
      help: "Indica si tomas medicación prescrita para tratar la osteopenia u osteoporosis."
    },
    {
      id: "parentHipFracture",
      type: "yesno",
      label: "¿Alguno de sus padres se ha fracturado la cadera alguna vez?",
      help: "Factor de riesgo hereditario para la osteoporosis."
    },
    {
      id: "fractures",
      type: "yesno",
      label: "¿Ha tenido alguna fractura previa espontánea o por un golpe leve en su vida adulta?",
      help: "Excluya accidentes de tráfico o caídas graves."
    },
    {
      id: "corticoids",
      type: "yesno",
      label: "¿Toma o ha tomado alguna vez glucocorticoides/corticoesteroides en pastillas durante más de 3 meses seguidos?",
      help: "Por ejemplo prednisona o dexametasona."
    },
    {
      id: "secondaryOsteoporosis",
      type: "yesno",
      label: "¿Tiene algún trastorno fuertemente asociado con la osteoporosis secundaria?",
      help: "Por ejemplo: diabetes tipo 1, osteogénesis imperfecta en adultos, hipertiroidismo no tratado, menopausia prematura antes de los 45 años, desnutrición crónica o enfermedad hepática crónica."
    },
    {
      id: "arthrosis",
      type: "yesno",
      label: "Artrosis severa",
      help: "Desgaste del cartílago articular en estadio avanzado, diagnosticado."
    },
    {
      id: "arthritis",
      type: "yesno",
      label: "Artritis Reumatoide u otras enfermedades autoinmunes articulares",
      help: "Enfermedad inflamatoria de las articulaciones de origen autoinmune."
    }
  ]
};

export const SECTION_GYNECOLOGY = {
  id: "gynecology",
  name: "Historia ginecológica",
  emoji: "🩺",
  description: "Historial ginecológico, reproductivo y hormonal",
  estimatedMinutes: 4,
  questions: [
    {
      id: "menarche",
      type: "select",
      label: "¿A qué edad tuvo su primera menstruación (menarquia)?",
      options: [
        ...Array.from({ length: 13 }, (_, i) => ({ value: String(i + 8), label: `${i + 8} años` })),
        { value: "unknown", label: "No lo recuerdo" }
      ],
      help: "La edad a la que tuvo su primera regla."
    },
    {
      id: "lastPeriod",
      type: "radio",
      label: "¿Cuál fue la fecha (aproximada) de su ÚLTIMA menstruación?",
      options: [
        { value: "current", label: "Dentro de los últimos 3 meses" },
        { value: "3-6months", label: "Hace 3-6 meses" },
        { value: "6-12months", label: "Hace 6-12 meses" },
        { value: "1-5years", label: "Hace 1-5 años" },
        { value: "5+years", label: "Hace más de 5 años" }
      ],
      help: "Seleccione la opción que mejor corresponda."
    },
    {
      id: "lastPeriodMonth",
      type: "select",
      label: "Mes de la última menstruación",
      options: [
        { value: "1", label: "Enero" }, { value: "2", label: "Febrero" },
        { value: "3", label: "Marzo" }, { value: "4", label: "Abril" },
        { value: "5", label: "Mayo" }, { value: "6", label: "Junio" },
        { value: "7", label: "Julio" }, { value: "8", label: "Agosto" },
        { value: "9", label: "Septiembre" }, { value: "10", label: "Octubre" },
        { value: "11", label: "Noviembre" }, { value: "12", label: "Diciembre" }
      ],
      condition: { field: "lastPeriod", oneOf: ["current", "3-6months", "6-12months"] },
      help: "Mes aproximado de su última menstruación."
    },
    {
      id: "lastPeriodYear",
      type: "select",
      label: "Año de la última menstruación",
      options: Array.from({ length: 11 }, (_, i) => ({ value: String(2026 - i), label: String(2026 - i) })),
      condition: { field: "lastPeriod", oneOf: ["current", "3-6months", "6-12months"] },
      help: "Año aproximado de su última menstruación."
    },
    {
      id: "yearsWithoutPeriod",
      type: "select",
      label: "¿Cuántos años lleva sin la menstruación?",
      options: Array.from({ length: 70 }, (_, i) => ({ value: String(i + 1), label: `${i + 1} ${i + 1 === 1 ? "año" : "años"}` })),
      condition: { field: "lastPeriod", oneOf: ["1-5years", "5+years"] },
      help: "Número de años que lleva sin tener la menstruación."
    },
    {
      id: "irregularCycles",
      type: "radio",
      label: "En los últimos 12 meses, ¿ha notado una diferencia de 7 días o más en la duración habitual de sus ciclos menstruales? (Ejemplo: antes sus ciclos duraban 28 días y ahora duran 21 o menos o 35 días o más).",
      options: [
        { value: "yes", label: "Sí" },
        { value: "no", label: "No" }
      ],
      condition: { field: "lastPeriod", oneOf: ["current", "3-6months", "6-12months"] },
      help: ""
    },
    {
      id: "amenorrhea60",
      type: "radio",
      label: "En los últimos 12 meses, ¿ha tenido faltas o ausencias de menstruación que hayan durado 60 días (2 meses) o más?",
      options: [
        { value: "yes", label: "Sí" },
        { value: "no", label: "No" }
      ],
      condition: { field: "lastPeriod", oneOf: ["current", "3-6months", "6-12months"] },
      help: ""
    },
    {
      id: "amenorrhea90",
      type: "radio",
      label: "¿Recuerda haber experimentado alguna vez antes de los 40 años faltas de menstruación mayores a 90 días que no sean provocadas por un embarazo?",
      options: [
        { value: "yes", label: "Sí" },
        { value: "no", label: "No" }
      ],
      help: "Independientemente de tu situación menstrual actual."
    },
    {
      id: "amenorrhea90Count",
      type: "select",
      label: "Indique el número de veces aproximado que tuvo faltas de menstruación de más de 90 días previas a los 40 años",
      options: Array.from({ length: 20 }, (_, i) => ({ value: String(i + 1), label: `${i + 1} ${i + 1 === 1 ? "vez" : "veces"}` })),
      condition: { field: "amenorrhea90", equal: "yes" },
      help: "Número aproximado de episodios de amenorrea prolongada antes de los 40 años."
    },
    {
      id: "amenorrhea90Reason",
      type: "text",
      label: "Indique el motivo o los motivos si los conoce",
      placeholder: "Motivo conocido o 'No lo sé'",
      condition: { field: "amenorrhea90", equal: "yes" },
      help: "Si conoce la causa de estas faltas de menstruación, indíquela."
    },
    {
      id: "pregnancies",
      type: "select",
      label: "¿Cuántas veces ha estado embarazada a lo largo de su vida? (Incluya todos los embarazos, independientemente de su resultado). (Si es 0, indique 0)",
      options: Array.from({ length: 21 }, (_, i) => ({ value: String(i), label: i === 0 ? "0 embarazos" : `${i} ${i === 1 ? "embarazo" : "embarazos"}` })),
      help: "Total de embarazos, incluyendo los que no llegaron a término."
    },
    {
      id: "deliveries",
      type: "select",
      label: "¿Cuántos partos ha tenido?",
      options: Array.from({ length: 16 }, (_, i) => ({ value: String(i), label: i === 0 ? "0 partos" : `${i} ${i === 1 ? "parto" : "partos"}` })),
      help: "Número de partos a término (vaginales o cesáreas)."
    },
    {
      id: "breastfeedingMonths",
      type: "select",
      label: "Sumando todos sus hijos, ¿cuántos meses en total (aproximadamente) ha dado lactancia materna a lo largo de su vida?",
      options: [
        { value: "0", label: "0 meses (no he dado lactancia)" },
        ...Array.from({ length: 120 }, (_, i) => ({ value: String(i + 1), label: `${i + 1} ${i + 1 === 1 ? "mes" : "meses"}` }))
      ],
      help: "Total de meses de lactancia materna acumulando todos los hijos."
    },
    {
      id: "hysterectomy",
      type: "yesno",
      label: "¿Le han extirpado quirúrgicamente el útero (matriz) / Histerectomía?",
      help: "Extirpación quirúrgica del útero."
    },
    {
      id: "hysterectomyAge",
      type: "select",
      label: "¿A qué edad le realizaron la histerectomía?",
      options: Array.from({ length: 63 }, (_, i) => ({ value: String(i + 18), label: `${i + 18} años` })),
      condition: { field: "hysterectomy", equal: true },
      help: "Tu edad cuando te extirparon el útero."
    },
    {
      id: "oophorectomy",
      type: "radio",
      label: "¿Le han extirpado quirúrgicamente los ovarios (Ooforectomía)?",
      options: [
        { value: "no", label: "No" },
        { value: "unilateral", label: "Sí, me extirparon un ovario" },
        { value: "bilateral", label: "Sí, me extirparon ambos ovarios" }
      ],
      help: "La extirpación de ambos ovarios causa menopausia quirúrgica inmediata."
    },
    {
      id: "oophorectomyAge",
      type: "select",
      label: "¿A qué edad le realizaron la ooforectomía?",
      options: Array.from({ length: 63 }, (_, i) => ({ value: String(i + 18), label: `${i + 18} años` })),
      condition: { field: "oophorectomy", notEqual: "no" },
      help: "Tu edad cuando te extirparon el/los ovario(s)."
    },
    {
      id: "chemoRadio",
      type: "yesno",
      label: "¿Ha recibido alguna vez tratamientos médicos (quimioterapia, radioterapia pélvica u otros) que hayan provocado la retirada temporal o definitiva de su menstruación?",
      help: "Estos tratamientos pueden afectar la función ovárica y adelantar la menopausia."
    },
    {
      id: "contraceptives",
      type: "radio",
      label: "¿Ha utilizado anticonceptivos hormonales (píldora, anillo vaginal, parche, DIU hormonal) a lo largo de su vida?",
      options: [
        { value: "never", label: "No" },
        { value: "past", label: "Sí" }
      ],
      help: "Cualquier tipo de método anticonceptivo hormonal."
    },
    {
      id: "contraceptivesYears",
      type: "select",
      label: "¿Durante cuántos años en total, sumando todos los periodos?",
      options: Array.from({ length: 50 }, (_, i) => ({ value: String(i + 1), label: `${i + 1} ${i + 1 === 1 ? "año" : "años"}` })),
      condition: { field: "contraceptives", equal: "past" },
      help: "Suma todos los períodos de uso de anticonceptivos hormonales."
    },
    {
      id: "contraceptivesTypes",
      type: "checkbox",
      label: "Marque todos los anticonceptivos que haya utilizado a lo largo de su vida",
      options: [
        { value: "pill", label: "Píldora" },
        { value: "ring", label: "Anillo vaginal" },
        { value: "patch", label: "Parche" },
        { value: "iud", label: "DIU hormonal" },
        { value: "other", label: "Otros" }
      ],
      condition: { field: "contraceptives", equal: "past" },
      help: "Puede marcar más de una opción."
    },
    {
      id: "thm",
      type: "radio",
      label: "¿Utiliza o ha utilizado alguna vez Terapia Hormonal para la Menopausia (THM) para aliviar los síntomas?",
      options: [
        { value: "never", label: "No" },
        { value: "current", label: "Sí, la uso actualmente" },
        { value: "past", label: "Sí, la usé en el pasado pero ya no" }
      ],
      help: "Parches, geles o pastillas de estrógenos/progesterona para aliviar síntomas menopáusicos."
    },
    {
      id: "thmDuration",
      type: "select",
      label: "¿Cuántos años la ha utilizado en total? (Si es menor a un año responda 1)",
      options: Array.from({ length: 30 }, (_, i) => ({ value: String(i + 1), label: `${i + 1} ${i + 1 === 1 ? "año" : "años"}` })),
      condition: { field: "thm", notEqual: "never" },
      help: "Duración total del tratamiento hormonal de la menopausia sumando todos los periodos."
    },
    {
      id: "thmTypes",
      type: "checkbox",
      label: "¿Qué tipo o tipos utiliza o ha utilizado?",
      options: [
        { value: "patches", label: "Parches" },
        { value: "gels", label: "Geles" },
        { value: "pills", label: "Pastillas de estrógenos/progesterona" },
        { value: "other", label: "Otros (especifique cuál)" }
      ],
      condition: { field: "thm", notEqual: "never" },
      help: "Puede marcar más de una opción."
    }
  ]
};

// Quick version: kept for backwards compatibility but not used in CS study
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
  const { field, notEqual, equal, oneOf } = question.condition;
  const value = sectionAnswers[field];
  if (oneOf !== undefined) return oneOf.includes(value);
  if (notEqual !== undefined) return value !== notEqual;
  if (equal !== undefined) return value === equal;
  return true;
}

// Count visible (condition-met) questions in a section
export function countVisibleQuestions(section, sectionAnswers) {
  return section.questions.filter(q => isConditionMet(q, sectionAnswers)).length;
}
