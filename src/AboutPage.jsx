/* ─── About Page: info about the study and how the app works ─── */

const SECTION_CARD = {
  background: "white", borderRadius: 16, padding: 20,
  border: "1.5px solid #F1F5F9", marginBottom: 14,
  boxShadow: "0 2px 10px rgba(0,0,0,0.03)"
}

const SECTION_TITLE = {
  fontSize: 17, fontWeight: 700, color: "#1E293B", marginBottom: 10, lineHeight: 1.3
}

const BODY_TEXT = {
  fontSize: 14, color: "#64748B", lineHeight: 1.7
}

const DIAGRAM_BOX = {
  display: "inline-flex", alignItems: "center", justifyContent: "center",
  background: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: 10,
  padding: "8px 14px", fontSize: 13, fontWeight: 600, color: "#475569",
  textAlign: "center", lineHeight: 1.3
}

const ARROW_STYLE = {
  display: "inline-flex", alignItems: "center", justifyContent: "center",
  fontSize: 18, color: "#94A3B8", padding: "0 6px", flexShrink: 0
}

const BADGE = {
  display: "inline-block", background: "#F0F9FF", color: "#0369A1",
  borderRadius: 8, padding: "3px 10px", fontSize: 12, fontWeight: 600
}

function FlowDiagram({ items }) {
  return (
    <div style={{
      display: "flex", flexWrap: "wrap", alignItems: "center",
      justifyContent: "center", gap: 4, marginTop: 12, marginBottom: 8
    }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div style={DIAGRAM_BOX}>{item}</div>
          {i < items.length - 1 && <span style={ARROW_STYLE}>→</span>}
        </div>
      ))}
    </div>
  )
}

function ProtectionItem({ emoji, text }) {
  return (
    <div style={{
      display: "flex", gap: 10, alignItems: "flex-start",
      padding: "8px 0", borderBottom: "1px solid #F8FAFC"
    }}>
      <span style={{ fontSize: 18, flexShrink: 0, lineHeight: 1.4 }}>{emoji}</span>
      <span style={{ ...BODY_TEXT, fontSize: 13 }}>{text}</span>
    </div>
  )
}

