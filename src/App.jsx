import { useState, useRef } from 'react'
import { DOMAINS } from './data.js'
// La conexión a Supabase se hace server-side en la Edge Function
// El frontend solo llama a la función — nunca escribe directamente en la BD
const EDGE_FUNCTION_URL = import.meta.env.VITE_SUPABASE_FUNCTION_URL
  ?? 'https://TU_PROJECT_ID.supabase.co/functions/v1/submit-response'
import {
  SECTION_BASICS, SECTION_DEMOGRAPHICS, SECTION_HABITS,
  SECTION_HEALTH, SECTION_GYNECOLOGY,
  isConditionMet, countVisibleQuestions
} from './studyData.js'
import { IPAQ_LONG, isIpaqConditionMet, getIpaqLongQuestions } from './ipaqData.js'
import { scoreIpaqLong, IPAQ_CATEGORIES, formatMET } from './ipaqScoring.js'
import { classifyReproductiveStage, calculateBMI } from './ReproductiveStage.js'
import { QuestionRenderer, HelpSheet } from './QuestionTypes.jsx'
import { SectionStepper, SectionHeader, TimeEstimate } from './SectionFlow.jsx'
import Dashboard from './Dashboard.jsx'
import AboutPage from './AboutPage.jsx'
import PrivacyPolicy from './PrivacyPolicy.jsx'
import './styles.css'

/* ─── Helpers ─── */
const getLevel = (pct) => {
  if (pct <= 20) return { label: "Impacto mínimo", color: "#22C55E", bg: "#F0FDF4" }
  if (pct <= 40) return { label: "Impacto leve", color: "#84CC16", bg: "#F7FEE7" }
  if (pct <= 60) return { label: "Impacto moderado", color: "#F59E0B", bg: "#FFFBEB" }
  if (pct <= 80) return { label: "Impacto alto", color: "#F97316", bg: "#FFF7ED" }
  return { label: "Impacto severo", color: "#EF4444", bg: "#FEF2F2" }
}

const REFERENCE = {
  "50-54": { vasomotor: 3.66, psychosocial: 2.81, physical: 3.01, sexual: 3.19, global: 3.04 },
  "55-59": { vasomotor: 3.06, psychosocial: 2.60, physical: 2.95, sexual: 3.27, global: 2.90 },
  "60-64": { vasomotor: 2.50, psychosocial: 2.39, physical: 2.88, sexual: 3.12, global: 2.76 },
  "65+":   { vasomotor: 2.01, psychosocial: 2.14, physical: 2.67, sexual: 2.95, global: 2.51 },
}

const getAgeGroup = (age) => {
  const a = parseInt(age)
  if (!a || a < 55) return "50-54"
  if (a < 60) return "55-59"
  if (a < 65) return "60-64"
  return "65+"
}

const menqolToPct = (v) => (v - 1) / 7 * 100

/* ─── Generate MDH-XXXXXX project code ─── */
const generateProjectCode = () => {
  const num = Math.floor(Math.random() * 1000000).toString().padStart(6, '0')
  return `MDH-${num}`
}

/* ─── Timestamp with full precision ─── */
const nowTimestamp = () => new Date().toISOString()

/* ─── Full study sections (only one version - full) ─── */
const FULL_SECTIONS = [
  { ...SECTION_BASICS, shortName: "Datos" },
  { ...SECTION_DEMOGRAPHICS, shortName: "Socio." },
  { ...SECTION_HABITS, shortName: "Hábitos" },
  { ...SECTION_HEALTH, shortName: "Salud" },
  { ...SECTION_GYNECOLOGY, shortName: "Gineco." },
  { id: "menqol", name: "MENQOL", shortName: "MENQOL", emoji: "🌸", description: "Cuestionario de calidad de vida en la menopausia (29 preguntas)", estimatedMinutes: 7 },
  { id: "ipaqLong", name: "Actividad física", shortName: "IPAQ", emoji: "🏃‍♀️", description: "Cuestionario IPAQ largo (actividad en los últimos 7 días)", estimatedMinutes: 5 },
  { id: "results", name: "Resultados", shortName: "Resultado", emoji: "📊", description: "Tu informe personalizado", estimatedMinutes: 0 },
]

/* ─── Dual Logo Header ─── */
function StudyHeader() {
  return (
    <div style={{ position: "sticky", top: 0, zIndex: 100 }}>
      {/* Banner rojo superior */}
      <div style={{
        background: "#dd2946",
        padding: "10px 20px 8px",
        textAlign: "center"
      }}>
        <p style={{
          fontSize: 18, fontWeight: 800, color: "white",
          letterSpacing: "0.05em", textTransform: "uppercase", lineHeight: 1.2
        }}>
          Mujeres de Hierro
        </p>
        <img
          src="https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/themes/2148370963/settings_images/5be8a16-d160-325c-ce5-2d88f8128c05_De_disen_o.png"
          alt="estrella"
          style={{ height: 18, objectFit: "contain", marginTop: 4, display: "block", margin: "4px auto 0" }}
        />
      </div>
      {/* Barra de logos */}
      <div style={{
        padding: "10px 20px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        borderBottom: "1px solid #F1F5F9",
        background: "white",
        boxShadow: "0 1px 8px rgba(0,0,0,0.05)"
      }}>
        <img
          src="https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/themes/2148370963/settings_images/2cadeb1-21fd-ae7-eb65-206a4b3856c_f458131-d2d-8f88-6ce4-c88226fad1_a8806550-fce2-46b2-8942-432d3bddd28d.png"
          alt="Cuerpos Serranos S.L."
          style={{ height: 32, objectFit: "contain", maxWidth: 130 }}
        />
        <img
          src="https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/themes/2148370963/settings_images/d5a31d5-7707-1a42-1642-dfda8f14c2da_Logo_Universidad_Polite_cnica_de_Madrid.svg.png"
          alt="Universidad Politécnica de Madrid"
          style={{ height: 32, objectFit: "contain", maxWidth: 130 }}
        />
      </div>
    </div>
  )
}

