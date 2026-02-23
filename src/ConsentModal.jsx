import { useState } from 'react'

export default function ConsentModal({ onAccept, onCancel, onOpenPrivacy }) {
  const [accepted, setAccepted] = useState(false)

  return (
    <div
      style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)",
        padding: 20
      }}
      onClick={onCancel}
    >
      <div
        className="fade-in"
        onClick={e => e.stopPropagation()}
        style={{
          background: "white", borderRadius: 20, padding: "28px 24px",
          width: "100%", maxWidth: 440, maxHeight: "85vh", overflowY: "auto",
          boxShadow: "0 8px 40px rgba(0,0,0,0.15)"
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🔒</div>
          <h2 style={{ fontSize: 19, fontWeight: 700, color: "#1E293B", marginBottom: 4 }}>
            Consentimiento informado
          </h2>
          <p style={{ fontSize: 13, color: "#94A3B8" }}>
            Antes de guardar tus respuestas para investigación
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
          {[
            {
              icon: "🎯",
              title: "Finalidad",
              text: "Tus respuestas se usarán en un estudio de investigación sobre calidad de vida en la menopausia, vinculado a una universidad."
            },
            {
              icon: "📋",
              title: "Datos recogidos",
              text: "Edad (opcional), peso (opcional) y tus 29 respuestas al cuestionario. No se recoge tu nombre, email, dirección IP ni ningún dato que te identifique."
            },
            {
              icon: "🇪🇺",
              title: "Almacenamiento",
              text: "Los datos se guardan en una base de datos cifrada ubicada en la Unión Europea (Supabase, región EU). La transmisión se realiza mediante HTTPS."
            },
            {
              icon: "🕐",
              title: "Periodo de conservación",
              text: "Los datos se conservarán durante la duración del estudio más 5 años adicionales, salvo que solicites su eliminación antes."
            },
            {
              icon: "🔑",
              title: "Acceso",
              text: "Solo los investigadores autorizados del estudio pueden acceder a los datos, mediante credenciales protegidas."
            },
            {
              icon: "⚖️",
              title: "Tus derechos",
              text: "Tienes derecho a solicitar el acceso, rectificación o eliminación de tus datos. Al guardar recibirás un código de referencia para ejercer estos derechos."
            },
          ].map((item, i) => (
            <div key={i} style={{
              background: "#F8FAFC", borderRadius: 12, padding: "12px 14px",
              border: "1px solid #F1F5F9"
            }}>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#1E293B", marginBottom: 2 }}>{item.title}</div>
                  <div style={{ fontSize: 12, color: "#64748B", lineHeight: 1.5 }}>{item.text}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onOpenPrivacy}
          style={{
            width: "100%", padding: 10, marginBottom: 16,
            background: "none", border: "none", color: "#6366F1",
            fontSize: 13, fontWeight: 600, cursor: "pointer",
            textDecoration: "underline", textUnderlineOffset: 3
          }}
        >
          Leer la Política de Privacidad completa
        </button>

        <label style={{
          display: "flex", gap: 10, alignItems: "flex-start",
          padding: "14px 16px", borderRadius: 12,
          background: accepted ? "#F0FDF4" : "#FAFBFE",
          border: `1.5px solid ${accepted ? "#22C55E" : "#E2E8F0"}`,
          cursor: "pointer", marginBottom: 16, transition: "all 0.2s"
        }}>
          <input
            type="checkbox"
            checked={accepted}
            onChange={e => setAccepted(e.target.checked)}
            style={{ marginTop: 2, accentColor: "#22C55E", width: 18, height: 18, flexShrink: 0 }}
          />
          <span style={{ fontSize: 13, color: "#1E293B", lineHeight: 1.5 }}>
            He leído la información anterior y la Política de Privacidad, y <strong>consiento</strong> que
            mis respuestas anónimas se utilicen con fines de investigación científica conforme al
            RGPD (Art. 6.1.a y Art. 9.2.j).
          </span>
        </label>

        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onCancel} style={{
            flex: 1, padding: 14, borderRadius: 14,
            background: "white", color: "#64748B", border: "1.5px solid #E2E8F0",
            fontSize: 14, fontWeight: 600, cursor: "pointer"
          }}>Cancelar</button>
          <button
            onClick={onAccept}
            disabled={!accepted}
            style={{
              flex: 2, padding: 14, borderRadius: 14,
              background: accepted ? "#1E293B" : "#CBD5E1",
              color: "white", border: "none",
              fontSize: 14, fontWeight: 700,
              cursor: accepted ? "pointer" : "not-allowed",
              boxShadow: accepted ? "0 4px 15px rgba(30,41,59,0.3)" : "none",
              transition: "all 0.2s"
            }}
          >Aceptar y guardar</button>
        </div>
      </div>
    </div>
  )
}
