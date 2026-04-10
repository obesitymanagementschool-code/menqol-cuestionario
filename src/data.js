// MENQOL validated instrument — 29 items (Hilditch et al., 1996)
// Labels exactos del cuestionario CS
// Scale: 0-6 (0 = no me molesta, 6 = muchísimo)
// Internal scoring: present ? rating + 2 : 1 → maps to MENQOL 1-8

export const DOMAINS = [
  {
    id: "vasomotor",
    name: "Vasomotores",
    emoji: "🌡️",
    color: "#E8927C",
    colorLight: "#FFF0EC",
    colorMid: "#FDDDD5",
    shortName: "Vasomotor",
    description: "Síntomas vasomotores (ítems 1-3)",
    items: [
      { id: 1, label: "Sofocos" },
      { id: 2, label: "Sudores nocturnos" },
      { id: 3, label: "Sudoración" }
    ]
  },
  {
    id: "psychosocial",
    name: "Psicosociales",
    emoji: "🧠",
    color: "#7C9CE8",
    colorLight: "#EEF2FF",
    colorMid: "#D5DDFB",
    shortName: "Psicosocial",
    description: "Síntomas psicosociales (ítems 4-10)",
    items: [
      { id: 4,  label: "Sentirse insatisfecha con su vida personal" },
      { id: 5,  label: "Sentirse ansiosa o nerviosa" },
      { id: 6,  label: "Tener mala memoria" },
      { id: 7,  label: "Lograr hacer menos cosas de las que solía hacer" },
      { id: 8,  label: "Sentirse deprimida, desanimada o triste" },
      { id: 9,  label: "Ser impaciente con los demás" },
      { id: 10, label: "Deseos de estar sola" }
    ]
  },
  {
    id: "physical",
    name: "Físicos",
    emoji: "💪",
    color: "#7CC8A8",
    colorLight: "#ECFDF5",
    colorMid: "#D1FAE5",
    shortName: "Físico",
    description: "Síntomas físicos (ítems 11-26)",
    items: [
      { id: 11, label: "Flatulencias (gases) o dolor por gases" },
      { id: 12, label: "Dolor en músculos y articulaciones" },
      { id: 13, label: "Sentirse cansada o agotada" },
      { id: 14, label: "Dificultad para dormir" },
      { id: 15, label: "Dolores en la nuca o en la cabeza" },
      { id: 16, label: "Disminución de la fuerza física" },
      { id: 17, label: "Disminución de la resistencia física" },
      { id: 18, label: "Sensación de falta de energía" },
      { id: 19, label: "Sequedad en la piel" },
      { id: 20, label: "Aumento de peso" },
      { id: 21, label: "Aumento del vello facial" },
      { id: 22, label: "Cambios en el aspecto, textura o tono de su piel" },
      { id: 23, label: "Sentirse hinchada" },
      { id: 24, label: "Dolor en la parte baja de la espalda (lumbar)" },
      { id: 25, label: "Orinar con frecuencia" },
      { id: 26, label: "Pérdida involuntaria de orina al reír o toser" }
    ]
  },
  {
    id: "sexual",
    name: "Sexuales",
    emoji: "❤️",
    color: "#C87CAE",
    colorLight: "#FDF2F8",
    colorMid: "#FCE7F3",
    shortName: "Sexual",
    description: "Síntomas sexuales (ítems 27-29)",
    items: [
      { id: 27, label: "Cambios en su deseo sexual" },
      { id: 28, label: "Sequedad vaginal durante las relaciones sexuales" },
      { id: 29, label: "Evitar la intimidad (evitar el contacto íntimo)" }
    ]
  }
]