/* ─── Info Sheet Screen ─── */
function InfoSheetScreen({ onAccept }) {
  const [checked, setChecked] = useState(false)

  return (
    <div className="fade-in" style={{ padding: "0 0 80px" }}>
      <div style={{
        background: "white", margin: "16px 0", borderRadius: 16,
        border: "1.5px solid #F1F5F9", boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
        overflow: "hidden"
      }}>
        {/* Title block */}
        <div style={{ background: "linear-gradient(135deg, #1E293B 0%, #334155 100%)", padding: "24px 20px" }}>
          <p style={{ fontSize: 11, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>
            Hoja de información al participante
          </p>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "white", lineHeight: 1.4, marginBottom: 0 }}>
            Mujeres de hierro: prevalencia de sintomatología asociada a la menopausia a lo largo de la transición menopáusica en mujeres de 40 a 70 años residentes en España y su relación con la actividad física
          </h2>
        </div>

        <div style={{ padding: "20px 20px" }}>

          {/* Section 1 */}
          <InfoSection title="1. ¿Quién realiza este estudio?">
            <p>El presente estudio está dirigido científicamente por <strong>Cuerpos Serranos SL y la Universidad Politécnica de Madrid (UPM)</strong>, que actúan como corresponsables del diseño metodológico, la supervisión científica y el análisis de los resultados de la investigación.</p>
            <p style={{ marginTop: 12 }}>Los investigadores principales son:</p>
            <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }}>
              <ResearcherCard name="Dra. Maria de los Ángeles García" org="Cuerpos Serranos SL" email="info@cuerposserranos.com" />
              <ResearcherCard name="Dr. Javier Butragueño" org="Cuerpos Serranos SL" email="info@cuerposserranos.com" />
              <ResearcherCard name="Dra. Ana Belén Peinado" org="Universidad Politécnica de Madrid" email="anabelen.peinado@upm.es" />
            </div>
            <p style={{ marginTop: 12 }}>La Universidad Politécnica de Madrid y Cuerpos Serranos S.L. actúan como corresponsables del tratamiento de conformidad con lo dispuesto en el <strong>artículo 26 del Reglamento (UE) 2016/679 (RGPD)</strong>.</p>
          </InfoSection>

          <InfoSection title="2. ¿Cuál es el objetivo del estudio?">
            <p>El objetivo es analizar la prevalencia de sintomatología relacionada con la transición menopáusica (premenopausia, perimenopausia y posmenopausia) y estudiar su relación con los niveles de actividad física en mujeres residentes en España.</p>
            <p style={{ marginTop: 10 }}>Los resultados contribuirán a mejorar el conocimiento científico sobre la salud femenina en esta etapa vital y podrán orientar futuras estrategias de promoción de la salud basadas en evidencia.</p>
          </InfoSection>

          <InfoSection title="3. ¿Quién puede participar?">
            <p>Pueden participar mujeres:</p>
            <ul style={{ marginTop: 8, paddingLeft: 18, lineHeight: 1.8 }}>
              <li>Residentes en España</li>
              <li>Con edades entre 40 y 70 años, ambas incluidas</li>
              <li>En etapa de premenopausia, perimenopausia o postmenopausia</li>
            </ul>
            <p style={{ marginTop: 10 }}>La participación es completamente voluntaria.</p>
          </InfoSection>

          <InfoSection title="4. ¿En qué consiste la participación?">
            <p>Si decides participar, deberás completar un cuestionario online que incluye:</p>
            <ul style={{ marginTop: 8, paddingLeft: 18, lineHeight: 1.8 }}>
              <li>Datos sociodemográficos</li>
              <li>Información sobre historia menstrual y antecedentes de salud</li>
              <li>Cuestionario validado sobre actividad física (IPAQ versión larga)</li>
              <li>Cuestionario validado sobre sintomatología menopáusica (MENQOL)</li>
            </ul>
            <p style={{ marginTop: 10 }}>La duración estimada es de <strong>15 a 25 minutos</strong>.</p>
            <p style={{ marginTop: 10 }}>Al finalizar, recibirás un <strong>informe individualizado</strong> con información sobre tu nivel de sintomatología menopáusica y tu nivel de actividad física, basado en instrumentos científicos validados. Este informe es informativo y no sustituye la valoración médica profesional.</p>
          </InfoSection>

          <InfoSection title="5. ¿Existen riesgos?">
            <p>Este estudio no implica intervención clínica ni procedimientos invasivos, por lo que no existen riesgos físicos.</p>
            <p style={{ marginTop: 10 }}>Podrías experimentar una leve incomodidad al responder preguntas relacionadas con síntomas o antecedentes de salud. Puedes interrumpir el cuestionario o abandonar el estudio en cualquier momento sin necesidad de justificar tu decisión y sin que ello tenga consecuencias.</p>
          </InfoSection>

          <InfoSection title="6. ¿Existen beneficios?">
            <p>No existen beneficios clínicos directos. Sin embargo:</p>
            <ul style={{ marginTop: 8, paddingLeft: 18, lineHeight: 1.8 }}>
              <li>Recibirás información personalizada basada en instrumentos científicos validados.</li>
              <li>Contribuirás al avance del conocimiento científico en salud femenina.</li>
              <li>Ayudarás al diseño de futuras estrategias de promoción de la salud.</li>
            </ul>
            <p style={{ marginTop: 10 }}>El balance entre riesgos y beneficios se considera favorable.</p>
          </InfoSection>

          <InfoSection title="7. ¿Cómo se protegerán sus datos?">
            <p>El estudio cumple con:</p>
            <ul style={{ marginTop: 8, paddingLeft: 18, lineHeight: 1.8 }}>
              <li>Reglamento (UE) 2016/679 (RGPD)</li>
              <li>Ley Orgánica 3/2018 de Protección de Datos y garantía de los derechos digitales</li>
              <li>Ley 14/2007 de Investigación Biomédica</li>
            </ul>
            <p style={{ marginTop: 10 }}>Dado que se recogerán datos relativos a la salud (categoría especial de datos según el artículo 9 del RGPD), se aplican medidas reforzadas de seguridad.</p>
            <div style={{ background: "#F8FAFC", borderRadius: 10, padding: 14, marginTop: 12 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 8 }}>Medidas de protección implementadas:</p>
              <ul style={{ paddingLeft: 16, lineHeight: 1.8, fontSize: 13, color: "#64748B" }}>
                <li>La plataforma utiliza conexión cifrada segura (HTTPS/TLS).</li>
                <li>Los datos se almacenan en infraestructura gestionada mediante Supabase (SOC 2 Tipo II).</li>
                <li>Sus datos serán seudonimizados mediante un código alfanumérico.</li>
                <li>Los datos identificativos se almacenarán separadamente de los datos de salud.</li>
                <li>El acceso a la base de datos está restringido al equipo investigador principal.</li>
              </ul>
            </div>
          </InfoSection>

          <InfoSection title="8. ¿Durante cuánto tiempo se conservarán los datos?">
            <p>Los datos personales identificables se conservarán únicamente durante el tiempo necesario para la gestión del estudio y el análisis científico derivado del mismo. Una vez finalizado el proyecto, los datos podrán mantenerse de forma anonimizada con fines exclusivamente científicos y estadísticos, conforme a la normativa vigente.</p>
          </InfoSection>

          <InfoSection title="9. ¿Cuáles son sus derechos?">
            <p>Podrás ejercer en cualquier momento tus derechos de acceso, rectificación, supresión, limitación del tratamiento, oposición y portabilidad dirigiéndote a la investigadora principal del estudio o a cualquiera de las entidades corresponsables del tratamiento.</p>
            <p style={{ marginTop: 10 }}>También puedes presentar una reclamación ante la <strong>Agencia Española de Protección de Datos</strong> si consideras que tus derechos no han sido atendidos adecuadamente.</p>
          </InfoSection>

          <InfoSection title="10. Participación voluntaria">
            <p>Tu participación es completamente voluntaria. Puedes retirarte en cualquier momento sin consecuencias. La decisión de no participar no afectará a tu relación con Cuerpos Serranos S.L. ni con la Universidad Politécnica de Madrid.</p>
            <p style={{ marginTop: 10 }}>Si deseas participar, en la siguiente pantalla podrás otorgar tu consentimiento informado electrónico.</p>
          </InfoSection>

          {/* Checkbox */}
          <div
            onClick={() => setChecked(c => !c)}
            style={{
              marginTop: 24, padding: 16, borderRadius: 12, cursor: "pointer",
              border: checked ? "2px solid #1E293B" : "2px solid #E2E8F0",
              background: checked ? "#F8FAFC" : "white",
              display: "flex", alignItems: "flex-start", gap: 12,
              transition: "all 0.2s"
            }}
          >
            <div style={{
              width: 22, height: 22, borderRadius: 6, border: "2px solid #1E293B",
              background: checked ? "#1E293B" : "white",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, marginTop: 1, transition: "background 0.15s"
            }}>
              {checked && <span style={{ color: "white", fontSize: 14, fontWeight: 700 }}>✓</span>}
            </div>
            <p style={{ fontSize: 14, color: "#1E293B", lineHeight: 1.6, fontWeight: 500 }}>
              He leído la hoja de información al participante y estoy conforme con lo descrito en ella.
            </p>
          </div>

          <button
            onClick={() => { if (checked) onAccept(nowTimestamp()) }}
            disabled={!checked}
            style={{
              marginTop: 16, width: "100%", padding: 16,
              borderRadius: 14, border: "none",
              background: checked ? "#1E293B" : "#CBD5E1",
              color: "white", fontSize: 15, fontWeight: 700,
              cursor: checked ? "pointer" : "not-allowed",
              boxShadow: checked ? "0 4px 15px rgba(30,41,59,0.3)" : "none",
              transition: "all 0.2s"
            }}
          >
            Continuar al consentimiento informado →
          </button>
        </div>
      </div>
    </div>
  )
}

