// IPAQ (International Physical Activity Questionnaire)
// Long form — todos los campos numéricos usan desplegable
// El value siempre es el número limpio (sin unidades)

const DAYS_OPTIONS = [
  { value: "0", label: "0 días" },
  { value: "1", label: "1 día" },
  ...Array.from({ length: 6 }, (_, i) => ({ value: String(i + 2), label: `${i + 2} días` }))
]

const MINUTES_OPTIONS = [
  { value: "5", label: "5 minutos" },
  { value: "10", label: "10 minutos" },
  { value: "15", label: "15 minutos" },
  { value: "20", label: "20 minutos" },
  { value: "25", label: "25 minutos" },
  { value: "30", label: "30 minutos" },
  { value: "35", label: "35 minutos" },
  { value: "40", label: "40 minutos" },
  { value: "45", label: "45 minutos" },
  { value: "50", label: "50 minutos" },
  { value: "55", label: "55 minutos" },
  { value: "60", label: "60 minutos (1 hora)" },
  { value: "65", label: "65 minutos" },
  { value: "70", label: "70 minutos" },
  { value: "75", label: "75 minutos" },
  { value: "80", label: "80 minutos" },
  { value: "85", label: "85 minutos" },
  { value: "90", label: "90 minutos (1h 30min)" },
  { value: "95", label: "95 minutos" },
  { value: "100", label: "100 minutos" },
  { value: "105", label: "105 minutos" },
  { value: "110", label: "110 minutos" },
  { value: "115", label: "115 minutos" },
  { value: "120", label: "120 minutos (2 horas)" },
  { value: "125", label: "125 minutos" },
  { value: "130", label: "130 minutos" },
  { value: "135", label: "135 minutos" },
  { value: "140", label: "140 minutos" },
  { value: "145", label: "145 minutos" },
  { value: "150", label: "150 minutos (2h 30min)" },
  { value: "155", label: "155 minutos" },
  { value: "160", label: "160 minutos" },
  { value: "165", label: "165 minutos" },
  { value: "170", label: "170 minutos" },
  { value: "175", label: "175 minutos" },
  { value: "180", label: "180 minutos (3 horas)" },
  { value: "185", label: "185 minutos" },
  { value: "190", label: "190 minutos" },
  { value: "195", label: "195 minutos" },
  { value: "200", label: "200 minutos" },
  { value: "205", label: "205 minutos" },
  { value: "210", label: "210 minutos (3h 30min)" },
  { value: "215", label: "215 minutos" },
  { value: "220", label: "220 minutos" },
  { value: "225", label: "225 minutos" },
  { value: "230", label: "230 minutos" },
  { value: "235", label: "235 minutos" },
  { value: "240", label: "240 minutos (4 horas)" },
  { value: "245", label: "245 minutos" },
  { value: "250", label: "250 minutos" },
  { value: "255", label: "255 minutos" },
  { value: "260", label: "260 minutos" },
  { value: "265", label: "265 minutos" },
  { value: "270", label: "270 minutos (4h 30min)" },
  { value: "275", label: "275 minutos" },
  { value: "280", label: "280 minutos" },
  { value: "285", label: "285 minutos" },
  { value: "290", label: "290 minutos" },
  { value: "295", label: "295 minutos" },
  { value: "300", label: "300 minutos (5 horas)" },
  { value: "305", label: "305 minutos" },
  { value: "310", label: "310 minutos" },
  { value: "315", label: "315 minutos" },
  { value: "320", label: "320 minutos" },
  { value: "325", label: "325 minutos" },
  { value: "330", label: "330 minutos (5h 30min)" },
  { value: "335", label: "335 minutos" },
  { value: "340", label: "340 minutos" },
  { value: "345", label: "345 minutos" },
  { value: "350", label: "350 minutos" },
  { value: "355", label: "355 minutos" },
  { value: "360", label: "360 minutos (6 horas)" },
  { value: "365", label: "365 minutos" },
  { value: "370", label: "370 minutos" },
  { value: "375", label: "375 minutos" },
  { value: "380", label: "380 minutos" },
  { value: "385", label: "385 minutos" },
  { value: "390", label: "390 minutos (6h 30min)" },
  { value: "395", label: "395 minutos" },
  { value: "400", label: "400 minutos" },
  { value: "405", label: "405 minutos" },
  { value: "410", label: "410 minutos" },
  { value: "415", label: "415 minutos" },
  { value: "420", label: "420 minutos (7 horas)" },
  { value: "425", label: "425 minutos" },
  { value: "430", label: "430 minutos" },
  { value: "435", label: "435 minutos" },
  { value: "440", label: "440 minutos" },
  { value: "445", label: "445 minutos" },
  { value: "450", label: "450 minutos (7h 30min)" },
  { value: "455", label: "455 minutos" },
  { value: "460", label: "460 minutos" },
  { value: "465", label: "465 minutos" },
  { value: "470", label: "470 minutos" },
  { value: "475", label: "475 minutos" },
  { value: "480", label: "480 minutos (8 horas)" },
  { value: "485", label: "485 minutos" },
  { value: "490", label: "490 minutos" },
  { value: "495", label: "495 minutos" },
  { value: "500", label: "500 minutos" },
  { value: "505", label: "505 minutos" },
  { value: "510", label: "510 minutos (8h 30min)" },
  { value: "515", label: "515 minutos" },
  { value: "520", label: "520 minutos" },
  { value: "525", label: "525 minutos" },
  { value: "530", label: "530 minutos" },
  { value: "535", label: "535 minutos" },
  { value: "540", label: "540 minutos (9 horas)" },
  { value: "545", label: "545 minutos" },
  { value: "550", label: "550 minutos" },
  { value: "555", label: "555 minutos" },
  { value: "560", label: "560 minutos" },
  { value: "565", label: "565 minutos" },
  { value: "570", label: "570 minutos (9h 30min)" },
  { value: "575", label: "575 minutos" },
  { value: "580", label: "580 minutos" },
  { value: "585", label: "585 minutos" },
  { value: "590", label: "590 minutos" },
  { value: "595", label: "595 minutos" },
  { value: "600", label: "600 minutos (10 horas)" },
  { value: "605", label: "605 minutos" },
  { value: "610", label: "610 minutos" },
  { value: "615", label: "615 minutos" },
  { value: "620", label: "620 minutos" },
  { value: "625", label: "625 minutos" },
  { value: "630", label: "630 minutos (10h 30min)" },
  { value: "635", label: "635 minutos" },
  { value: "640", label: "640 minutos" },
  { value: "645", label: "645 minutos" },
  { value: "650", label: "650 minutos" },
  { value: "655", label: "655 minutos" },
  { value: "660", label: "660 minutos (11 horas)" },
  { value: "665", label: "665 minutos" },
  { value: "670", label: "670 minutos" },
  { value: "675", label: "675 minutos" },
  { value: "680", label: "680 minutos" },
  { value: "685", label: "685 minutos" },
  { value: "690", label: "690 minutos (11h 30min)" },
  { value: "695", label: "695 minutos" },
  { value: "700", label: "700 minutos" },
  { value: "705", label: "705 minutos" },
  { value: "710", label: "710 minutos" },
  { value: "715", label: "715 minutos" },
  { value: "720", label: "720 minutos (12 horas)" },
  { value: "725", label: "725 minutos" },
  { value: "730", label: "730 minutos" },
  { value: "735", label: "735 minutos" },
  { value: "740", label: "740 minutos" },
  { value: "745", label: "745 minutos" },
  { value: "750", label: "750 minutos (12h 30min)" },
  { value: "755", label: "755 minutos" },
  { value: "760", label: "760 minutos" },
  { value: "765", label: "765 minutos" },
  { value: "770", label: "770 minutos" },
  { value: "775", label: "775 minutos" },
  { value: "780", label: "780 minutos (13 horas)" },
  { value: "785", label: "785 minutos" },
  { value: "790", label: "790 minutos" },
  { value: "795", label: "795 minutos" },
  { value: "800", label: "800 minutos" },
  { value: "805", label: "805 minutos" },
  { value: "810", label: "810 minutos (13h 30min)" },
  { value: "815", label: "815 minutos" },
  { value: "820", label: "820 minutos" },
  { value: "825", label: "825 minutos" },
  { value: "830", label: "830 minutos" },
  { value: "835", label: "835 minutos" },
  { value: "840", label: "840 minutos (14 horas)" },
  { value: "845", label: "845 minutos" },
  { value: "850", label: "850 minutos" },
  { value: "855", label: "855 minutos" },
  { value: "860", label: "860 minutos" },
  { value: "865", label: "865 minutos" },
  { value: "870", label: "870 minutos (14h 30min)" },
  { value: "875", label: "875 minutos" },
  { value: "880", label: "880 minutos" },
  { value: "885", label: "885 minutos" },
  { value: "890", label: "890 minutos" },
  { value: "895", label: "895 minutos" },
  { value: "900", label: "900 minutos (15 horas)" },
  { value: "905", label: "905 minutos" },
  { value: "910", label: "910 minutos" },
  { value: "915", label: "915 minutos" },
  { value: "920", label: "920 minutos" },
  { value: "925", label: "925 minutos" },
  { value: "930", label: "930 minutos (15h 30min)" },
  { value: "935", label: "935 minutos" },
  { value: "940", label: "940 minutos" },
  { value: "945", label: "945 minutos" },
  { value: "950", label: "950 minutos" },
  { value: "955", label: "955 minutos" },
  { value: "960", label: "960 minutos (16 horas)" },
  { value: "965", label: "965 minutos" },
  { value: "970", label: "970 minutos" },
  { value: "975", label: "975 minutos" },
  { value: "980", label: "980 minutos" },
  { value: "985", label: "985 minutos" },
  { value: "990", label: "990 minutos (16h 30min)" },
  { value: "995", label: "995 minutos" },
  { value: "1000", label: "1000 minutos" }
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
