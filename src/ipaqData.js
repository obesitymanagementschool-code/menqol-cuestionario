// IPAQ (International Physical Activity Questionnaire)
// Long form — todos los campos numéricos usan desplegable
// El value siempre es el número limpio (sin unidades)

const DAYS_OPTIONS = [
  { value: "0", label: "0 días" },
  { value: "1", label: "1 día" },
  ...Array.from({ length: 6 }, (_, i) => ({ value: String(i + 2), label: `${i + 2} días` }))
]

const MINUTES_OPTIONS = [
  { value: "0", label: "0 minutos" },
  ...Array.from({ length: 11 }, (_, i) => ({ value: String((i + 1) * 5), label: `${(i + 1) * 5} minutos` })),
  { value: "75", label: "75 minutos" },
  { value: "90", label: "90 minutos" },
  { value: "105", label: "105 minutos" },
  { value: "120", label: "120 minutos (2 horas)" },
  { value: "150", label: "150 minutos" },
  { value: "180", label: "180 minutos (3 horas)" },
  { value: "210", label: "210 minutos" },
  { value: "240", label: "240 minutos (4 horas)" },
  { value: "300", label: "300 minutos (5 horas)" },
  { value: "360", label: "360 minutos (6 horas)" },
  { value: "480", label: "480 minutos (8 horas)" }
]

const SITTING_OPTIONS = [
  { value: "0", label: "0 minutos" },
  ...Array.from({ length: 11 }, (_, i) => ({ value: String((i + 1) * 30), label: `${(i + 1) * 30} minutos` })),
  { value: "360", label: "360 minutos (6 horas)" },
  { value: "420", label: "420 minutos (7 horas)" },
  { value: "480", label: "480 minutos (8 horas)" },
  { value: "540", label: "540 minutos (9 horas)" },
  { value: "600", label: "600 minutos (10 horas)" },
  { value: "660", label: "660 minutos (11 horas)" },
  { value: "720", label: "720 minutos (12 horas)" },
  { value: "840", label: "840 minutos (14 horas)" },
  { value: "960", label: "960 minutos (16 horas)" }
]

export const IPAQ_SHORT = {
  id: "ipaqShort",
  name: "Actividad física",
  emoji: "🏃‍♀️",
  description: "7 preguntas sobre actividad física en los últimos 7 días",
  estimatedMinutes: 3,
  intro: "Las siguientes preguntas se refieren a la actividad física que has realizado en los últimos 7 días. Por favor, responde aunque no te consideres una persona activa.",
  questions: [
    {
      id: "ipaq_s_vigDays",
      type: "select",
      label: "Durante los últimos 7 días, ¿en cuántos días realizaste actividades físicas vigorosas?",
      sublabel: "Ejemplos: levantar objetos pesados, correr, aeróbic intenso, pedaleo rápido en bicicleta",
      options: DAYS_OPTIONS,
      help: "Actividades vigorosas son aquellas que requieren un esfuerzo físico fuerte y te hacen respirar mucho más fuerte de lo normal."
    },
    {
      id: "ipaq_s_vigMinutes",
      type: "select",
      label: "En esos días, ¿cuánto tiempo dedicaste normalmente a actividad vigorosa?",
      sublabel: "Minutos por día",
      options: MINUTES_OPTIONS,
      condition: { field: "ipaq_s_vigDays", greaterThan: 0 },
      help: "Piensa solo en las actividades que duraron al menos 10 minutos seguidos."
    },
    {
      id: "ipaq_s_modDays",
      type: "select",
      label: "Durante los últimos 7 días, ¿en cuántos días realizaste actividades físicas moderadas?",
      sublabel: "Ejemplos: cargar pesos ligeros, pedaleo suave en bicicleta, tenis dobles. No incluyas caminar.",
      options: DAYS_OPTIONS,
      help: "Actividades moderadas son aquellas que requieren un esfuerzo físico moderado y te hacen respirar algo más fuerte de lo normal."
    },
    {
      id: "ipaq_s_modMinutes",
      type: "select",
      label: "En esos días, ¿cuánto tiempo dedicaste normalmente a actividad moderada?",
      sublabel: "Minutos por día",
      options: MINUTES_OPTIONS,
      condition: { field: "ipaq_s_modDays", greaterThan: 0 },
      help: "Piensa solo en las actividades que duraron al menos 10 minutos seguidos."
    },
    {
      id: "ipaq_s_walkDays",
      type: "select",
      label: "Durante los últimos 7 días, ¿en cuántos días caminaste al menos 10 minutos seguidos?",
      sublabel: "Incluye caminar en el trabajo, en casa, para ir de un sitio a otro, y como ejercicio o paseo",
      options: DAYS_OPTIONS,
      help: "Cuenta todos los tipos de caminata: ir a la compra, al trabajo, pasear al perro, etc."
    },
    {
      id: "ipaq_s_walkMinutes",
      type: "select",
      label: "En esos días, ¿cuánto tiempo dedicaste normalmente a caminar?",
      sublabel: "Minutos por día",
      options: MINUTES_OPTIONS,
      condition: { field: "ipaq_s_walkDays", greaterThan: 0 },
      help: "Tiempo total caminando en un día típico."
    },
    {
      id: "ipaq_s_sittingMinutes",
      type: "select",
      label: "En un día entre semana normal, ¿cuánto tiempo pasas sentada?",
      sublabel: "Incluye tiempo en el trabajo, en casa, estudiando, viendo TV, en el ordenador, transporte...",
      options: SITTING_OPTIONS,
      help: "Incluye el tiempo sentada en el escritorio, visitando amigos, leyendo, viendo la televisión y en transporte."
    }
  ]
}