function InfoSection({ title, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1E293B", marginBottom: 8, paddingBottom: 6, borderBottom: "1.5px solid #F1F5F9" }}>
        {title}
      </h3>
      <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.7 }}>
        {children}
      </div>
    </div>
  )
}

function ResearcherCard({ name, org, email }) {
  return (
    <div style={{ background: "#F8FAFC", borderRadius: 10, padding: "10px 14px" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#1E293B" }}>{name}</p>
      <p style={{ fontSize: 12, color: "#64748B", marginTop: 2 }}>{org}</p>
      <p style={{ fontSize: 12, color: "#7C9CE8", marginTop: 2 }}>{email}</p>
    </div>
  )
}

/* ─── Consent Screen ─── */
function ConsentScreen({ onAccept }) {
  const [checked1, setChecked1] = useState(false)
  const [checked2, setChecked2] = useState(false)

  const canProceed = checked1

  return (
    <div className="fade-in" style={{ padding: "0 0 80px" }}>
      <div style={{
        background: "white", margin: "16px 0", borderRadius: 16,
        border: "1.5px solid #F1F5F9", boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
        overflow: "hidden"
      }}>
        <div style={{ background: "linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)", padding: "24px 20px" }}>
          <p style={{ fontSize: 11, color: "#DDD6FE", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>
            Consentimiento informado
          </p>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "white", lineHeight: 1.4 }}>
            Mujeres de hierro: Prevalencia de sintomatología asociada a la menopausia
          </h2>
        </div>

        <div style={{ padding: "20px 20px", fontSize: 14, color: "#475569", lineHeight: 1.7 }}>
          <p>He leído y comprendido la hoja de Información para las participantes. He tenido la oportunidad de conocer los objetivos del estudio, el procedimiento, los posibles riesgos y beneficios, así como el tratamiento que se realizará de mis datos personales y de salud.</p>

          <p style={{ fontWeight: 700, color: "#1E293B", marginTop: 16, marginBottom: 8 }}>Declaro que:</p>
          <ul style={{ paddingLeft: 18, lineHeight: 1.9 }}>
            <li>He comprendido que mi participación es voluntaria y que puedo retirarme en cualquier momento sin necesidad de justificar mi decisión y sin que ello tenga consecuencias negativas para mí.</li>
            <li>Comprendo que el estudio es de carácter observacional y que no implica intervención clínica ni sustituye el asesoramiento médico profesional.</li>
            <li>Sé que completaré cuestionarios validados sobre sintomatología menopáusica y nivel de actividad física, además de preguntas sociodemográficas y relacionadas con mi salud. Podré omitir cualquier pregunta que no desee responder.</li>
            <li>He sido informada de que recibiré un informe individualizado con información sobre mis resultados, basado en instrumentos científicos validados. El informe tendrá carácter meramente informativo y no constituye diagnóstico médico.</li>
            <li>Comprendo que se recogerán datos relativos a mi salud, considerados categoría especial de datos conforme al artículo 9 del RGPD.</li>
          </ul>

          <p style={{ fontWeight: 700, color: "#1E293B", marginTop: 16, marginBottom: 8 }}>He sido informada de que:</p>
          <ul style={{ paddingLeft: 18, lineHeight: 1.9 }}>
            <li>Cuerpos Serranos S.L. y la Universidad Politécnica de Madrid (UPM) actúan como corresponsables del tratamiento de los datos personales, de conformidad con el artículo 26 del RGPD.</li>
            <li>Los investigadores principales son la Dra. María de los Ángeles García y el Dr. Javier Butragueño (Cuerpos Serranos SL, <a href="mailto:info@cuerposserranos.com" style={{ color: "#7C9CE8" }}>info@cuerposserranos.com</a>) y la Dra. Ana Belén Peinado (UPM, <a href="mailto:anabelen.peinado@upm.es" style={{ color: "#7C9CE8" }}>anabelen.peinado@upm.es</a>).</li>
            <li>La plataforma tecnológica está alojada en infraestructura gestionada mediante Supabase, auditada bajo el estándar SOC 2 Tipo II.</li>
            <li>Mis datos serán seudonimizados mediante un código alfanumérico y tratados con medidas técnicas y organizativas adecuadas.</li>
            <li>Los datos identificativos se almacenarán de forma separada de los datos de salud.</li>
            <li>Los resultados se analizarán exclusivamente de forma agregada y anonimizada, sin posibilidad de identificación individual.</li>
          </ul>

          <p style={{ marginTop: 14 }}>Comprendo que puedo ejercer mis derechos de acceso, rectificación, supresión, limitación del tratamiento, oposición y portabilidad, dirigiéndome a cualquiera de los investigadores principales.</p>
          <p style={{ marginTop: 10 }}>Asimismo, tengo derecho a presentar una reclamación ante la <strong>Agencia Española de Protección de Datos (AEPD)</strong> si considero que el tratamiento de mis datos personales no se ajusta a la normativa vigente.</p>
          <p style={{ marginTop: 10 }}>La retirada del consentimiento no afectará a la licitud del tratamiento basado en el consentimiento previo a su retirada.</p>
          <p style={{ marginTop: 10 }}>Este estudio ha sido evaluado por el Comité de Ética de Investigación de la Universidad Politécnica de Madrid (<a href="mailto:secretaria.adjunto.vinvestigacion@upm.es" style={{ color: "#7C9CE8" }}>secretaria.adjunto.vinvestigacion@upm.es</a>).</p>

          {/* Checkbox 1 - required */}
          <div
            onClick={() => setChecked1(c => !c)}
            style={{
              marginTop: 24, padding: 16, borderRadius: 12, cursor: "pointer",
              border: checked1 ? "2px solid #7C3AED" : "2px solid #E2E8F0",
              background: checked1 ? "#FAF5FF" : "white",
              display: "flex", alignItems: "flex-start", gap: 12,
              transition: "all 0.2s"
            }}
          >
            <div style={{
              width: 22, height: 22, borderRadius: 6, border: "2px solid #7C3AED",
              background: checked1 ? "#7C3AED" : "white",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, marginTop: 1, transition: "background 0.15s"
            }}>
              {checked1 && <span style={{ color: "white", fontSize: 14, fontWeight: 700 }}>✓</span>}
            </div>
            <p style={{ fontSize: 14, color: "#1E293B", lineHeight: 1.6, fontWeight: 500 }}>
              <strong>Declaro que he leído y comprendido la información anterior y que consiento libre y voluntariamente participar en el estudio, así como el tratamiento de mis datos personales y datos de salud con fines exclusivamente científicos en el marco del presente proyecto.</strong>
            </p>
          </div>

          {/* Checkbox 2 - optional */}
          <div
            onClick={() => setChecked2(c => !c)}
            style={{
              marginTop: 12, padding: 16, borderRadius: 12, cursor: "pointer",
              border: checked2 ? "2px solid #7C3AED" : "2px solid #E2E8F0",
              background: checked2 ? "#FAF5FF" : "white",
              display: "flex", alignItems: "flex-start", gap: 12,
              transition: "all 0.2s"
            }}
          >
            <div style={{
              width: 22, height: 22, borderRadius: 6, border: "2px solid #7C3AED",
              background: checked2 ? "#7C3AED" : "white",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, marginTop: 1, transition: "background 0.15s"
            }}>
              {checked2 && <span style={{ color: "white", fontSize: 14, fontWeight: 700 }}>✓</span>}
            </div>
            <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.6 }}>
              Acepto que se utilice mi correo electrónico para comunicaciones relacionadas con este estudio. <span style={{ color: "#94A3B8" }}>(Opcional)</span>
            </p>
          </div>

          <button
            onClick={() => { if (canProceed) onAccept(nowTimestamp(), checked2) }}
            disabled={!canProceed}
            style={{
              marginTop: 16, width: "100%", padding: 16,
              borderRadius: 14, border: "none",
              background: canProceed ? "#7C3AED" : "#CBD5E1",
              color: "white", fontSize: 15, fontWeight: 700,
              cursor: canProceed ? "pointer" : "not-allowed",
              boxShadow: canProceed ? "0 4px 15px rgba(124,58,237,0.35)" : "none",
              transition: "all 0.2s"
            }}
          >
            Acepto y quiero participar →
          </button>
          {!canProceed && (
            <p style={{ textAlign: "center", fontSize: 12, color: "#94A3B8", marginTop: 8 }}>
              Debes marcar el primer checkbox para continuar
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─── Info Bottom Sheet for MENQOL items ─── */
function InfoSheet({ item, onClose }) {
  return (
    <div
      style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 999,
        display: "flex", alignItems: "flex-end", justifyContent: "center",
        background: "rgba(0,0,0,0.3)", backdropFilter: "blur(2px)"
      }}
      onClick={onClose}
    >
      <div
        className="slide-up"
        onClick={e => e.stopPropagation()}
        style={{
          background: "white", borderRadius: "20px 20px 0 0",
          padding: "24px 20px 32px", width: "100%", maxWidth: 480,
          boxShadow: "0 -4px 30px rgba(0,0,0,0.12)"
        }}
      >
        <div style={{ width: 36, height: 4, borderRadius: 2, background: "#E2E8F0", margin: "0 auto 16px" }} />
        <h4 style={{ fontSize: 17, fontWeight: 600, color: "#1E293B", marginBottom: 8 }}>{item.label}</h4>
        <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.6, marginBottom: 16 }}>{item.help}</p>
        <div style={{ background: "#F8FAFC", borderRadius: 12, padding: 16 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 10 }}>Guía de puntuación:</p>
          {[
            { range: "0–2", color: "#22C55E", text: item.scale.low },
            { range: "3–4", color: "#F59E0B", text: item.scale.mid },
            { range: "5–6", color: "#EF4444", text: item.scale.high },
          ].map(s => (
            <div key={s.range} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: s.color, minWidth: 32 }}>{s.range}</span>
              <span style={{ fontSize: 13, color: "#64748B", lineHeight: 1.5 }}>{s.text}</span>
            </div>
          ))}
        </div>
        <button onClick={onClose} style={{
          marginTop: 16, width: "100%", padding: 12, background: "#1E293B",
          color: "white", border: "none", borderRadius: 12, fontSize: 15,
          fontWeight: 600, cursor: "pointer"
        }}>Entendido</button>
      </div>
    </div>
  )
}