export default function AboutPage({ onBack, onOpenPrivacy }) {
  return (
    <div className="fade-in" style={{ maxWidth: 560, margin: "0 auto", padding: "0 16px 60px" }}>

      {/* Back button */}
      <button onClick={onBack} className="no-print" style={{
        background: "none", border: "none", color: "#64748B",
        fontSize: 14, fontWeight: 600, cursor: "pointer",
        padding: "16px 0 12px", display: "flex", alignItems: "center", gap: 6
      }}>
        ← Volver al inicio
      </button>

      {/* Page title */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1E293B", letterSpacing: "-0.3px" }}>
          Sobre el estudio
        </h2>
        <p style={{ fontSize: 13, color: "#94A3B8", marginTop: 4 }}>
          Información para participantes, profesionales y revisores
        </p>
      </div>

      {/* 1. ¿Quién realiza el estudio? */}
      <div style={SECTION_CARD}>
        <p style={{ fontSize: 28, marginBottom: 6 }}>🏛️</p>
        <h3 style={SECTION_TITLE}>¿Quién realiza el estudio?</h3>
        <p style={BODY_TEXT}>
          Este estudio de investigación es realizado por la <strong>Universidad Politécnica de Madrid (UPM)</strong> en
          colaboración con <strong>Cuerpos Serranos S.L.</strong>, bajo la dirección de la Dra. Ana Belén Peinado.
        </p>
        <p style={{ ...BODY_TEXT, fontSize: 13, marginTop: 10 }}>
          El objetivo es estudiar la <strong>calidad de vida durante la menopausia</strong> y su relación con
          la <strong>actividad física</strong>, utilizando instrumentos validados (MENQOL e IPAQ).
        </p>
      </div>

      {/* 2. ¿Quién puede participar? */}
      <div style={SECTION_CARD}>
        <p style={{ fontSize: 28, marginBottom: 6 }}>👩</p>
        <h3 style={SECTION_TITLE}>¿Quién puede participar?</h3>
        <p style={BODY_TEXT}>
          Mujeres de <strong>40 a 70 años</strong> que estén experimentando o hayan experimentado
          la transición menopáusica. No es necesario haber sido diagnosticada de menopausia.
        </p>
        <div style={{
          display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14
        }}>
          <span style={BADGE}>40-70 años</span>
          <span style={BADGE}>Anónimo</span>
          <span style={BADGE}>Voluntario</span>
        </div>
      </div>

      {/* 3. ¿Qué incluye? */}
      <div style={SECTION_CARD}>
        <p style={{ fontSize: 28, marginBottom: 6 }}>📋</p>
        <h3 style={SECTION_TITLE}>¿Qué incluye el cuestionario?</h3>
        <p style={BODY_TEXT}>
          Hay dos versiones disponibles:
        </p>
        <div style={{
          background: "#EEF2FF", borderRadius: 12, padding: 14, marginTop: 12,
          border: "1px solid #7C9CE830"
        }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: "#1E293B", marginBottom: 4 }}>
            Versión completa (~20-25 min)
          </p>
          <p style={{ fontSize: 12, color: "#64748B", lineHeight: 1.5 }}>
            Datos sociodemográficos, hábitos, antecedentes de salud, historia ginecológica,
            cuestionario MENQOL (29 preguntas) e IPAQ largo (27 preguntas de actividad física).
          </p>
        </div>
        <div style={{
          background: "#F0FDF4", borderRadius: 12, padding: 14, marginTop: 10,
          border: "1px solid #22C55E30"
        }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: "#1E293B", marginBottom: 4 }}>
            Versión rápida (~10 min)
          </p>
          <p style={{ fontSize: 12, color: "#64748B", lineHeight: 1.5 }}>
            Datos básicos, etapa reproductiva, preguntas clave de salud,
            cuestionario MENQOL completo (29 preguntas) e IPAQ corto (7 preguntas).
          </p>
        </div>
        <div style={{
          display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14
        }}>
          <span style={BADGE}>29 preguntas MENQOL</span>
          <span style={BADGE}>4 dominios</span>
          <span style={BADGE}>Escala 0-6</span>
        </div>
      </div>

      {/* 4. Riesgos y beneficios */}
      <div style={SECTION_CARD}>
        <p style={{ fontSize: 28, marginBottom: 6 }}>⚖️</p>
        <h3 style={SECTION_TITLE}>Riesgos y beneficios</h3>
        <p style={BODY_TEXT}>
          <strong>Riesgos:</strong> La participación no conlleva ningún riesgo para tu salud.
          Algunas preguntas abordan temas íntimos, pero puedes omitirlas si te resultan incómodas.
        </p>
        <p style={{ ...BODY_TEXT, marginTop: 10 }}>
          <strong>Beneficios:</strong> Al finalizar recibirás un <strong>informe individualizado</strong> con
          tus resultados MENQOL, comparativa con población de referencia, tu etapa reproductiva estimada
          y nivel de actividad física. Puedes compartir este informe con tu profesional de salud.
        </p>
      </div>

      {/* 5. ¿Cómo funciona la app? */}
      <div style={SECTION_CARD}>
        <p style={{ fontSize: 28, marginBottom: 6 }}>🌐</p>
        <h3 style={SECTION_TITLE}>¿Cómo funciona la app?</h3>
        <p style={BODY_TEXT}>
          La aplicación se aloja en <strong>GitHub Pages</strong> y se ejecuta completamente
          en tu navegador. Los datos solo se envían al servidor si aceptas el consentimiento informado.
        </p>
        <FlowDiagram items={[
          "📱\nTu navegador",
          "🔒\nHTTPS",
          "🗄️\nBase de datos\n(UE)"
        ]} />
        <p style={{ ...BODY_TEXT, fontSize: 13, marginTop: 8 }}>
          La app fue desarrollada con asistencia de IA (Claude de Anthropic),
          revisada por el equipo investigador. El código es <strong>abierto y auditable</strong>.
        </p>
      </div>

      {/* 6. Protección de datos */}
      <div style={SECTION_CARD}>
        <p style={{ fontSize: 28, marginBottom: 6 }}>🔒</p>
        <h3 style={SECTION_TITLE}>¿Cómo se protegen los datos?</h3>
        <p style={{ ...BODY_TEXT, marginBottom: 10 }}>
          Se aplican múltiples capas de protección:
        </p>
        <div style={{
          background: "#F8FAFC", borderRadius: 12, padding: "4px 14px"
        }}>
          <ProtectionItem emoji="🔐" text="Conexión cifrada (HTTPS) — los datos viajan encriptados" />
          <ProtectionItem emoji="🇪🇺" text="Base de datos en la Unión Europea, sujeta al RGPD" />
          <ProtectionItem emoji="👤" text="Sin datos identificativos — participación completamente anónima" />
          <ProtectionItem emoji="🔑" text="Acceso restringido a investigadores autorizados" />
          <ProtectionItem emoji="🛡️" text="Row Level Security (RLS) — la app solo puede enviar datos" />
        </div>
      </div>

      {/* Footer */}
      <div style={{
        textAlign: "center", padding: "20px 0", borderTop: "1px solid #F1F5F9"
      }}>
        <p style={{ fontSize: 12, color: "#94A3B8", lineHeight: 1.8 }}>
          Código abierto — puedes revisar y auditar todo el código fuente.
        </p>
        <a
          href="https://github.com/jpfilevich/menqol-cuestionario"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontSize: 13, fontWeight: 600, color: "#475569",
            textDecoration: "none", marginTop: 6,
            padding: "8px 16px", borderRadius: 10,
            background: "#F8FAFC", border: "1.5px solid #E2E8F0"
          }}
        >
          Ver en GitHub
        </a>
        <button
          onClick={onOpenPrivacy}
          style={{
            display: "block", margin: "12px auto 0", background: "none",
            border: "none", color: "#94A3B8", fontSize: 12, fontWeight: 500,
            cursor: "pointer", textDecoration: "underline", textUnderlineOffset: 3
          }}
        >
          Política de privacidad
        </button>
      </div>
    </div>
  )
}