export const IPAQ_LONG = {
  id: "ipaqLong",
  name: "Actividad física",
  emoji: "🏃‍♀️",
  description: "Cuestionario IPAQ (actividad en los últimos 7 días)",
  estimatedMinutes: 5,
  intro: "Las siguientes preguntas se refieren a la actividad física que has realizado en los últimos 7 días. Piensa en las actividades que haces en el trabajo, para ir de un lugar a otro, en el jardín o en casa, y en tu tiempo libre.",
  parts: [
    {
      id: "work",
      name: "Parte 1: Actividad física relacionada con el trabajo",
      description: "Incluye trabajo remunerado, agricultura, voluntariado y cualquier otra actividad no remunerada fuera del hogar. No incluyas tareas del hogar.",
      questions: [
        {
          id: "ipaq_l_workStatus",
          type: "yesno",
          label: "¿Tiene usted actualmente un trabajo pagado o hace algún trabajo no pagado fuera de su casa?",
          help: "Si su respuesta es NO, pase directamente a la Parte 2: Transporte."
        },
        {
          id: "ipaq_l_workVigDays",
          type: "select",
          label: "Durante los últimos 7 días, ¿cuántos días realizó usted actividades físicas vigorosas como levantar objetos pesados, excavar, construcción pesada, o subir escaleras como parte de su trabajo?",
          sublabel: "Piense solamente en esas actividades que usted hizo por lo menos 10 minutos continuos.",
          options: DAYS_OPTIONS,
          condition: { field: "ipaq_l_workStatus", equal: true },
          help: "Ninguna actividad física vigorosa relacionada con el trabajo → pase a la pregunta de actividad moderada."
        },
        {
          id: "ipaq_l_workVigMinutes",
          type: "select",
          label: "¿Cuánto tiempo en total usualmente le toma realizar actividades físicas vigorosas en uno de esos días como parte de su trabajo?",
          sublabel: "Minutos por día",
          options: MINUTES_OPTIONS,
          condition: { field: "ipaq_l_workVigDays", greaterThan: 0 },
          help: "Piense solamente en esas actividades que usted hizo por lo menos 10 minutos continuos."
        },
        {
          id: "ipaq_l_workModDays",
          type: "select",
          label: "Durante los últimos 7 días, ¿cuántos días hizo usted actividades físicas moderadas como cargar cosas ligeras como parte de su trabajo? Por favor no incluya caminar.",
          options: DAYS_OPTIONS,
          condition: { field: "ipaq_l_workStatus", equal: true },
          help: "Ninguna actividad física moderada relacionada con el trabajo → pase a la pregunta de caminar."
        },
        {
          id: "ipaq_l_workModMinutes",
          type: "select",
          label: "¿Cuánto tiempo en total usualmente le toma realizar actividades físicas moderadas en uno de esos días como parte de su trabajo?",
          sublabel: "Minutos por día",
          options: MINUTES_OPTIONS,
          condition: { field: "ipaq_l_workModDays", greaterThan: 0 },
          help: "Minutos por día de trabajo."
        },
        {
          id: "ipaq_l_workWalkDays",
          type: "select",
          label: "Durante los últimos 7 días, ¿cuántos días caminó usted por lo menos 10 minutos continuos como parte de su trabajo? Por favor no incluya ninguna caminata que usted hizo para desplazarse de o a su trabajo.",
          options: DAYS_OPTIONS,
          condition: { field: "ipaq_l_workStatus", equal: true },
          help: "Ninguna caminata relacionada con trabajo → pase a la Parte 2."
        },
        {
          id: "ipaq_l_workWalkMinutes",
          type: "select",
          label: "¿Cuánto tiempo en total pasó generalmente caminando en uno de esos días como parte de su trabajo?",
          sublabel: "Minutos por día",
          options: MINUTES_OPTIONS,
          condition: { field: "ipaq_l_workWalkDays", greaterThan: 0 },
          help: "Minutos por día caminando en el trabajo."
        }
      ]
    },
    {
      id: "transport",
      name: "Parte 2: Actividad física relacionada con el transporte",
      description: "Estas preguntas se refieren a la forma como usted se desplazó de un lugar a otro, incluyendo lugares como el trabajo, las tiendas, el cine, entre otros.",
      questions: [
        {
          id: "ipaq_l_transBikeDays",
          type: "select",
          label: "Durante los últimos 7 días, ¿cuántos días montó usted en bicicleta por al menos 10 minutos continuos para ir de un lugar a otro?",
          options: DAYS_OPTIONS,
          help: "No montó en bicicleta de un sitio a otro → pase a la siguiente pregunta."
        },
        {
          id: "ipaq_l_transBikeMinutes",
          type: "select",
          label: "Usualmente, ¿cuánto tiempo gastó usted en uno de esos días montando en bicicleta de un lugar a otro?",
          sublabel: "Minutos por día",
          options: MINUTES_OPTIONS,
          condition: { field: "ipaq_l_transBikeDays", greaterThan: 0 },
          help: "Tiempo total pedaleando para desplazarse."
        },
        {
          id: "ipaq_l_transWalkDays",
          type: "select",
          label: "Durante los últimos 7 días, ¿cuántos días caminó usted por al menos 10 minutos continuos para ir de un sitio a otro?",
          options: DAYS_OPTIONS,
          help: "Ninguna caminata de un sitio a otro → pase a la Parte 3."
        },
        {
          id: "ipaq_l_transWalkMinutes",
          type: "select",
          label: "Usualmente, ¿cuánto tiempo gastó usted en uno de esos días caminando de un sitio a otro?",
          sublabel: "Minutos por día",
          options: MINUTES_OPTIONS,
          condition: { field: "ipaq_l_transWalkDays", greaterThan: 0 },
          help: "Minutos por día caminando como transporte."
        }
      ]
    },
    {
      id: "home",
      name: "Parte 3: Trabajo de la casa, mantenimiento de la casa, y cuidado de la familia",
      description: "Esta sección se refiere a algunas actividades físicas que usted hizo en los últimos 7 días en y alrededor de su casa. Piense únicamente acerca de esas actividades físicas que hizo por lo menos 10 minutos continuos.",
      questions: [
        {
          id: "ipaq_l_homeVigDays",
          type: "select",
          label: "Durante los últimos 7 días, ¿cuántos días hizo usted actividades físicas vigorosas tal como levantar objetos pesados, cortar madera, palear nieve, o excavar en el jardín o patio?",
          options: DAYS_OPTIONS,
          help: "Ninguna actividad física vigorosa en el jardín o patio → pase a la siguiente pregunta."
        },
        {
          id: "ipaq_l_homeVigMinutes",
          type: "select",
          label: "Usualmente, ¿cuánto tiempo dedica usted en uno de esos días haciendo actividades físicas vigorosas en el jardín o patio?",
          sublabel: "Minutos por día",
          options: MINUTES_OPTIONS,
          condition: { field: "ipaq_l_homeVigDays", greaterThan: 0 },
          help: "Piense únicamente acerca de esas actividades físicas que hizo por lo menos 10 minutos continuos."
        },
        {
          id: "ipaq_l_homeModOutDays",
          type: "select",
          label: "Durante los últimos 7 días, ¿cuántos días hizo usted actividades físicas moderadas tal como cargar objetos livianos, barrer, limpiar ventanas, y rastrillar en el jardín o patio?",
          options: DAYS_OPTIONS,
          help: "Ninguna actividad física moderada en el jardín o patio → pase a la siguiente pregunta."
        },
        {
          id: "ipaq_l_homeModOutMinutes",
          type: "select",
          label: "Usualmente, ¿cuánto tiempo dedica usted en uno de esos días haciendo actividades físicas moderadas en el jardín o patio?",
          sublabel: "Minutos por día",
          options: MINUTES_OPTIONS,
          condition: { field: "ipaq_l_homeModOutDays", greaterThan: 0 },
          help: "Minutos por día."
        },
        {
          id: "ipaq_l_homeModInDays",
          type: "select",
          label: "Durante los últimos 7 días, ¿cuántos días hizo usted actividades físicas moderadas tal como cargar objetos livianos, limpiar ventanas, fregar suelos y barrer dentro de su casa?",
          options: DAYS_OPTIONS,
          help: "Ninguna actividad física moderada dentro de la casa → pase a la Parte 4."
        },
        {
          id: "ipaq_l_homeModInMinutes",
          type: "select",
          label: "Usualmente, ¿cuánto tiempo dedica usted en uno de esos días haciendo actividades físicas moderadas dentro de su casa?",
          sublabel: "Minutos por día",
          options: MINUTES_OPTIONS,
          condition: { field: "ipaq_l_homeModInDays", greaterThan: 0 },
          help: "Minutos por día."
        }
      ]
    },
    {
      id: "leisure",
      name: "Parte 4: Actividades físicas de recreación, deporte y tiempo libre",
      description: "Esta sección se refiere a todas aquellas actividades físicas que usted hizo en los últimos 7 días únicamente por recreación, deporte, ejercicio o placer. Por favor no incluya ninguna de las actividades que ya haya mencionado.",
      questions: [
        {
          id: "ipaq_l_leisWalkDays",
          type: "select",
          label: "Sin contar cualquier caminata que ya haya usted mencionado, durante los últimos 7 días, ¿cuántos días caminó usted por lo menos 10 minutos continuos en su tiempo libre?",
          options: DAYS_OPTIONS,
          help: "Ninguna caminata en tiempo libre → pase a la siguiente pregunta."
        },
        {
          id: "ipaq_l_leisWalkMinutes",
          type: "select",
          label: "Usualmente, ¿cuánto tiempo gastó usted en uno de esos días caminando en su tiempo libre?",
          sublabel: "Minutos por día",
          options: MINUTES_OPTIONS,
          condition: { field: "ipaq_l_leisWalkDays", greaterThan: 0 },
          help: "Piense únicamente acerca de esas actividades físicas que hizo por lo menos 10 minutos continuos."
        },
        {
          id: "ipaq_l_leisVigDays",
          type: "select",
          label: "Durante los últimos 7 días, ¿cuántos días hizo usted actividades físicas vigorosas tal como aeróbicos, correr, pedalear rápido en bicicleta, o nadar rápido en su tiempo libre?",
          options: DAYS_OPTIONS,
          help: "Ninguna actividad física vigorosa en tiempo libre → pase a la siguiente pregunta."
        },
        {
          id: "ipaq_l_leisVigMinutes",
          type: "select",
          label: "Usualmente, ¿cuánto tiempo dedica usted en uno de esos días haciendo actividades físicas vigorosas en su tiempo libre?",
          sublabel: "Minutos por día",
          options: MINUTES_OPTIONS,
          condition: { field: "ipaq_l_leisVigDays", greaterThan: 0 },
          help: "Piense únicamente acerca de esas actividades físicas que hizo por lo menos 10 minutos continuos."
        },
        {
          id: "ipaq_l_leisModDays",
          type: "select",
          label: "Durante los últimos 7 días, ¿cuántos días hizo usted actividades físicas moderadas tal como pedalear en bicicleta a paso regular, nadar a paso regular, jugar dobles de tenis, en su tiempo libre?",
          options: DAYS_OPTIONS,
          help: "Ninguna actividad física moderada en tiempo libre → pase a la Parte 5."
        },
        {
          id: "ipaq_l_leisModMinutes",
          type: "select",
          label: "Usualmente, ¿cuánto tiempo dedica usted en uno de esos días haciendo actividades físicas moderadas en su tiempo libre?",
          sublabel: "Minutos por día",
          options: MINUTES_OPTIONS,
          condition: { field: "ipaq_l_leisModDays", greaterThan: 0 },
          help: "Minutos por día."
        }
      ]
    },
    {
      id: "sitting",
      name: "Parte 5: Tiempo dedicado a estar sentada",
      description: "Las últimas preguntas se refieren al tiempo que usted permanece sentada en el trabajo, la casa, estudiando, y en su tiempo libre. Esto incluye tiempo sentada en un escritorio, visitando amigos, leyendo o permanecer sentada o acostada mirando televisión.",
      questions: [
        {
          id: "ipaq_l_sitWeekday",
          type: "select",
          label: "Durante los últimos 7 días, ¿cuánto tiempo permaneció sentada en un día entre semana (de lunes a viernes)?",
          sublabel: "Minutos por día",
          options: SITTING_OPTIONS,
          help: "No incluya el tiempo que permanece sentada en un vehículo de motor que ya haya mencionado anteriormente."
        },
        {
          id: "ipaq_l_sitWeekend",
          type: "select",
          label: "Durante los últimos 7 días, ¿cuánto tiempo permaneció sentada en un día del fin de semana (sábado o domingo)?",
          sublabel: "Minutos por día",
          options: SITTING_OPTIONS,
          help: "No incluya el tiempo que permanece sentada en un vehículo de motor."
        }
      ]
    }
  ]
}

// Helper: check if IPAQ condition is met
export function isIpaqConditionMet(question, answers) {
  if (!question.condition) return true
  const { field, greaterThan, equal } = question.condition
  const value = answers[field]
  if (greaterThan !== undefined) return value != null && Number(value) > greaterThan
  if (equal !== undefined) return value === equal
  return true
}

// Get all questions from IPAQ long (flattened)
export function getIpaqLongQuestions() {
  return IPAQ_LONG.parts.flatMap(p => p.questions)
}