/* ─── Scale Selector (MENQOL 0-6) ─── */
function ScaleSelector({ value, onChange, color }) {
  return (
    <div style={{ marginTop: 10 }} className="fade-in">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 5 }}>
        {[0,1,2,3,4,5,6].map(n => {
          const sel = value === n
          return (
            <button key={n} onClick={() => onChange(n)} style={{
              width: "100%", aspectRatio: "1", borderRadius: 10,
              border: sel ? "none" : "1.5px solid #E2E8F0",
              background: sel ? color : "#F8FAFC",
              color: sel ? "white" : "#64748B",
              fontSize: 15, fontWeight: sel ? 700 : 500,
              cursor: "pointer", transition: "all 0.15s",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: sel ? `0 2px 8px ${color}40` : "none"
            }}>{n}</button>
          )
        })}
      </div>
      <div style={{
        display: "flex", justifyContent: "space-between",
        fontSize: 11, color: "#94A3B8", marginTop: 4
      }}>
        <span>No me molesta</span>
        <span>Muchísimo</span>
      </div>
    </div>
  )
}

/* ─── Single MENQOL Question Item ─── */
function MenqolQuestionItem({ item, domain, answer, onAnswer, openTooltip, setOpenTooltip }) {
  const isYes = answer?.present === true
  const needsRating = isYes && answer?.rating == null

  return (
    <div style={{
      background: "white", borderRadius: 14, padding: "14px 16px",
      border: needsRating ? `2px solid ${domain.color}` : "1.5px solid #F1F5F9",
      boxShadow: needsRating ? `0 0 0 3px ${domain.color}18` : "0 1px 3px rgba(0,0,0,0.04)",
      transition: "all 0.2s"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: "#1E293B", flex: 1, lineHeight: 1.4 }}>
          {item.label}
        </span>
        <button
          onClick={() => setOpenTooltip(openTooltip === item.id ? null : item.id)}
          aria-label="Más información"
          style={{
            width: 28, height: 28, borderRadius: "50%",
            border: "1.5px solid #CBD5E1",
            background: openTooltip === item.id ? "#F1F5F9" : "white",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", fontSize: 14, color: "#64748B", flexShrink: 0
          }}
        >?</button>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        {[false, true].map(val => {
          const active = answer?.present === val
          return (
            <button key={String(val)} onClick={() => onAnswer(item.id, {
              present: val,
              rating: val ? (answer?.rating ?? null) : null
            })} style={{
              flex: 1, padding: "10px 0", borderRadius: 10,
              border: active ? `2px solid ${domain.color}` : "1.5px solid #E2E8F0",
              background: active ? domain.colorLight : "white",
              color: active ? domain.color : "#64748B",
              fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "all 0.15s"
            }}>{val ? "Sí" : "No"}</button>
          )
        })}
      </div>

      {isYes && <ScaleSelector value={answer?.rating ?? null} onChange={r => onAnswer(item.id, { present: true, rating: r })} color={domain.color} />}
      {needsRating && (
        <p style={{ fontSize: 12, color: domain.color, marginTop: 8, fontWeight: 500 }}>
          ↑ Indica cuánto te molesta este síntoma (0 = nada, 6 = muchísimo)
        </p>
      )}
    </div>
  )
}

