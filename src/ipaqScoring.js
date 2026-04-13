// IPAQ Scoring — MET-minutes/week calculation and classification
// Based on IPAQ scoring protocol (www.ipaq.ki.se)
// NOTA: Los nombres de campo usan sufijo 'Min' (no 'Minutes')
// para coincidir con los IDs definidos en ipaqData.js y con las columnas de Supabase.

const MET_WALK     = 3.3
const MET_MODERATE = 4.0
const MET_VIGOROUS = 8.0
const MET_CYCLING  = 6.0
const MET_YARD_VIG = 5.5  // Actividad vigorosa jardín (IPAQ protocolo)
const MET_HOME_IN  = 3.0  // Actividad moderada interior hogar (IPAQ protocolo)

// Helper: convierte el valor a número, aplica regla mínimo 10 min (IPAQ 7.3)
const v = (answers, key) => {
  const val = Number(answers[key]) || 0
  return val < 10 ? 0 : val  // bouts < 10 min no cuentan
}

// ─── IPAQ Long Scoring ───────────────────────────────────────────
export function scoreIpaqLong(answers) {
  // Trabajo
  const workVigDays  = Number(answers.ipaq_l_workVigDays)  || 0
  const workVigMin   = v(answers, 'ipaq_l_workVigMin')
  const workModDays  = Number(answers.ipaq_l_workModDays)  || 0
  const workModMin   = v(answers, 'ipaq_l_workModMin')
  const workWalkDays = Number(answers.ipaq_l_workWalkDays) || 0
  const workWalkMin  = v(answers, 'ipaq_l_workWalkMin')

  const workVigMET  = MET_VIGOROUS * workVigDays  * workVigMin
  const workModMET  = MET_MODERATE * workModDays  * workModMin
  const workWalkMET = MET_WALK     * workWalkDays * workWalkMin
  const workTotal   = workVigMET + workModMET + workWalkMET

  // Transporte
  const transBikeDays = Number(answers.ipaq_l_transBikeDays) || 0
  const transBikeMin  = v(answers, 'ipaq_l_transBikeMin')
  const transWalkDays = Number(answers.ipaq_l_transWalkDays) || 0
  const transWalkMin  = v(answers, 'ipaq_l_transWalkMin')

  const transBikeMET = MET_CYCLING * transBikeDays * transBikeMin
  const transWalkMET = MET_WALK    * transWalkDays * transWalkMin
  const transportTotal = transBikeMET + transWalkMET

  // Hogar/Jardín (METs correctos según protocolo IPAQ 2005)
  const homeVigDays    = Number(answers.ipaq_l_homeVigDays)    || 0
  const homeVigMin     = v(answers, 'ipaq_l_homeVigMin')
  const homeModOutDays = Number(answers.ipaq_l_homeModOutDays) || 0
  const homeModOutMin  = v(answers, 'ipaq_l_homeModOutMin')
  const homeModInDays  = Number(answers.ipaq_l_homeModInDays)  || 0
  const homeModInMin   = v(answers, 'ipaq_l_homeModInMin')

  const homeVigMET    = MET_YARD_VIG * homeVigDays    * homeVigMin
  const homeModOutMET = MET_MODERATE * homeModOutDays * homeModOutMin
  const homeModInMET  = MET_HOME_IN  * homeModInDays  * homeModInMin
  const homeTotal     = homeVigMET + homeModOutMET + homeModInMET

  // Tiempo libre
  const leisWalkDays = Number(answers.ipaq_l_leisWalkDays) || 0
  const leisWalkMin  = v(answers, 'ipaq_l_leisWalkMin')
  const leisVigDays  = Number(answers.ipaq_l_leisVigDays)  || 0
  const leisVigMin   = v(answers, 'ipaq_l_leisVigMin')
  const leisModDays  = Number(answers.ipaq_l_leisModDays)  || 0
  const leisModMin   = v(answers, 'ipaq_l_leisModMin')

  const leisWalkMET = MET_WALK     * leisWalkDays * leisWalkMin
  const leisVigMET  = MET_VIGOROUS * leisVigDays  * leisVigMin
  const leisModMET  = MET_MODERATE * leisModDays  * leisModMin
  const leisureTotal = leisWalkMET + leisVigMET + leisModMET

  // Totales por tipo de actividad
  const totalWalkMET = workWalkMET + transWalkMET + leisWalkMET
  const totalModMET  = workModMET + transBikeMET + homeVigMET + homeModOutMET + homeModInMET + leisModMET
  const totalVigMET  = workVigMET + leisVigMET
  const totalMET     = workTotal + transportTotal + homeTotal + leisureTotal

  // Sedentarismo
  const sitWeekday = Number(answers.ipaq_l_sitWeekday) || 0
  const sitWeekend = Number(answers.ipaq_l_sitWeekend) || 0
  const sitTotalWeek = (sitWeekday * 5) + (sitWeekend * 2)
  const sitAvgDay    = Math.round((sitTotalWeek / 7) * 10) / 10

  // Clasificación categórica
  const vigDaysTotal  = Math.max(workVigDays, homeVigDays, leisVigDays)
  const modDaysTotal  = Math.max(workModDays, homeModOutDays, homeModInDays, leisModDays)
  const walkDaysTotal = Math.max(workWalkDays, transWalkDays, leisWalkDays)
  const totalActiveDays = Math.min(7, workVigDays + workModDays + workWalkDays +
    transBikeDays + transWalkDays + homeVigDays + homeModOutDays + homeModInDays +
    leisWalkDays + leisVigDays + leisModDays)

  const category = classifyIpaq({
    vigDays: vigDaysTotal, vigMin: workVigMin + homeVigMin + leisVigMin,
    modDays: modDaysTotal, modMin: workModMin + homeModOutMin + homeModInMin + leisModMin,
    walkDays: walkDaysTotal, walkMin: workWalkMin + transWalkMin + leisWalkMin,
    totalActiveDays, totalMET
  })

  return {
    // Scores por dominio
    met_work:      Math.round(workTotal),
    met_transport: Math.round(transportTotal),
    met_home:      Math.round(homeTotal),
    met_leisure:   Math.round(leisureTotal),
    // Scores por tipo
    met_walking_total:  Math.round(totalWalkMET),
    met_moderate_total: Math.round(totalModMET),
    met_vigorous_total: Math.round(totalVigMET),
    met_total:          Math.round(totalMET),
    // Sedentarismo
    sit_total_min_week: sitTotalWeek,
    sit_avg_min_day:    sitAvgDay,
    sit_weekday:        sitWeekday,
    sit_weekend:        sitWeekend,
    // Clasificación
    category,       // 'low' | 'moderate' | 'high'
    // Datos brutos normalizados (con nombres Min, no Minutes)
    raw: {
      work_vig_days: workVigDays, work_vig_min: workVigMin,
      work_mod_days: workModDays, work_mod_min: workModMin,
      work_walk_days: workWalkDays, work_walk_min: workWalkMin,
      trans_bike_days: transBikeDays, trans_bike_min: transBikeMin,
      trans_walk_days: transWalkDays, trans_walk_min: transWalkMin,
      home_vig_days: homeVigDays, home_vig_min: homeVigMin,
      home_mod_out_days: homeModOutDays, home_mod_out_min: homeModOutMin,
      home_mod_in_days: homeModInDays, home_mod_in_min: homeModInMin,
      leis_walk_days: leisWalkDays, leis_walk_min: leisWalkMin,
      leis_vig_days: leisVigDays, leis_vig_min: leisVigMin,
      leis_mod_days: leisModDays, leis_mod_min: leisModMin,
    }
  }
}

