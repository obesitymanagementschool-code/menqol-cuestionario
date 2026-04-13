// submitData.js
// Toda la lógica de envío a Supabase. Importar en App.jsx.
// Construye los payloads para responses_raw y responses_anonymous
// y los envía en paralelo.

import { supabase } from './supabase.js'
import { scoreIpaqLong, IPAQ_CATEGORIES } from './ipaqScoring.js'

// ── Helpers de codificación ─────────────────────────────────

// Variables dicotómicas yesno (true/false → 1/0)
const yn = (val) => val === true ? 1 : val === false ? 0 : null

// Variables de radio con opciones no/yes_no_tx/yes_tx → 0/1/2
const condition3 = (val) => {
  if (val === 'no' || val === false) return 0
  if (val === 'yes_no_tx') return 1
  if (val === 'yes_tx') return 2
  return null
}

// BMI classification
const bmiClass = (bmi) => {
  if (!bmi) return { text: null, num: null }
  if (bmi < 18.5) return { text: 'Infrapeso',    num: 1 }
  if (bmi < 25)   return { text: 'Normopeso',     num: 2 }
  if (bmi < 30)   return { text: 'Sobrepeso',     num: 3 }
  if (bmi < 35)   return { text: 'Obesidad_I',    num: 4 }
  if (bmi < 40)   return { text: 'Obesidad_II',   num: 5 }
  return            { text: 'Obesidad_III',  num: 6 }
}

// Calcular BMI
const calcBmi = (weight, height) => {
  if (!weight || !height || height < 100) return null
  return Math.round((weight / Math.pow(height / 100, 2)) * 10) / 10
}

// Etapa reproductiva: stage en inglés → num/text en español
const reproStageMap = {
  surgical_menopause:  { num: 5, text: 'Menopausia_quirurgica' },
  induced_menopause:   { num: 5, text: 'Menopausia_quirurgica' },
  hysterectomy:        { num: 9, text: 'Indeterminado' },
  postmenopause:       { num: 4, text: 'Posmenopausia' },
  late_perimenopause:  { num: 3, text: 'Perimenopausia_tardia' },
  early_perimenopause: { num: 2, text: 'Perimenopausia_temprana' },
  premenopause:        { num: 1, text: 'Premenopausia' },
  unknown:             { num: 9, text: 'Indeterminado' },
}

// Estado civil
const maritalMap = {
  single:    { text: 'Soltera',               num: 1 },
  married:   { text: 'Casada/Pareja_de_hecho',num: 2 },
  separated: { text: 'Divorciada/Separada',   num: 3 },
  widowed:   { text: 'Viuda',                 num: 4 },
}

// Educación
const educationMap = {
  none:       { text: 'Sin_estudios/Incompletos',       num: 1 },
  primary:    { text: 'Primarios',                      num: 2 },
  secondary:  { text: 'Secundarios/FP/Bachillerato',    num: 3 },
  university: { text: 'Universitarios_o_superiores',    num: 4 },
}

// Empleo
const employmentMap = {
  working:   { text: 'Trabajando',          num: 1 },
  unemployed:{ text: 'Desempleo',           num: 2 },
  homemaker: { text: 'Labores_del_hogar',   num: 3 },
  retired:   { text: 'Jubilada/Pensionista',num: 4 },
  disability:{ text: 'Incapacidad_laboral', num: 5 },
}

// Etnia
const ethnicityMap = {
  caucasian:   { text: 'Blanca/Caucasica',          num: 1 },
  arab:        { text: 'Arabe/Magrebi',              num: 2 },
  hispanic:    { text: 'Hispana/Latina',             num: 3 },
  african:     { text: 'Negra/Afrodescendiente',     num: 4 },
  asian:       { text: 'Asiatica',                   num: 5 },
  romani:      { text: 'Gitana/Pueblo_Rom',          num: 6 },
  mixed:       { text: 'Mestiza/Multirracial',       num: 7 },
  other:       { text: 'Otro',                       num: 8 },
  prefer_not:  { text: 'Prefiero_no_contestar',      num: 9 },
}

// Tabaco
const smokingMap = {
  never:   { text: 'Nunca',           num: 1 },
  former:  { text: 'Exfumadora',      num: 2 },
  current: { text: 'Fumadora_actual', num: 3 },
}