/* ─── Radar Chart ─── */
function RadarChart({ domainResults, refPcts, ageGroup }) {
  const n = domainResults.length
  const angleStep = (2 * Math.PI) / n
  const cx = 120, cy = 120, r = 90

  const point = (i, pct) => {
    const angle = -Math.PI / 2 + i * angleStep
    const radius = (pct / 100) * r
    return [cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)]
  }

  const makePath = (pts) => pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ") + " Z"

  const dataPoints = domainResults.map((d, i) => point(i, d.pct))
  const refPoints = refPcts ? refPcts.map((p, i) => point(i, p)) : null

  const labelPos = domainResults.map((_, i) => {
    const angle = -Math.PI / 2 + i * angleStep
    return [cx + (r + 22) * Math.cos(angle), cy + (r + 22) * Math.sin(angle)]
  })

  return (
    <svg viewBox="0 0 240 240" style={{ width: "100%", maxWidth: 240 }}>
      {[25, 50, 75, 100].map(level => {
        const pts = Array.from({ length: n }, (_, i) => point(i, level))
        return <path key={level} d={makePath(pts)} fill="none" stroke="#E2E8F0" strokeWidth={0.8} />
      })}
      {Array.from({ length: n }, (_, i) => {
        const [ex, ey] = point(i, 100)
        return <line key={i} x1={cx} y1={cy} x2={ex} y2={ey} stroke="#E2E8F0" strokeWidth={0.8} />
      })}
      {refPoints && (
        <path d={makePath(refPoints)} fill="#94A3B820" stroke="#94A3B8" strokeWidth={1.5} strokeDasharray="4,2" />
      )}
      <path d={makePath(dataPoints)} fill="#E8927C40" stroke="#E8927C" strokeWidth={2} />
      {domainResults.map((d, i) => {
        const [lx, ly] = labelPos[i]
        return (
          <text key={i} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle"
            fontSize={8} fontWeight={600} fill={d.color}>{d.shortName}</text>
        )
      })}
    </svg>
  )
}

