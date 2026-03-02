// IPAQ (International Physical Activity Questionnaire)
// Short form (7 questions) + Long form (27 questions, 5 parts)

export const IPAQ_SHORT = {
  id: "ipaqShort",
  name: "Actividad física (IPAQ corto)",
  emoji: "🏃‍♀️",
  description: "7 preguntas sobre actividad física en los últimos 7 días",
  estimatedMinutes: 3,
  intro: "Las siguientes preguntas se refieren a la actividad física que has realizado en los últimos 7 días. Por favor, responde aunque no te consideres una persona activa.",
  questions: [
    {
      id: "ipaq_s_vigDays",
      type: "number",
      label: "Durante los últimos 7 días, ¿en cuántos días realizaste actividades físicas vigorosas?",
      sublabel: "Ejemplos: levantar objetos pesados, correr, aeróbic intenso, pedaleo rápido en bicicleta",
      placeholder: "Días (0-7)",
      min: 0, max: 7,
      help: "Actividades vigorosas son aquellas que requieren un esfuerzo físico fuerte y te hacen respirar mucho más fuerte de lo normal."
    },
    {
      id: "ipaq_s_vigMinutes",
      type: "number",
      label: "En esos días, ¿cuánto tiempo dedicaste normalmente a actividad vigorosa?",
      sublabel: "Indica minutos por día",
      placeholder: "Minutos por día",
      min: 0, max: 480,
      condition: { field: "ipaq_s_vigDays", greaterThan: 0 },
      help: "Piensa solo en las actividades que duraron al menos 10 minutos seguidos."
    },
    {
      id: "ipaq_s_modDays",
      type: "number",
      label: "Durante los últimos 7 días, ¿en cuántos días realizaste actividades físicas moderadas?",
      sublabel: "Ejemplos: cargar pesos ligeros, pedaleo suave en bicicleta, tenis dobles. No incluyas caminar.",
      placeholder: "Días (0-7)",
      min: 0, max: 7,
      help: "Actividades moderadas son aquellas que requieren un esfuerzo físico moderado y te hacen respirar algo más fuerte de lo normal."
    },
    {
      id: "ipaq_s_modMinutes",
      type: "number",
      label: "En esos días, ¿cuánto tiempo dedicaste normalmente a actividad moderada?",
      sublabel: "Indica minutos por día",
      placeholder: "Minutos por día",
      min: 0, max: 480,
      condition: { field: "ipaq_s_modDays", greaterThan: 0 },
      help: "Piensa solo en las actividades que duraron al menos 10 minutos seguidos."
    },
    {
      id: "ipaq_s_walkDays",
      type: "number",
      label: "Durante los últimos 7 días, ¿en cuántos días caminaste al menos 10 minutos seguidos?",
      sublabel: "Incluye caminar en el trabajo, en casa, para ir de un sitio a otro, y como ejercicio o paseo",
      placeholder: "Días (0-7)",
      min: 0, max: 7,
      help: "Cuenta todos los tipos de caminata: ir a la compra, al trabajo, pasear al perro, etc."
    },
    {
      id: "ipaq_s_walkMinutes",
      type: "number",
      label: "En esos días, ¿cuánto tiempo dedicaste normalmente a caminar?",
      sublabel: "Indica minutos por día",
      placeholder: "Minutos por día",
      min: 0, max: 480,
      condition: { field: "ipaq_s_walkDays", greaterThan: 0 },
      help: "Tiempo total caminando en un día típico."
    },
    {
      id: "ipaq_s_sittingMinutes",
      type: "number",
      label: "En un día entre semana normal, ¿cuánto tiempo pasas sentada?",
      sublabel: "Incluye tiempo en el trabajo, en casa, estudiando, viendo TV, en el ordenador, transporte...",
      placeholder: "Minutos por día",
      min: 0, max: 960,
      help: "Incluye el tiempo sentada en el escritorio, visitando amigos, leyendo, viendo la televisión y en transporte."
    }
  ]
};