// Frecuencia alcohol
const alcoholFreqMap = {
  never:    { text: 'Nunca',           num: 1 },
  monthly:  { text: 'Menos_1x_mes',   num: 2 },
  '2-4month':{ text: '2-4x_mes',      num: 3 },
  '2-3week': { text: '2-3x_semana',   num: 4 },
  '4+week':  { text: '4+x_semana',    num: 5 },
}

// Unidades alcohol
const alcoholUnitsMap = {
  '1-2': { text: '1-2_unidades', num: 1 },
  '3-4': { text: '3-4_unidades', num: 2 },
  '5-6': { text: '5-6_unidades', num: 3 },
  '7-9': { text: '7-9_unidades', num: 4 },
  '10+': { text: '10+_unidades', num: 5 },
}

// Binge
const alcoholBingeMap = {
  never:        { text: 'Nunca',          num: 1 },
  less_monthly: { text: 'Menos_1x_mes',  num: 2 },
  monthly:      { text: 'Mensual',        num: 3 },
  weekly:       { text: 'Semanal',        num: 4 },
  daily:        { text: 'Diario',         num: 5 },
}

// Actividad física auto-reportada
const selfPaMap = {
  none:     { text: 'No_realizo_ejercicio',   num: 1 },
  aerobic:  { text: 'Aerobico/cardiovascular',num: 2 },
  strength: { text: 'Fuerza',                 num: 3 },
  combined: { text: 'Combinado',              num: 4 },
}

// Última regla
const lastPeriodMap = {
  current:    { text: '3_meses_o_menos', num: 1 },
  '3-6months':{ text: '3-6_meses',       num: 2 },
  '6-12months':{ text:'6-12_meses',      num: 3 },
  '1-5years': { text: '1-5_anos',        num: 4 },
  '5+years':  { text: 'mas_de_5_anos',   num: 5 },
}

// Ciclos irregulares / amenorrea
const yesNoNaMap = {
  yes: { text: 'Si',       num: 1 },
  no:  { text: 'No',       num: 0 },
  na:  { text: 'No_aplica',num: 9 },
}

// Ooforectomía
const oophorectomyMap = {
  no:        { text: 'No',         num: 0 },
  unilateral:{ text: 'Unilateral', num: 1 },
  bilateral: { text: 'Bilateral',  num: 2 },
}

// THM
const thmMap = {
  never:   { text: 'No',          num: 0 },
  current: { text: 'Si_actual',   num: 1 },
  past:    { text: 'Si_pasado',   num: 2 },
}

// Osteoporosis
const osteoMap = {
  no:           { text: 'No',           num: 0 },
  osteopenia:   { text: 'Osteopenia',   num: 1 },
  osteoporosis: { text: 'Osteoporosis', num: 2 },
}

// MENQOL score: NO→1, SÍ+rating → rating+2
const menqolScore = (present, rating) => {
  if (!present) return 1
  return (rating != null ? rating : 0) + 2
}

// FRAX alcohol flag
const fraxAlcohol = (unitsNum, freqNum) => {
  return (unitsNum >= 3 && freqNum >= 3) ? true : false
}

// ── Constructor del payload compartido (sin datos personales) ─