/* ─── Results View ─── */
function ResultsView({ menqolAnswers, studyData, age, weight, onReset, onOpenPrivacy, timestamps, projectCode }) {
  const [saveStatus, setSaveStatus] = useState(null)

  const domainResults = DOMAINS.map(domain => {
    const items = domain.items
    const answered = items.filter(item => menqolAnswers[item.id]?.present !== undefined)
    if (answered.length === 0) return { ...domain, mean: null, pct: 0, scoreSum: 0, scoreCount: 0 }
    const presentItems = answered.filter(item => menqolAnswers[item.id]?.present === true)
    const sum = presentItems.reduce((s, item) => {
      const r = menqolAnswers[item.id]?.rating
      return s + (r != null ? (r + 2) : 2) // shift 0-6 → 2-8 (MENQOL scale)
    }, 0)
    const notPresentCount = answered.length - presentItems.length
    const totalScore = sum + notPresentCount * 1 // items not present score 1
    const mean = totalScore / answered.length
    const pct = Math.round(menqolToPct(mean))
    return { ...domain, mean, pct, scoreSum: totalScore, scoreCount: answered.length }
  })

  const overallSum = domainResults.reduce((s, d) => s + d.scoreSum, 0)
  const overallCount = domainResults.reduce((s, d) => s + d.scoreCount, 0)
  const overallMean = overallCount > 0 ? overallSum / overallCount : 1
  const overallPct = Math.round(menqolToPct(overallMean))
  const overall = getLevel(overallPct)

  const ageGroup = getAgeGroup(age)
  const ref = REFERENCE[ageGroup]
  const domainKeys = ["vasomotor", "psychosocial", "physical", "sexual"]
  const refPcts = domainKeys.map(k => menqolToPct(ref[k]))

  const height = studyData.basics?.height
  const bmi = calculateBMI(weight ? parseFloat(weight) : null, height ? parseFloat(height) : null)

  const gynData = studyData.gynecology || {}
  const reproStage = classifyReproductiveStage(gynData)

  const handleSave = async () => {
    setSaveStatus("saving")
    try {
      // Build domain scores
      const scores = {
        vasomotor:    domainResults[0]?.mean ?? null,
        psychosocial: domainResults[1]?.mean ?? null,
        physical:     domainResults[2]?.mean ?? null,
        sexual:       domainResults[3]?.mean ?? null,
      }

      // El frontend llama a la Edge Function en los servidores de Supabase.
      // Allí es donde se usa la service_role key — nunca llega al navegador.
      const response = await fetch(EDGE_FUNCTION_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectCode,
          timestamps,
          studyData,
          menqolAnswers,
          scores,
          overallMean,
        }),
      })

      if (!response.ok) {
        const err = await response.json().catch(() => ({}))
        throw new Error(err.error || `HTTP ${response.status}`)
      }

      setSaveStatus("saved")
    } catch (e) {
      console.error("Save error:", e)
      setSaveStatus("error")
    }
  }

  return (
    <div className="fade-in">
      {/* Project code badge */}
      <div style={{
        background: "white", borderRadius: 12, padding: "10px 16px",
        border: "1.5px solid #F1F5F9", marginBottom: 16,
        display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <span style={{ fontSize: 12, color: "#94A3B8" }}>Código de participante</span>
        <span style={{ fontSize: 14, fontWeight: 800, color: "#1E293B", letterSpacing: "0.05em" }}>{projectCode}</span>
      </div>

      {/* Overall score */}
      <div style={{
        background: overall.bg, borderRadius: 20, padding: 24,
        border: `2px solid ${overall.color}30`, marginBottom: 16, textAlign: "center"
      }}>
        <p style={{ fontSize: 13, color: overall.color, fontWeight: 600, marginBottom: 4 }}>Resultado global MENQOL</p>
        <p style={{ fontSize: 48, fontWeight: 800, color: overall.color }}>{overallPct}<span style={{ fontSize: 22 }}>%</span></p>
        <p style={{ fontSize: 16, fontWeight: 700, color: overall.color }}>{overall.label}</p>
        <p style={{ fontSize: 12, color: "#64748B", marginTop: 8 }}>Basado en el cuestionario validado MENQOL (29 síntomas)</p>
      </div>

      {/* Domain breakdown */}
      <div style={{ background: "white", borderRadius: 16, padding: 20, border: "1.5px solid #F1F5F9", marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
          <RadarChart domainResults={domainResults} refPcts={refPcts} ageGroup={ageGroup} />
        </div>
        {domainResults.map(d => {
          const lv = getLevel(d.pct)
          return (
            <div key={d.id} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#1E293B" }}>{d.emoji} {d.name}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: lv.color }}>{d.pct}% — {lv.label}</span>
              </div>
              <div style={{ height: 8, borderRadius: 4, background: "#F1F5F9", overflow: "hidden" }}>
                <div className="bar-grow" style={{ height: "100%", borderRadius: 4, background: lv.color, width: `${d.pct}%` }} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Save button */}
      {saveStatus !== "saved" && (
        <button
          onClick={handleSave}
          disabled={saveStatus === "saving"}
          style={{
            width: "100%", padding: 16, borderRadius: 14,
            background: saveStatus === "saving" ? "#94A3B8" : "#1E293B",
            color: "white", border: "none", fontSize: 15, fontWeight: 700,
            cursor: saveStatus === "saving" ? "not-allowed" : "pointer",
            boxShadow: "0 4px 15px rgba(30,41,59,0.3)", marginBottom: 12
          }}
        >
          {saveStatus === "saving" ? "Guardando..." : saveStatus === "error" ? "Error — Intentar de nuevo" : "Guardar y enviar mis respuestas"}
        </button>
      )}
      {saveStatus === "saved" && (
        <div style={{
          background: "#F0FDF4", borderRadius: 14, padding: 16, marginBottom: 12,
          border: "2px solid #22C55E40", textAlign: "center"
        }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: "#16A34A" }}>✓ Respuestas guardadas</p>
          <p style={{ fontSize: 13, color: "#64748B", marginTop: 4 }}>Código: <strong>{projectCode}</strong></p>
        </div>
      )}

      <button onClick={onReset} style={{
        width: "100%", padding: 14, borderRadius: 14,
        background: "white", color: "#94A3B8", border: "1.5px solid #E2E8F0",
        fontSize: 14, fontWeight: 600, cursor: "pointer"
      }}>Volver al inicio</button>
    </div>
  )
}

/* ─── Generic Section View ─── */
function GenericSectionView({ section, answers, onAnswer, openHelp, setOpenHelp }) {
  const visibleQuestions = section.questions.filter(q => isConditionMet(q, answers))
  return (
    <>
      <SectionHeader section={section} questionCount={visibleQuestions.length} />
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 16 }}>
        {visibleQuestions.map(q => (
          <QuestionRenderer
            key={q.id}
            question={q}
            value={answers[q.id]}
            onChange={(val) => onAnswer(q.id, val)}
            openHelp={openHelp}
            setOpenHelp={setOpenHelp}
          />
        ))}
      </div>
    </>
  )
}

/* ─── IPAQ Section View ─── */
function IpaqSectionView({ ipaqDef, answers, onAnswer, openHelp, setOpenHelp }) {
  const allQuestions = ipaqDef.parts ? ipaqDef.parts.flatMap(p => p.questions) : ipaqDef.questions
  const visibleQuestions = allQuestions.filter(q => isIpaqConditionMet(q, answers))
  return (
    <>
      <SectionHeader section={ipaqDef} questionCount={visibleQuestions.length} />
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 16 }}>
        {ipaqDef.parts ? ipaqDef.parts.map(part => {
          const partVisible = part.questions.filter(q => isIpaqConditionMet(q, answers))
          if (partVisible.length === 0) return null
          return (
            <div key={part.id}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#64748B", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {part.name}
              </p>
              {partVisible.map(q => (
                <QuestionRenderer
                  key={q.id}
                  question={q}
                  value={answers[q.id]}
                  onChange={(val) => onAnswer(q.id, val)}
                  openHelp={openHelp}
                  setOpenHelp={setOpenHelp}
                />
              ))}
            </div>
          )
        }) : visibleQuestions.map(q => (
          <QuestionRenderer
            key={q.id}
            question={q}
            value={answers[q.id]}
            onChange={(val) => onAnswer(q.id, val)}
            openHelp={openHelp}
            setOpenHelp={setOpenHelp}
          />
        ))}
      </div>
    </>
  )
}

/* ─── MENQOL Section View ─── */
function MenqolSectionView({ currentDomain, setCurrentDomain, answers, onAnswer, openTooltip, setOpenTooltip, scrollTop, onComplete }) {
  const domain = DOMAINS[currentDomain]
  const isDomainComplete = () => {
    return domain.items.every(item => {
      const a = answers[item.id]
      if (!a) return false
      if (a.present === false) return true
      return a.present === true && a.rating != null
    })
  }

  const totalAnswered = Object.values(answers).filter(a =>
    a?.present !== undefined && (a.present === false || a.rating != null)
  ).length
  const totalItems = DOMAINS.reduce((s, d) => s + d.items.length, 0)

  return (
    <>
      <div style={{
        background: "white", borderRadius: 16, padding: 16,
        border: "1.5px solid #F1F5F9", marginBottom: 12
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#64748B" }}>MENQOL {totalAnswered}/{totalItems}</p>
          <p style={{ fontSize: 12, color: "#94A3B8" }}>Último mes</p>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {DOMAINS.map((d, i) => {
            const complete = d.items.every(item => {
              const a = answers[item.id]
              return a && (a.present === false || (a.present === true && a.rating != null))
            })
            return (
              <div key={d.id} onClick={() => setCurrentDomain(i)} style={{
                flex: 1, height: 6, borderRadius: 3,
                background: complete ? d.color : i === currentDomain ? `${d.color}60` : "#E2E8F0",
                cursor: "pointer", transition: "background 0.2s"
              }} />
            )
          })}
        </div>
      </div>

      <div style={{
        background: domain.colorLight, borderRadius: 14, padding: "14px 16px", marginBottom: 12,
        border: `1.5px solid ${domain.color}30`
      }}>
        <p style={{ fontSize: 13, color: domain.color, fontWeight: 700 }}>{domain.emoji} {domain.name}</p>
        <p style={{ fontSize: 12, color: "#64748B", marginTop: 4, lineHeight: 1.5 }}>
          Para cada síntoma: indica si lo has tenido este último mes. Si es así, valora del 0 (no me molesta nada) al 6 (me molesta muchísimo).
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {domain.items.map(item => (
          <MenqolQuestionItem
            key={item.id}
            item={item}
            domain={domain}
            answer={answers[item.id]}
            onAnswer={onAnswer}
            openTooltip={openTooltip}
            setOpenTooltip={setOpenTooltip}
          />
        ))}
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
        {currentDomain > 0 && (
          <button onClick={() => { setCurrentDomain(p => p - 1); scrollTop() }} style={{
            flex: 1, padding: 14, borderRadius: 14,
            background: "white", color: "#64748B", border: "1.5px solid #E2E8F0",
            fontSize: 15, fontWeight: 600, cursor: "pointer"
          }}>← Anterior</button>
        )}
        <button
          onClick={() => {
            if (currentDomain < DOMAINS.length - 1) { setCurrentDomain(p => p + 1); scrollTop() }
            else if (isDomainComplete()) onComplete()
          }}
          disabled={!isDomainComplete()}
          style={{
            flex: 2, padding: 14, borderRadius: 14,
            background: isDomainComplete() ? domain.color : "#CBD5E1",
            color: "white", border: "none", fontSize: 15, fontWeight: 700,
            cursor: isDomainComplete() ? "pointer" : "not-allowed",
            transition: "all 0.2s"
          }}
        >
          {currentDomain < DOMAINS.length - 1 ? "Siguiente dominio →" : "Finalizar MENQOL →"}
        </button>
      </div>
    </>
  )
}

/* ─── Main App ─── */
export default function App() {
  // step: intro | infoSheet | consent | sections | results | dashboard | privacy | about
  const [step, setStep] = useState("intro")
  const [currentSection, setCurrentSection] = useState(0)
  const [menqolAnswers, setMenqolAnswers] = useState({})
  const [currentDomain, setCurrentDomain] = useState(0)
  const [studyData, setStudyData] = useState({})
  const [openTooltip, setOpenTooltip] = useState(null)
  const [openHelp, setOpenHelp] = useState(null)
  const [projectCode] = useState(() => generateProjectCode())
  const [timestamps, setTimestamps] = useState({ infoSheet: null, consent: null })
  const topRef = useRef(null)

  const sections = FULL_SECTIONS
  const section = sections[currentSection]

  const age = studyData.basics?.age ?? ""
  const weight = studyData.basics?.weight ?? ""

  const scrollTop = () => topRef.current?.scrollIntoView({ behavior: "smooth" })

  const reset = () => {
    setStep("intro"); setCurrentSection(0)
    setMenqolAnswers({}); setStudyData({}); setCurrentDomain(0)
    setOpenTooltip(null); setOpenHelp(null)
    scrollTop()
  }

  const getSectionAnswers = (sectionId) => studyData[sectionId] || {}
  const setSectionAnswer = (sectionId, key, value) => {
    setStudyData(prev => ({
      ...prev,
      [sectionId]: { ...prev[sectionId], [key]: value }
    }))
  }

  const canProceed = () => {
    if (!section) return false
    const sid = section.id

    if (sid === "menqol") {
      return DOMAINS.every(d => d.items.every(item => {
        const a = menqolAnswers[item.id]
        if (!a) return false
        if (a.present === false) return true
        return a.present === true && a.rating != null
      }))
    }

    if (sid === "ipaqLong") {
      const allQ = IPAQ_LONG.parts ? IPAQ_LONG.parts.flatMap(p => p.questions) : IPAQ_LONG.questions
      const ans = getSectionAnswers(sid)
      return allQ.filter(q => !q.condition).every(q => ans[q.id] != null)
    }

    if (sid === "results") return true

    const ans = getSectionAnswers(sid)
    const visibleQ = section.questions.filter(q => isConditionMet(q, ans))
    const requiredQ = visibleQ.filter(q => q.required)
    if (requiredQ.length > 0) {
      return requiredQ.every(q => ans[q.id] != null && ans[q.id] !== "")
    }
    return visibleQ.some(q => ans[q.id] != null)
  }

  const goNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(p => p + 1)
      scrollTop()
    }
  }

  const goPrev = () => {
    if (currentSection > 0) {
      setCurrentSection(p => p - 1)
      scrollTop()
    }
  }

  const helpItem = openHelp
    ? (() => {
        for (const sec of sections) {
          if (sec.questions) {
            const q = sec.questions.find(q => q.id === openHelp)
            if (q) return q
          }
        }
        const allQ = IPAQ_LONG.parts ? IPAQ_LONG.parts.flatMap(p => p.questions) : IPAQ_LONG.questions
        return allQ.find(q => q.id === openHelp) || null
      })()
    : null

  const tooltipItem = openTooltip
    ? DOMAINS.flatMap(d => d.items).find(i => i.id === openTooltip)
    : null

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, #FAFBFE 0%, #F1F0FB 100%)" }}>

      {/* Sticky header with logos */}
      <StudyHeader />

      <div ref={topRef} style={{ maxWidth: 480, margin: "0 auto", padding: "0 16px 100px" }}>

        {/* ── INTRO ── */}
        {step === "intro" && (
          <div className="fade-in" style={{ paddingTop: 24 }}>
            <div style={{
              background: "white", borderRadius: 20, padding: 24,
              border: "1.5px solid #F1F5F9", marginBottom: 16,
              boxShadow: "0 4px 20px rgba(0,0,0,0.04)"
            }}>
              <div style={{ fontSize: 48, textAlign: "center", marginBottom: 16 }}>🌸</div>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1E293B", textAlign: "center", marginBottom: 12, lineHeight: 1.3 }}>
                Mujeres de hierro
              </h2>
              <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.7, textAlign: "center", marginBottom: 20 }}>
                Estudio de investigación de <strong>Cuerpos Serranos</strong> junto a la <strong>Universidad Politécnica de Madrid (UPM)</strong>. Evalúa tu calidad de vida, actividad física y factores de salud asociados a la menopausia.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
                {[
                  { emoji: "🌸", label: "MENQOL", sub: "29 síntomas", bg: "#FFF1F2", color: "#E8927C" },
                  { emoji: "🏃‍♀️", label: "Actividad física", sub: "IPAQ largo", bg: "#F0FDF4", color: "#22C55E" },
                  { emoji: "🩺", label: "Salud y hábitos", sub: "Antecedentes", bg: "#EEF2FF", color: "#7C9CE8" },
                  { emoji: "👩‍⚕️", label: "Ginecología", sub: "Etapa reproductiva", bg: "#FDF4FF", color: "#9C7CE8" },
                ].map(d => (
                  <div key={d.label} style={{
                    background: d.bg, borderRadius: 12, padding: "12px 10px", textAlign: "center"
                  }}>
                    <span style={{ fontSize: 22 }}>{d.emoji}</span>
                    <p style={{ fontSize: 12, fontWeight: 600, color: d.color, marginTop: 4, lineHeight: 1.3 }}>{d.label}</p>
                    <p style={{ fontSize: 11, color: "#94A3B8", marginTop: 2 }}>{d.sub}</p>
                  </div>
                ))}
              </div>
              <div style={{ background: "#F8FAFC", borderRadius: 12, padding: 14 }}>
                <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.6 }}>
                  🌸 <strong>MENQOL</strong>: 29 preguntas sobre síntomas del último mes<br />
                  🏃‍♀️ <strong>IPAQ</strong>: actividad física de los últimos 7 días<br />
                  🩺 <strong>Salud</strong>: demografía, hábitos, antecedentes clínicos<br />
                  🔒 Datos <strong>anónimos</strong> y protegidos (RGPD)<br />
                  ⏱️ Duración estimada: <strong>20-25 minutos</strong>
                </p>
              </div>
            </div>

            <button onClick={() => setStep("infoSheet")} style={{
              width: "100%", padding: 16, borderRadius: 14,
              background: "#1E293B", color: "white", border: "none",
              fontSize: 16, fontWeight: 700, cursor: "pointer",
              boxShadow: "0 4px 15px rgba(30,41,59,0.3)"
            }}>Leer información del estudio →</button>

            <button onClick={() => setStep("dashboard")} style={{
              width: "100%", padding: 14, borderRadius: 14, marginTop: 10,
              background: "white", color: "#94A3B8", border: "1.5px solid #E2E8F0",
              fontSize: 13, fontWeight: 600, cursor: "pointer"
            }}>Dashboard investigación</button>

            <button onClick={() => setStep("privacy")} style={{
              width: "100%", padding: 8, marginTop: 8,
              background: "none", color: "#94A3B8", border: "none",
              fontSize: 12, fontWeight: 500, cursor: "pointer",
              textDecoration: "underline", textUnderlineOffset: 3
            }}>Política de privacidad</button>
          </div>
        )}

        {/* ── INFO SHEET ── */}
        {step === "infoSheet" && (
          <InfoSheetScreen onAccept={(ts) => {
            setTimestamps(prev => ({ ...prev, infoSheet: ts }))
            setStep("consent")
            scrollTop()
          }} />
        )}

        {/* ── CONSENT ── */}
        {step === "consent" && (
          <ConsentScreen onAccept={(ts, emailConsent) => {
            setTimestamps(prev => ({ ...prev, consent: ts, emailConsent }))
            setStep("sections")
            setCurrentSection(0)
            scrollTop()
          }} />
        )}

        {/* ── SECTIONS ── */}
        {step === "sections" && section && (
          <>
            <SectionStepper sections={sections} currentIndex={currentSection} />

            <div className="no-print" style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
              <TimeEstimate sections={sections} currentIndex={currentSection} />
            </div>

            {section.id === "menqol" ? (
              <MenqolSectionView
                currentDomain={currentDomain}
                setCurrentDomain={setCurrentDomain}
                answers={menqolAnswers}
                onAnswer={(id, val) => setMenqolAnswers(prev => ({ ...prev, [id]: val }))}
                openTooltip={openTooltip}
                setOpenTooltip={setOpenTooltip}
                scrollTop={scrollTop}
                onComplete={goNext}
              />
            ) : section.id === "ipaqLong" ? (
              <IpaqSectionView
                ipaqDef={IPAQ_LONG}
                answers={getSectionAnswers(section.id)}
                onAnswer={(key, val) => setSectionAnswer(section.id, key, val)}
                openHelp={openHelp}
                setOpenHelp={setOpenHelp}
              />
            ) : section.id === "results" ? (
              <ResultsView
                menqolAnswers={menqolAnswers}
                studyData={studyData}
                age={age}
                weight={weight}
                onReset={reset}
                onOpenPrivacy={() => setStep("privacy")}
                timestamps={timestamps}
                projectCode={projectCode}
              />
            ) : (
              <GenericSectionView
                section={section}
                answers={getSectionAnswers(section.id)}
                onAnswer={(key, val) => setSectionAnswer(section.id, key, val)}
                openHelp={openHelp}
                setOpenHelp={setOpenHelp}
              />
            )}

            {section.id !== "results" && section.id !== "menqol" && (
              <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                {currentSection > 0 && (
                  <button onClick={goPrev} style={{
                    flex: 1, padding: 14, borderRadius: 14,
                    background: "white", color: "#64748B", border: "1.5px solid #E2E8F0",
                    fontSize: 15, fontWeight: 600, cursor: "pointer"
                  }}>Anterior</button>
                )}
                <button
                  onClick={goNext}
                  disabled={!canProceed()}
                  style={{
                    flex: 2, padding: 14, borderRadius: 14,
                    background: canProceed() ? "#1E293B" : "#CBD5E1",
                    color: "white", border: "none", fontSize: 15, fontWeight: 700,
                    cursor: canProceed() ? "pointer" : "not-allowed",
                    boxShadow: canProceed() ? "0 4px 15px rgba(30,41,59,0.3)" : "none",
                    transition: "all 0.2s"
                  }}
                >{currentSection < sections.length - 2 ? "Siguiente" : "Ver resultados"}</button>
              </div>
            )}
          </>
        )}
      </div>

      {/* ── DASHBOARD ── */}
      {step === "dashboard" && (
        <Dashboard onBack={() => setStep("intro")} />
      )}

      {/* ── PRIVACY ── */}
      {step === "privacy" && (
        <PrivacyPolicy onBack={() => { setStep("intro"); scrollTop() }} />
      )}

      {/* ── ABOUT ── */}
      {step === "about" && (
        <AboutPage onBack={() => { setStep("intro"); scrollTop() }} onOpenPrivacy={() => setStep("privacy")} />
      )}

      {/* Tooltips */}
      {tooltipItem && <InfoSheet item={tooltipItem} onClose={() => setOpenTooltip(null)} />}
      {helpItem && <HelpSheet title={helpItem.label} text={helpItem.help} onClose={() => setOpenHelp(null)} />}
    </div>
  )
}