export const IPAQ_LONG = {
  id: "ipaqLong",
  name: "Actividad física (IPAQ largo)",
  emoji: "🏃‍♀️",
  description: "Cuestionario completo de actividad física (últimos 7 días)",
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
          label: "¿Tienes actualmente un trabajo o realizas algún trabajo no remunerado fuera de casa?",
          help: "Incluye empleo, trabajo voluntario, estudios u otra actividad regular fuera del hogar."
        },
        {
          id: "ipaq_l_workVigDays",
          type: "number",
          label: "En los últimos 7 días, ¿cuántos días realizaste actividades físicas vigorosas en tu trabajo?",
          sublabel: "Ejemplos: cargar pesos pesados, cavar, trabajo de construcción pesado",
          placeholder: "Días (0-7)", min: 0, max: 7,
          condition: { field: "ipaq_l_workStatus", equal: true },
          help: "Actividades vigorosas que requieren mucho esfuerzo físico."
        },
        {
          id: "ipaq_l_workVigMinutes",
          type: "number",
          label: "¿Cuánto tiempo dedicaste normalmente a actividad vigorosa en tu trabajo?",
          placeholder: "Minutos por día", min: 0, max: 480,
          condition: { field: "ipaq_l_workVigDays", greaterThan: 0 },
          help: "Minutos por día de trabajo."
        },
        {
          id: "ipaq_l_workModDays",
          type: "number",
          label: "En los últimos 7 días, ¿cuántos días realizaste actividades moderadas en tu trabajo?",
          sublabel: "Ejemplos: cargar pesos ligeros, limpieza intensa. No incluyas caminar.",
          placeholder: "Días (0-7)", min: 0, max: 7,
          condition: { field: "ipaq_l_workStatus", equal: true },
          help: "Actividades moderadas que aumentan algo la respiración."
        },
        {
          id: "ipaq_l_workModMinutes",
          type: "number",
          label: "¿Cuánto tiempo dedicaste normalmente a actividad moderada en tu trabajo?",
          placeholder: "Minutos por día", min: 0, max: 480,
          condition: { field: "ipaq_l_workModDays", greaterThan: 0 },
          help: "Minutos por día de trabajo."
        },
        {
          id: "ipaq_l_workWalkDays",
          type: "number",
          label: "En los últimos 7 días, ¿cuántos días caminaste al menos 10 min seguidos como parte de tu trabajo?",
          placeholder: "Días (0-7)", min: 0, max: 7,
          condition: { field: "ipaq_l_workStatus", equal: true },
          help: "Caminar en el lugar de trabajo, ir a reuniones, etc."
        },
        {
          id: "ipaq_l_workWalkMinutes",
          type: "number",
          label: "¿Cuánto tiempo caminaste normalmente en el trabajo?",
          placeholder: "Minutos por día", min: 0, max: 480,
          condition: { field: "ipaq_l_workWalkDays", greaterThan: 0 },
          help: "Minutos por día caminando en el trabajo."
        }
      ]
    },
    {
      id: "transport",
      name: "Parte 2: Actividad física relacionada con el transporte",
      description: "Cómo te desplazas de un lugar a otro (trabajo, tiendas, cine, etc.).",
      questions: [
        {
          id: "ipaq_l_transBikeDays",
          type: "number",
          label: "En los últimos 7 días, ¿cuántos días fuiste en bicicleta al menos 10 min seguidos para desplazarte?",
          placeholder: "Días (0-7)", min: 0, max: 7,
          help: "Solo como medio de transporte, no como ejercicio."
        },
        {
          id: "ipaq_l_transBikeMinutes",
          type: "number",
          label: "¿Cuánto tiempo en total dedicaste normalmente a la bicicleta como transporte?",
          placeholder: "Minutos por día", min: 0, max: 480,
          condition: { field: "ipaq_l_transBikeDays", greaterThan: 0 },
          help: "Tiempo total pedaleando para desplazarte."
        },
        {
          id: "ipaq_l_transWalkDays",
          type: "number",
          label: "En los últimos 7 días, ¿cuántos días caminaste al menos 10 min seguidos para desplazarte?",
          placeholder: "Días (0-7)", min: 0, max: 7,
          help: "Caminar como medio de transporte: ir al trabajo, a la tienda, al bus, etc."
        },
        {
          id: "ipaq_l_transWalkMinutes",
          type: "number",
          label: "¿Cuánto tiempo caminaste normalmente para desplazarte?",
          placeholder: "Minutos por día", min: 0, max: 480,
          condition: { field: "ipaq_l_transWalkDays", greaterThan: 0 },
          help: "Minutos por día caminando como transporte."
        }
      ]
    },
    {
      id: "home",
      name: "Parte 3: Trabajo doméstico, mantenimiento del hogar y cuidado de la familia",
      description: "Tareas domésticas, jardinería, reparaciones y cuidado de familiares.",
      questions: [
        {
          id: "ipaq_l_homeVigDays",
          type: "number",
          label: "En los últimos 7 días, ¿cuántos días realizaste actividades vigorosas en el jardín o patio?",
          sublabel: "Ejemplos: cavar, cortar leña, mover tierra pesada",
          placeholder: "Días (0-7)", min: 0, max: 7,
          help: "Actividades en el exterior de tu casa que requieren gran esfuerzo físico."
        },
        {
          id: "ipaq_l_homeVigMinutes",
          type: "number",
          label: "¿Cuánto tiempo dedicaste normalmente a actividad vigorosa en el jardín?",
          placeholder: "Minutos por día", min: 0, max: 480,
          condition: { field: "ipaq_l_homeVigDays", greaterThan: 0 },
          help: "Minutos por día."
        },
        {
          id: "ipaq_l_homeModOutDays",
          type: "number",
          label: "En los últimos 7 días, ¿cuántos días realizaste actividades moderadas en el jardín o patio?",
          sublabel: "Ejemplos: barrer hojas, podar, plantar",
          placeholder: "Días (0-7)", min: 0, max: 7,
          help: "Actividades en el exterior que requieren esfuerzo moderado."
        },
        {
          id: "ipaq_l_homeModOutMinutes",
          type: "number",
          label: "¿Cuánto tiempo dedicaste normalmente a actividad moderada en el jardín?",
          placeholder: "Minutos por día", min: 0, max: 480,
          condition: { field: "ipaq_l_homeModOutDays", greaterThan: 0 },
          help: "Minutos por día."
        },
        {
          id: "ipaq_l_homeModInDays",
          type: "number",
          label: "En los últimos 7 días, ¿cuántos días realizaste actividades moderadas dentro de casa?",
          sublabel: "Ejemplos: fregar suelos, limpiar ventanas, aspirar con esfuerzo, cargar cosas",
          placeholder: "Días (0-7)", min: 0, max: 7,
          help: "Tareas domésticas que requieren esfuerzo moderado (no cocinar ni planchar)."
        },
        {
          id: "ipaq_l_homeModInMinutes",
          type: "number",
          label: "¿Cuánto tiempo dedicaste normalmente a actividad moderada dentro de casa?",
          placeholder: "Minutos por día", min: 0, max: 480,
          condition: { field: "ipaq_l_homeModInDays", greaterThan: 0 },
          help: "Minutos por día."
        }
      ]
    },
    {
      id: "leisure",
      name: "Parte 4: Actividades físicas de ocio y tiempo libre",
      description: "Ejercicio, deporte y actividad recreativa que hagas solo por recreación, salud o forma física.",
      questions: [
        {
          id: "ipaq_l_leisWalkDays",
          type: "number",
          label: "En los últimos 7 días, ¿cuántos días caminaste al menos 10 min seguidos como ejercicio?",
          placeholder: "Días (0-7)", min: 0, max: 7,
          help: "Caminar por ejercicio o placer, no como transporte."
        },
        {
          id: "ipaq_l_leisWalkMinutes",
          type: "number",
          label: "¿Cuánto tiempo caminaste normalmente como ejercicio?",
          placeholder: "Minutos por día", min: 0, max: 480,
          condition: { field: "ipaq_l_leisWalkDays", greaterThan: 0 },
          help: "Minutos por día."
        },
        {
          id: "ipaq_l_leisVigDays",
          type: "number",
          label: "En los últimos 7 días, ¿cuántos días realizaste actividades vigorosas de ocio?",
          sublabel: "Ejemplos: correr, natación rápida, spinning, deportes de competición",
          placeholder: "Días (0-7)", min: 0, max: 7,
          help: "Actividades vigorosas que haces como ejercicio en tu tiempo libre."
        },
        {
          id: "ipaq_l_leisVigMinutes",
          type: "number",
          label: "¿Cuánto tiempo dedicaste normalmente a actividad vigorosa de ocio?",
          placeholder: "Minutos por día", min: 0, max: 480,
          condition: { field: "ipaq_l_leisVigDays", greaterThan: 0 },
          help: "Minutos por día."
        },
        {
          id: "ipaq_l_leisModDays",
          type: "number",
          label: "En los últimos 7 días, ¿cuántos días realizaste actividades moderadas de ocio?",
          sublabel: "Ejemplos: natación suave, baile, yoga, tenis dobles, bicicleta suave",
          placeholder: "Días (0-7)", min: 0, max: 7,
          help: "Actividades moderadas que haces como ejercicio en tu tiempo libre."
        },
        {
          id: "ipaq_l_leisModMinutes",
          type: "number",
          label: "¿Cuánto tiempo dedicaste normalmente a actividad moderada de ocio?",
          placeholder: "Minutos por día", min: 0, max: 480,
          condition: { field: "ipaq_l_leisModDays", greaterThan: 0 },
          help: "Minutos por día."
        }
      ]
    },
    {
      id: "sitting",
      name: "Parte 5: Tiempo sentada",
      description: "Tiempo que pasas sentada durante la semana.",
      questions: [
        {
          id: "ipaq_l_sitWeekday",
          type: "number",
          label: "En un día entre semana, ¿cuánto tiempo pasas sentada?",
          sublabel: "Incluye trabajo, casa, estudios, TV, ordenador, transporte...",
          placeholder: "Minutos por día", min: 0, max: 960,
          help: "Todo el tiempo que pasas sentada o recostada (sin dormir) en un día laborable típico."
        },
        {
          id: "ipaq_l_sitWeekend",
          type: "number",
          label: "En un día de fin de semana, ¿cuánto tiempo pasas sentada?",
          sublabel: "Incluye descanso, TV, comidas, ordenador, lectura...",
          placeholder: "Minutos por día", min: 0, max: 960,
          help: "Todo el tiempo que pasas sentada o recostada (sin dormir) en un día de fin de semana típico."
        }
      ]
    }
  ]
};

// Helper: check if IPAQ condition is met
export function isIpaqConditionMet(question, answers) {
  if (!question.condition) return true;
  const { field, greaterThan, equal } = question.condition;
  const value = answers[field];
  if (greaterThan !== undefined) return value != null && Number(value) > greaterThan;
  if (equal !== undefined) return value === equal;
  return true;
}

// Get all questions from IPAQ long (flattened)
export function getIpaqLongQuestions() {
  return IPAQ_LONG.parts.flatMap(p => p.questions);
}