export function buildSharedPayload(studyData, menqolAnswers, ipaqAnswers, reproStage) {
  const basics      = studyData.basics      || {}
  const demo        = studyData.demographics|| {}
  const habits      = studyData.habits      || {}
  const health      = studyData.health      || {}
  const gynecology  = studyData.gynecology  || {}

  const age    = parseInt(basics.age)    || null
  const weight = parseFloat(basics.weight) || null
  const height = parseFloat(basics.height) || null
  const bmi    = calcBmi(weight, height)
  const bmiCls = bmiClass(bmi)

  const marital   = maritalMap[demo.maritalStatus]   || { text: null, num: null }
  const education = educationMap[demo.education]     || { text: null, num: null }
  const employment= employmentMap[demo.employment]   || { text: null, num: null }
  const ethnicity = ethnicityMap[demo.ethnicity]     || { text: null, num: null }

  const smoking    = smokingMap[habits.smoking]       || { text: null, num: null }
  const alcoFreq   = alcoholFreqMap[habits.alcoholFreq]|| { text: null, num: null }
  const alcoUnits  = alcoholUnitsMap[habits.alcoholUnits]|| { text: null, num: null }
  const alcoBinge  = alcoholBingeMap[habits.alcoholBinge]|| { text: null, num: null }
  const selfPa     = selfPaMap[habits.physicalActivity]|| { text: null, num: null }

  const lastPeriod = lastPeriodMap[gynecology.lastPeriod] || { text: null, num: null }
  const irrCycles  = yesNoNaMap[gynecology.irregularCycles] || { text: null, num: null }
  const amen60     = yesNoNaMap[gynecology.amenorrhea60]    || { text: null, num: null }
  const amen90     = gynecology.amenorrhea90 === 'yes' ? { text:'Si',num:1 } : { text:'No',num:0 }
  const hysterect  = { text: gynecology.hysterectomy ? 'Si':'No', num: yn(gynecology.hysterectomy) }
  const oophorect  = oophorectomyMap[gynecology.oophorectomy] || { text: null, num: null }
  const chemoRad   = { text: gynecology.chemoRadio ? 'Si':'No', num: yn(gynecology.chemoRadio) }
  const contracp   = gynecology.contraceptives === 'past' ? { text:'Si',num:1 } : { text:'No',num:0 }
  const thm        = thmMap[gynecology.thm]               || { text: null, num: null }
  const osteo      = osteoMap[health.osteoporosis]         || { text: null, num: null }

  const reproMapped = reproStage ? (reproStageMap[reproStage.stage] || { num: 9, text: 'Indeterminado' }) : { num: null, text: null }

  // IPAQ scores
  const ipaq = scoreIpaqLong(ipaqAnswers)
  const ipaqCat = IPAQ_CATEGORIES[ipaq.category] || { label: null, num: null }

  // MENQOL scores por ítem
  const menqolItems = {}
  for (let i = 1; i <= 29; i++) {
    const ans = menqolAnswers[i] || {}
    menqolItems[`menqol_${i}_present`] = ans.present ?? null
    menqolItems[`menqol_${i}_rating`]  = ans.present ? (ans.rating ?? null) : null
    menqolItems[`menqol_${i}_score`]   = ans.present !== undefined ? menqolScore(ans.present, ans.rating) : null
  }

  // MENQOL scores por dominio
  const domainScores = (ids) => {
    const scored = ids.map(i => menqolItems[`menqol_${i}_score`]).filter(s => s != null)
    if (!scored.length) return null
    return Math.round((scored.reduce((a,b)=>a+b,0) / scored.length) * 100) / 100
  }

  // FRAX
  const alcoUnitsNum = alcoUnits.num
  const alcoFreqNum  = alcoFreq.num
  const fraxAlcFlag  = fraxAlcohol(alcoUnitsNum, alcoFreqNum)

  return {
    // Bloque 1
    age, weight_kg: weight, height_cm: height, bmi,
    bmi_classification_text: bmiCls.text,
    bmi_classification_num:  bmiCls.num,

    // Bloque 2
    marital_status_text: marital.text,   marital_status_num: marital.num,
    education_text:      education.text, education_num:      education.num,
    employment_text:     employment.text,employment_num:     employment.num,
    ethnicity_text:      ethnicity.text, ethnicity_num:      ethnicity.num,

    // Bloque 3
    smoking_text: smoking.text,    smoking_num: smoking.num,
    smoking_amount: habits.smoking === 'current' ? (parseInt(habits.smokingAmount)||null) : null,
    alcohol_freq_text:  alcoFreq.text,  alcohol_freq_num:  alcoFreq.num,
    alcohol_units_text: alcoUnits.text, alcohol_units_num: alcoUnits.num,
    alcohol_binge_text: alcoBinge.text, alcohol_binge_num: alcoBinge.num,
    self_pa_text: selfPa.text, self_pa_num: selfPa.num,

    // Bloque 4
    hta_text:           health.hta === 'no' ? 'No' : health.hta === 'yes_no_tx' ? 'Si_sin_tx' : health.hta === 'yes_tx' ? 'Si_con_tx' : null,
    hta_num:            condition3(health.hta),
    diabetes_text:      health.diabetes === 'no' ? 'No' : health.diabetes === 'yes_no_tx' ? 'Si_sin_tx' : health.diabetes === 'yes_tx' ? 'Si_con_tx' : null,
    diabetes_num:       condition3(health.diabetes),
    dyslipidemia_text:  health.dyslipidemia === 'no' ? 'No' : health.dyslipidemia === 'yes_no_tx' ? 'Si_sin_tx' : health.dyslipidemia === 'yes_tx' ? 'Si_con_tx' : null,
    dyslipidemia_num:   condition3(health.dyslipidemia),
    cardiovascular_text: health.cardiovascular ? 'Si' : 'No',
    cardiovascular_num:  yn(health.cardiovascular),
    hypothyroidism_text: health.hypothyroidism === 'no' ? 'No' : health.hypothyroidism === 'yes_no_tx' ? 'Si_sin_tx' : 'Si_con_tx',
    hypothyroidism_num:  condition3(health.hypothyroidism),
    hyperthyroidism_text:health.hyperthyroidism === 'no' ? 'No' : health.hyperthyroidism === 'yes_no_tx' ? 'Si_sin_tx' : 'Si_con_tx',
    hyperthyroidism_num: condition3(health.hyperthyroidism),
    pcos_text:           health.pcos ? 'Si' : 'No',
    pcos_num:            yn(health.pcos),
    depression_text:     health.depression === 'no' ? 'No' : health.depression === 'yes_no_tx' ? 'Si_sin_tx' : 'Si_con_tx',
    depression_num:      condition3(health.depression),
    serious_illness_text:health.seriousIllness ? 'Si' : 'No',
    serious_illness_num: yn(health.seriousIllness),
    serious_illness_detail: health.seriousIllnessDetail || null,
    serious_illness_treatment_text: health.seriousIllnessTreatment === 'yes' ? 'Si' : 'No',
    serious_illness_treatment_num:  health.seriousIllnessTreatment === 'yes' ? 1 : 0,
    serious_illness_treatment_detail: health.seriousIllnessTreatmentDetail || null,
    osteoporosis_text:            osteo.text,
    osteoporosis_num:             osteo.num,
    osteoporosis_treatment_text:  health.osteoporosisTreatment ? 'Si' : 'No',
    osteoporosis_treatment_num:   yn(health.osteoporosisTreatment),
    parent_hip_fracture_text:     health.parentHipFracture ? 'Si' : 'No',
    parent_hip_fracture_num:      yn(health.parentHipFracture),
    fractures_text:               health.fractures ? 'Si' : 'No',
    fractures_num:                yn(health.fractures),
    corticoids_text:              health.corticoids ? 'Si' : 'No',
    corticoids_num:               yn(health.corticoids),
    secondary_osteoporosis_text:  health.secondaryOsteoporosis ? 'Si' : 'No',
    secondary_osteoporosis_num:   yn(health.secondaryOsteoporosis),
    arthrosis_text:               health.arthrosis ? 'Si' : 'No',
    arthrosis_num:                yn(health.arthrosis),
    arthritis_text:               health.arthritis ? 'Si' : 'No',
    arthritis_num:                yn(health.arthritis),

    // Bloque 5
    menarche_age:         gynecology.menarche === 'unknown' ? null : (parseInt(gynecology.menarche)||null),
    last_period_text:     lastPeriod.text,
    last_period_num:      lastPeriod.num,
    last_period_month:    parseInt(gynecology.lastPeriodMonth)||null,
    last_period_year:     parseInt(gynecology.lastPeriodYear)||null,
    years_without_period: parseInt(gynecology.yearsWithoutPeriod)||null,
    irregular_cycles_text:irrCycles.text, irregular_cycles_num: irrCycles.num,
    amenorrhea60_text:    amen60.text,    amenorrhea60_num:     amen60.num,
    amenorrhea90_text:    amen90.text,    amenorrhea90_num:     amen90.num,
    amenorrhea90_count:   parseInt(gynecology.amenorrhea90Count)||null,
    amenorrhea90_reason:  gynecology.amenorrhea90Reason||null,
    pregnancies:          parseInt(gynecology.pregnancies)||0,
    deliveries:           parseInt(gynecology.deliveries)||0,
    breastfeeding_months: parseInt(gynecology.breastfeedingMonths)||0,
    hysterectomy_text:    hysterect.text, hysterectomy_num: hysterect.num,
    hysterectomy_age:     parseInt(gynecology.hysterectomyAge)||null,
    oophorectomy_text:    oophorect.text, oophorectomy_num: oophorect.num,
    oophorectomy_age:     parseInt(gynecology.oophorectomyAge)||null,
    chemo_radio_text:     chemoRad.text,  chemo_radio_num:  chemoRad.num,
    contraceptives_text:  contracp.text,  contraceptives_num: contracp.num,
    contraceptives_years: parseInt(gynecology.contraceptivesYears)||null,
    contraceptives_types: gynecology.contraceptivesTypes || null,
    thm_text: thm.text, thm_num: thm.num,
    thm_duration: parseInt(gynecology.thmDuration)||null,
    thm_types: gynecology.thmTypes || null,
    reproductive_stage_text: reproMapped.text,
    reproductive_stage_num:  reproMapped.num,

    // Bloque 6 — MENQOL
    ...menqolItems,
    menqol_score_vasomotor:    domainScores([1,2,3]),
    menqol_score_psychosocial: domainScores([4,5,6,7,8,9,10]),
    menqol_score_physical:     domainScores([11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26]),
    menqol_score_sexual:       domainScores([27,28,29]),

    // Bloque 7 — IPAQ brutos
    ipaq_work_status:       typeof ipaqAnswers.ipaq_l_workStatus === 'boolean' ? ipaqAnswers.ipaq_l_workStatus : null,
    ipaq_work_vig_days:     ipaq.raw.work_vig_days,    ipaq_work_vig_min:     ipaq.raw.work_vig_min,
    ipaq_work_mod_days:     ipaq.raw.work_mod_days,    ipaq_work_mod_min:     ipaq.raw.work_mod_min,
    ipaq_work_walk_days:    ipaq.raw.work_walk_days,   ipaq_work_walk_min:    ipaq.raw.work_walk_min,
    ipaq_trans_bike_days:   ipaq.raw.trans_bike_days,  ipaq_trans_bike_min:   ipaq.raw.trans_bike_min,
    ipaq_trans_walk_days:   ipaq.raw.trans_walk_days,  ipaq_trans_walk_min:   ipaq.raw.trans_walk_min,
    ipaq_home_vig_days:     ipaq.raw.home_vig_days,    ipaq_home_vig_min:     ipaq.raw.home_vig_min,
    ipaq_home_mod_out_days: ipaq.raw.home_mod_out_days,ipaq_home_mod_out_min: ipaq.raw.home_mod_out_min,
    ipaq_home_mod_in_days:  ipaq.raw.home_mod_in_days, ipaq_home_mod_in_min:  ipaq.raw.home_mod_in_min,
    ipaq_leis_walk_days:    ipaq.raw.leis_walk_days,   ipaq_leis_walk_min:    ipaq.raw.leis_walk_min,
    ipaq_leis_vig_days:     ipaq.raw.leis_vig_days,    ipaq_leis_vig_min:     ipaq.raw.leis_vig_min,
    ipaq_leis_mod_days:     ipaq.raw.leis_mod_days,    ipaq_leis_mod_min:     ipaq.raw.leis_mod_min,
    ipaq_sit_weekday_min:   ipaq.sit_weekday,
    ipaq_sit_weekend_min:   ipaq.sit_weekend,

    // Bloque 8 — IPAQ scores
    ipaq_met_work:           ipaq.met_work,
    ipaq_met_transport:      ipaq.met_transport,
    ipaq_met_home:           ipaq.met_home,
    ipaq_met_leisure:        ipaq.met_leisure,
    ipaq_met_walking_total:  ipaq.met_walking_total,
    ipaq_met_moderate_total: ipaq.met_moderate_total,
    ipaq_met_vigorous_total: ipaq.met_vigorous_total,
    ipaq_met_total:          ipaq.met_total,
    ipaq_sit_total_min_week: ipaq.sit_total_min_week,
    ipaq_sit_avg_min_day:    ipaq.sit_avg_min_day,
    ipaq_category_text:      ipaqCat.label,
    ipaq_category_num:       ipaqCat.num,

    // Bloque 9 — FRAX (orientativo calculado en Supabase tras insertar)
    frax_alcohol_flag:   fraxAlcFlag,
    frax_risk_text:      'Pendiente_calculo_oficial',
    frax_risk_num:       0,
  }
}

