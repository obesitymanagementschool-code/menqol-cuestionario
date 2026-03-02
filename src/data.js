// MENQOL validated instrument — 29 items in original order (Hilditch et al., 1996)
// Scale: 0-6 (0 = no me molesta, 6 = muchísimo)
// Internal scoring: present ? rating + 2 : 1 → maps to MENQOL 1-8

export const DOMAINS = [
  {
    id: "vasomotor",
    name: "Síntomas Vasomotores",
    emoji: "🌡️",
    color: "#E8927C",
    colorLight: "#FFF0EC",
    colorMid: "#FDDDD5",
    description: "Síntomas relacionados con la regulación de la temperatura corporal",
    items: [
      {
        id: 1,
        label: "Sofocos o bochornos",
        help: "Sensaciones repentinas de calor intenso, generalmente en la parte superior del cuerpo, cara y cuello. Pueden durar de unos segundos a varios minutos.",
        scale: {
          low: "Sofocos ocasionales y breves que no interrumpen tus actividades",
          mid: "Sofocos frecuentes que causan incomodidad y te obligan a pausar lo que haces",
          high: "Sofocos muy intensos y constantes que dificultan seriamente tu día a día"
        }
      },
      {
        id: 2,
        label: "Sudores nocturnos",
        help: "Episodios de sudoración excesiva durante la noche que pueden interrumpir el sueño y obligarte a cambiar ropa de cama.",
        scale: {
          low: "Sudoración leve ocasional que no afecta mucho tu descanso",
          mid: "Te despiertas varias veces empapada, necesitas cambiar ropa o sábanas",
          high: "Sudores intensos cada noche que arruinan completamente tu sueño"
        }
      },
      {
        id: 3,
        label: "Sudoración excesiva",
        help: "Mayor tendencia a sudar durante el día, incluso sin esfuerzo físico o calor ambiental.",
        scale: {
          low: "Sudas algo más de lo habitual en ciertas situaciones",
          mid: "Sudoración notable que te incomoda socialmente o laboralmente",
          high: "Sudoración extrema y constante que limita tus actividades diarias"
        }
      }
    ]
  },
  {
    id: "psychosocial",
    name: "Síntomas Psicosociales",
    emoji: "🧠",
    color: "#7C9CE8",
    colorLight: "#EEF2FF",
    colorMid: "#D5DDFB",
    description: "Aspectos emocionales, cognitivos y sociales",
    items: [
      {
        id: 4,
        label: "Sentirse insatisfecha con su vida personal",
        help: "Sensación de no estar contenta con tu vida actual, falta de plenitud o de sentido en el día a día.",
        scale: {
          low: "Momentos puntuales de insatisfacción que pasan relativamente rápido",
          mid: "Sensación frecuente de estancamiento o falta de propósito",
          high: "Insatisfacción profunda y constante con tu vida personal"
        }
      },
      {
        id: 5,
        label: "Sentirse ansiosa o nerviosa",
        help: "Sensación de inquietud, preocupación excesiva o tensión sin causa aparente.",
        scale: {
          low: "Momentos puntuales de nerviosismo que puedes manejar",
          mid: "Ansiedad frecuente que afecta tu concentración y relaciones",
          high: "Ansiedad constante e intensa que domina tu estado emocional"
        }
      },
      {
        id: 6,
        label: "Tener mala memoria",
        help: "Olvidos frecuentes, dificultad para recordar nombres, palabras o dónde dejaste las cosas (niebla mental).",
        scale: {
          low: "Olvidos ocasionales menores que no afectan tu día a día",
          mid: "Olvidos frecuentes que causan problemas prácticos",
          high: "Problemas de memoria severos que te preocupan y limitan"
        }
      },
      {
        id: 7,
        label: "Lograr hacer menos cosas de las que solía hacer",
        help: "Sensación de que tu capacidad para completar tareas ha disminuido respecto a antes.",
        scale: {
          low: "Rindes algo menos que antes pero cumples con lo importante",
          mid: "Notas una reducción clara de tu productividad y capacidad",
          high: "Tu rendimiento ha caído drásticamente comparado con antes"
        }
      },
      {
        id: 8,
        label: "Sentirse deprimida, desanimada o triste",
        help: "Sensación persistente de desánimo, tristeza o falta de interés en actividades que antes disfrutabas.",
        scale: {
          low: "Días puntuales de bajón anímico que pasan relativamente rápido",
          mid: "Tristeza frecuente que afecta tu motivación y relaciones",
          high: "Tristeza profunda y persistente que te impide funcionar con normalidad"
        }
      },
      {
        id: 9,
        label: "Ser impaciente con los demás",
        help: "Mayor irritabilidad, menor tolerancia y reacciones desproporcionadas ante situaciones cotidianas.",
        scale: {
          low: "Algo más irritable de lo habitual pero lo controlas",
          mid: "Irritabilidad frecuente que afecta tus relaciones personales",
          high: "Reacciones intensas y constantes que generan conflictos importantes"
        }
      },
      {
        id: 10,
        label: "Deseos de estar sola",
        help: "Deseo de aislarte, evitar compromisos sociales o sentir que necesitas más tiempo a solas del habitual.",
        scale: {
          low: "Prefieres más tiempo a solas que antes pero mantienes tu vida social",
          mid: "Evitas activamente compromisos sociales con frecuencia",
          high: "Aislamiento marcado que afecta tus relaciones y responsabilidades"
        }
      }
    ]
  },
  {
    id: "physical",
    name: "Síntomas Físicos",
    emoji: "💪",
    color: "#7CC8A8",
    colorLight: "#ECFDF5",
    colorMid: "#D1FAE5",
    description: "Molestias y cambios corporales",
    items: [
      {
        id: 11,
        label: "Flatulencia o gases",
        help: "Aumento de gases intestinales, hinchazón abdominal o molestias digestivas.",
        scale: {
          low: "Gases ocasionales que no causan mucha molestia",
          mid: "Gases frecuentes que causan incomodidad social o física",
          high: "Problemas digestivos constantes que limitan tu alimentación y bienestar"
        }
      },
      {
        id: 12,
        label: "Dolor en músculos y articulaciones",
        help: "Dolores en músculos y articulaciones, rigidez matutina o molestias al moverte.",
        scale: {
          low: "Molestias leves que no limitan tu actividad",
          mid: "Dolor frecuente que dificulta algunas actividades",
          high: "Dolor intenso y constante que limita seriamente tu movilidad"
        }
      },
      {
        id: 13,
        label: "Sentirse cansada o agotada",
        help: "Sensación de agotamiento, falta de energía o necesidad de descansar más de lo habitual.",
        scale: {
          low: "Algo más cansada de lo habitual pero funcional",
          mid: "Fatiga frecuente que reduce tu productividad",
          high: "Agotamiento extremo que te impide realizar actividades básicas"
        }
      },
      {
        id: 14,
        label: "Dificultad para dormir",
        help: "Problemas para conciliar el sueño, despertares frecuentes o sueño no reparador.",
        scale: {
          low: "Tardas algo más en dormirte o te despiertas alguna vez",
          mid: "Problemas de sueño varias noches por semana",
          high: "Insomnio severo casi todas las noches que afecta tu funcionamiento"
        }
      },
      {
        id: 15,
        label: "Dolores de cabeza",
        help: "Cefaleas nuevas o más frecuentes/intensas que antes de la menopausia.",
        scale: {
          low: "Dolores de cabeza ocasionales y manejables",
          mid: "Dolores frecuentes que requieren medicación",
          high: "Dolores intensos y frecuentes que te incapacitan"
        }
      },
      {
        id: 16,
        label: "Dolor de espalda, cuello u hombros",
        help: "Molestias en la zona lumbar, dorsal, cervical u hombros, que pueden ser nuevas o haberse intensificado.",
        scale: {
          low: "Molestias leves y ocasionales",
          mid: "Dolor frecuente que limita ciertas posturas o actividades",
          high: "Dolor constante e intenso que afecta tu calidad de vida"
        }
      },
      {
        id: 17,
        label: "Necesidad frecuente de orinar",
        help: "Aumento en la frecuencia urinaria, urgencia o necesidad de levantarte por la noche.",
        scale: {
          low: "Vas al baño algo más a menudo pero no es un problema",
          mid: "Urgencia frecuente que afecta tus actividades o sueño",
          high: "Necesidad constante que limita seriamente tu vida diaria"
        }
      },
      {
        id: 18,
        label: "Incontinencia urinaria al reír, toser o estornudar",
        help: "Pérdidas involuntarias de orina al reír, toser, estornudar o hacer esfuerzo físico.",
        scale: {
          low: "Pérdidas muy pequeñas y ocasionales",
          mid: "Pérdidas frecuentes que requieren protección",
          high: "Pérdidas significativas que limitan tus actividades y confianza"
        }
      },
      {
        id: 19,
        label: "Hinchazón abdominal",
        help: "Sensación de abdomen distendido, pesadez o retención de líquidos en la zona abdominal.",
        scale: {
          low: "Hinchazón ocasional que no afecta tu comodidad",
          mid: "Hinchazón frecuente que te obliga a adaptar tu ropa",
          high: "Hinchazón constante y molesta que afecta tu imagen y comodidad"
        }
      },
      {
        id: 20,
        label: "Dolor lumbar",
        help: "Dolor en la parte baja de la espalda, que puede ser constante o aparecer con ciertos movimientos.",
        scale: {
          low: "Molestias leves que no limitan tu actividad",
          mid: "Dolor frecuente que dificulta agacharte o estar de pie",
          high: "Dolor intenso que limita seriamente tu movilidad diaria"
        }
      },
      {
        id: 21,
        label: "Aumento de peso",
        help: "Ganancia de peso no intencionada o dificultad para mantener tu peso habitual.",
        scale: {
          low: "Ligero aumento que notas pero no te preocupa mucho",
          mid: "Aumento notable que afecta tu autoestima o salud",
          high: "Aumento significativo que impacta tu salud y calidad de vida"
        }
      },
      {
        id: 22,
        label: "Aumento del vello facial",
        help: "Aparición o aumento de vello en zonas como labio superior, mentón o mejillas.",
        scale: {
          low: "Vello ligeramente más visible que antes",
          mid: "Vello notable que requiere depilación frecuente",
          high: "Crecimiento abundante que afecta tu autoestima"
        }
      },
      {
        id: 23,
        label: "Cambios en la piel (sequedad, manchas, arrugas)",
        help: "Sequedad, descamación, aparición de manchas, arrugas más pronunciadas o cambios en la textura de la piel.",
        scale: {
          low: "Cambios leves que notas pero no te preocupan",
          mid: "Cambios visibles que afectan tu autoestima",
          high: "Cambios marcados que te causan malestar importante"
        }
      },
      {
        id: 24,
        label: "Sensación de hinchazón en extremidades",
        help: "Piernas, tobillos o manos hinchados, sensación de pesadez o retención de líquidos.",
        scale: {
          low: "Hinchazón leve al final del día que mejora con reposo",
          mid: "Hinchazón frecuente que causa incomodidad",
          high: "Hinchazón constante que limita tu movilidad y comodidad"
        }
      },
      {
        id: 25,
        label: "Falta de energía",
        help: "Sensación de agotamiento vital, pérdida de vitalidad o desgana general diferente del cansancio puntual.",
        scale: {
          low: "Menos energía que antes pero sigues activa",
          mid: "Energía baja que afecta tu productividad y actividades",
          high: "Falta de energía severa que te impide hacer lo que necesitas"
        }
      },
      {
        id: 26,
        label: "Sensación de sequedad bucal",
        help: "Boca seca, sensación de sed constante o cambios en la saliva.",
        scale: {
          low: "Sequedad leve que se alivia bebiendo agua",
          mid: "Sequedad frecuente que afecta tu comodidad",
          high: "Sequedad constante que dificulta hablar o comer"
        }
      }
    ]
  },
  {
    id: "sexual",
    name: "Síntomas Sexuales",
    emoji: "❤️",
    color: "#C87CAE",
    colorLight: "#FDF2F8",
    colorMid: "#FCE7F3",
    description: "Cambios en la salud y bienestar sexual",
    items: [
      {
        id: 27,
        label: "Cambios en el deseo sexual",
        help: "Disminución del interés o apetito sexual respecto a antes de la menopausia.",
        scale: {
          low: "Ligera disminución que no afecta tu relación",
          mid: "Reducción notable que genera preocupación o tensión de pareja",
          high: "Pérdida casi total de interés sexual que afecta tu relación"
        }
      },
      {
        id: 28,
        label: "Sequedad vaginal",
        help: "Falta de lubricación natural que puede causar incomodidad general o durante las relaciones.",
        scale: {
          low: "Sequedad leve que se maneja con lubricantes",
          mid: "Sequedad que causa incomodidad frecuente",
          high: "Sequedad severa que causa dolor y limita la actividad sexual"
        }
      },
      {
        id: 29,
        label: "Evitar la intimidad",
        help: "Tendencia a evitar las relaciones sexuales por incomodidad, dolor o falta de deseo.",
        scale: {
          low: "Evitas ocasionalmente pero mantienes intimidad",
          mid: "Evitas frecuentemente lo que genera tensión en la relación",
          high: "Evitas completamente la intimidad, afectando tu relación"
        }
      }
    ]
  }
];