// ─── Clasificación IPAQ ──────────────────────────────────────
function classifyIpaq({ vigDays, vigMin, modDays, modMin, walkDays, walkMin, totalActiveDays, totalMET }) {
  // HIGH
  if (vigDays >= 3 && totalMET >= 1500) return 'high'
  if (totalActiveDays >= 7 && totalMET >= 3000) return 'high'
  // MODERATE
  if (vigDays >= 3 && vigMin >= 20) return 'moderate'
  if (modDays >= 5 && modMin >= 30) return 'moderate'
  if (walkDays >= 5 && walkMin >= 30) return 'moderate'
  if (totalActiveDays >= 5 && totalMET >= 600) return 'moderate'
  // LOW
  return 'low'
}

// ─── Labels ──────────────────────────────────────────────────
export const IPAQ_CATEGORIES = {
  low:      { label: 'Bajo',     num: 1, color: '#EF4444', bg: '#FEF2F2', description: 'Nivel de actividad física bajo. No alcanzas los criterios de moderado o alto.' },
  moderate: { label: 'Moderado', num: 2, color: '#F59E0B', bg: '#FFFBEB', description: 'Nivel de actividad física moderado. Cumples con las recomendaciones mínimas.' },
  high:     { label: 'Alto',     num: 3, color: '#22C55E', bg: '#F0FDF4', description: 'Nivel de actividad física alto. Superas ampliamente las recomendaciones.' }
}

export function formatMET(met) {
  if (met >= 1000) return `${(met / 1000).toFixed(1)}k`
  return String(Math.round(met))
}