// ── Función principal de envío ────────────────────────────────

export async function submitToSupabase({ studyData, menqolAnswers, ipaqAnswers, reproStage, timestamps }) {
  // 1. Construir payload compartido
  const shared = buildSharedPayload(studyData, menqolAnswers, ipaqAnswers, reproStage)
  const basics = studyData.basics || {}

  // 2. Obtener el siguiente project_code correlativo desde Supabase
  // La función generate_mdh_code() consume la secuencia y devuelve MDH-000001 etc.
  const { data: codeData, error: codeError } = await supabase.rpc('generate_mdh_code')
  if (codeError) throw new Error('Error generando código: ' + codeError.message)
  const projectCode = codeData

  // 3. Payload responses_raw (datos personales + timestamps + código)
  const rawPayload = {
    ...shared,
    project_code:  projectCode,
    nombre:        basics.nombre    || null,
    apellido:      basics.apellido  || null,
    email:         basics.email     || null,
    ts_info_sheet: timestamps.infoSheet || null,
    ts_consent:    timestamps.consent   || null,
    email_consent: timestamps.emailConsent ?? false,
  }

  // 4. Insertar en responses_raw (solo INSERT, no necesita SELECT)
  const { error: rawError } = await supabase
    .from('responses_raw')
    .insert(rawPayload)

  if (rawError) throw new Error('Error al guardar datos: ' + rawError.message)

  // 5. Insertar en responses_anonymous con el mismo project_code
  const { error: anonError } = await supabase
    .from('responses_anonymous')
    .insert({ ...shared, project_code: projectCode })

  if (anonError) {
    console.warn('Error al guardar datos anonimos:', anonError.message)
  }

  // 6. Calcular FRAX orientativo y actualizar ambas tablas
  try {
    const alcoUnitsNum = shared.alcohol_units_num
    const alcoFreqNum  = shared.alcohol_freq_num

    const { data: fraxResult } = await supabase.rpc('calcular_frax_orientativo', {
      p_age:        shared.age,
      p_prior_fx:   shared.fractures_num === 1,
      p_parent_hip: shared.parent_hip_fracture_num === 1,
      p_smoking:    shared.smoking_num === 3,
      p_corticoids: shared.corticoids_num === 1,
      p_arthritis:  shared.arthritis_num === 1,
      p_sec_osteo:  shared.secondary_osteoporosis_num === 1,
      p_alcohol:    fraxAlcohol(alcoUnitsNum, alcoFreqNum),
    })

    if (fraxResult) {
      const fraxUpdate = {
        frax_rf_count:       fraxResult.frax_rf_count,
        frax_rf_detail:      fraxResult.frax_rf_detail,
        frax_alcohol_flag:   fraxResult.frax_alcohol_flag,
        frax_ref_hip_low:    fraxResult.frax_ref_hip_low,
        frax_ref_hip_high:   fraxResult.frax_ref_hip_high,
        frax_ref_major_low:  fraxResult.frax_ref_major_low,
        frax_ref_major_high: fraxResult.frax_ref_major_high,
        frax_ref_risk_text:  fraxResult.frax_ref_risk_text,
        frax_ref_risk_num:   fraxResult.frax_ref_risk_num,
        frax_risk_text:      fraxResult.frax_risk_text,
        frax_risk_num:       fraxResult.frax_risk_num,
      }
      await supabase.from('responses_raw').update(fraxUpdate).eq('project_code', projectCode)
      await supabase.from('responses_anonymous').update(fraxUpdate).eq('project_code', projectCode)
    }
  } catch (fraxErr) {
    console.warn('FRAX orientativo no calculado:', fraxErr.message)
  }

  return projectCode
}
