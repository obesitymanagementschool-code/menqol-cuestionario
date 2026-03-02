export default function PrivacyPolicy({ onBack }) {
  const sections = [
    {
      title: "1. Responsable del tratamiento",
      text: `El responsable del tratamiento de los datos personales recogidos a través de esta aplicación es la Universidad Politécnica de Madrid (UPM), a través del equipo investigador del estudio sobre calidad de vida en la menopausia y actividad física.\n\nInvestigadora principal: Dra. Ana Belén Peinado\nContacto: anabelen.peinado@upm.es\nEncargado del tratamiento: Cuerpos Serranos S.L.\nDelegado de Protección de Datos (DPO): DPO de la Universidad Politécnica de Madrid`
    },
    {
      title: "2. Datos que se recogen",
      text: `Se recogen exclusivamente los siguientes datos:\n\n• Edad, peso y talla (campos opcionales)\n• Respuestas a las 29 preguntas del cuestionario MENQOL (presencia de síntoma sí/no y puntuación 0-6)\n• Datos sociodemográficos (estado civil, estudios, empleo, etnia) — solo versión completa\n• Hábitos (tabaco, alcohol) — solo versión completa\n• Antecedentes de salud — solo versión completa\n• Historia ginecológica o información sobre etapa reproductiva\n• Respuestas al cuestionario IPAQ (actividad física)\n• Puntuaciones calculadas por dominio y global\n• Fecha y hora del envío\n• Versión del cuestionario utilizada (completa/rápida)\n\nNO se recoge: nombre, dirección de correo electrónico, dirección postal, número de teléfono, dirección IP, cookies de seguimiento, ni ningún otro dato que permita identificar directamente al participante.`
    },
    {
      title: "3. Finalidad del tratamiento",
      text: `Los datos se tratan con la finalidad exclusiva de:\n\n• Investigación científica sobre la calidad de vida relacionada con la menopausia y su relación con la actividad física\n• Análisis estadístico agregado de las respuestas\n• Publicación de resultados en formato agregado y anonimizado en revistas científicas o comunicaciones académicas\n\nLos datos NO se utilizarán para fines comerciales, publicitarios ni para la elaboración de perfiles.`
    },
    {
      title: "4. Base legal del tratamiento",
      text: `El tratamiento de los datos se basa en:\n\n• Artículo 6.1.a) del RGPD: consentimiento explícito del interesado, otorgado mediante la aceptación del formulario de consentimiento informado antes del envío de las respuestas.\n• Artículo 9.2.j) del RGPD: tratamiento de categorías especiales de datos necesario para fines de investigación científica, sujeto a garantías adecuadas (anonimización, minimización de datos, almacenamiento seguro).\n\nEl consentimiento puede ser revocado en cualquier momento sin que ello afecte a la licitud del tratamiento basado en el consentimiento previo a su retirada.`
    },
    {
      title: "5. Destinatarios de los datos",
      text: `Los datos son accesibles únicamente por:\n\n• Los investigadores autorizados del estudio (UPM y Cuerpos Serranos), mediante credenciales de acceso protegidas\n\nNo se ceden datos a terceros. No se realizan decisiones automatizadas ni elaboración de perfiles con los datos recogidos.`
    },
    {
      title: "6. Transferencias internacionales",
      text: `Los datos se almacenan en servidores de Supabase ubicados en la Unión Europea (región EU). No se realizan transferencias de datos personales fuera del Espacio Económico Europeo (EEE).\n\nLa infraestructura de Supabase utiliza Amazon Web Services (AWS) con centros de datos en la UE, cumpliendo con las garantías adecuadas según el RGPD.`
    },
    {
      title: "7. Periodo de conservación",
      text: `Los datos se conservarán durante:\n\n• La duración del estudio de investigación\n• Un periodo adicional de 5 años tras la finalización del estudio, conforme a las buenas prácticas en investigación científica\n\nTranscurrido este periodo, los datos serán eliminados de forma segura. En caso de solicitud de supresión por parte del interesado, los datos se eliminarán en un plazo máximo de 30 días.`
    },
    {
      title: "8. Derechos del interesado",
      text: `De conformidad con el RGPD, tienes derecho a:\n\n• Acceso: conocer qué datos tuyos se están tratando\n• Rectificación: corregir datos inexactos\n• Supresión ("derecho al olvido"): solicitar la eliminación de tus datos\n• Limitación del tratamiento: restringir el uso de tus datos\n• Portabilidad: recibir tus datos en formato estructurado\n• Oposición: oponerte al tratamiento de tus datos\n• Revocación del consentimiento: retirar tu consentimiento en cualquier momento\n\nPara ejercer estos derechos, utiliza el código de referencia que recibiste al guardar tus respuestas y contacta al responsable del tratamiento.`
    },
    {
      title: "9. Cómo ejercer tus derechos",
      text: `Para ejercer cualquiera de los derechos mencionados:\n\n1. Envía un correo electrónico a: anabelen.peinado@upm.es\n2. Indica en el asunto: "Ejercicio de derechos RGPD — Estudio MENQOL"\n3. Incluye tu código de referencia (proporcionado al guardar tus respuestas)\n4. Especifica el derecho que deseas ejercer\n\nRecibirás respuesta en un plazo máximo de 30 días naturales.`
    },
    {
      title: "10. Medidas de seguridad",
      text: `Se aplican las siguientes medidas técnicas y organizativas para proteger tus datos:\n\n• Cifrado en tránsito mediante HTTPS/TLS\n• Cifrado en reposo en la base de datos\n• Control de acceso basado en roles (RLS — Row Level Security)\n• Autenticación obligatoria para el acceso a datos por parte de investigadores\n• Registro de auditoría de accesos y operaciones sobre los datos\n• Minimización de datos: solo se recogen los datos estrictamente necesarios\n• Anonimización: no se recogen identificadores personales directos\n• Código fuente abierto y auditable (GitHub)`
    },
    {
      title: "11. Autoridad de control",
      text: `Si consideras que el tratamiento de tus datos personales vulnera la normativa vigente, tienes derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD):\n\nAgencia Española de Protección de Datos\nC/ Jorge Juan, 6 — 28001 Madrid\nwww.aepd.es`
    },
    {
      title: "12. Modificaciones de esta política",
      text: `Esta política de privacidad puede ser actualizada para reflejar cambios en el tratamiento de datos o en la normativa aplicable. La fecha de la última actualización se indica al final de este documento.\n\nÚltima actualización: marzo de 2026`
    },
  ]

  return (
    <div style={{ maxWidth: 560, margin: "0 auto", padding: "0 20px 40px" }}>
      <div className="fade-in">
        <button onClick={onBack} style={{
          background: "none", border: "none", color: "#94A3B8",
          fontSize: 14, fontWeight: 500, cursor: "pointer", padding: "16px 0 12px",
          display: "flex", alignItems: "center", gap: 4
        }}>
          ← Volver
        </button>

        <div style={{
          background: "white", borderRadius: 20, padding: 24,
          border: "1.5px solid #F1F5F9", marginBottom: 16,
          boxShadow: "0 4px 20px rgba(0,0,0,0.04)"
        }}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>🔒</div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: "#1E293B", marginBottom: 4 }}>
              Política de Privacidad
            </h1>
            <p style={{ fontSize: 13, color: "#94A3B8" }}>
              Cuestionario MENQOL — Estudio UPM / Cuerpos Serranos
            </p>
          </div>

          <div style={{
            background: "#F0FDF4", borderRadius: 12, padding: 14,
            border: "1px solid #BBF7D0", marginBottom: 24
          }}>
            <p style={{ fontSize: 12, color: "#166534", lineHeight: 1.6, margin: 0 }}>
              <strong>Cumplimiento normativo:</strong> Esta política se ajusta al Reglamento General
              de Protección de Datos (RGPD — Reglamento UE 2016/679) y a la Ley Orgánica 3/2018,
              de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos
              digitales (LOPDGDD).
            </p>
          </div>

          {sections.map((s, i) => (
            <div key={i} style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1E293B", marginBottom: 8 }}>
                {s.title}
              </h3>
              <div style={{ fontSize: 13, color: "#475569", lineHeight: 1.7, whiteSpace: "pre-line" }}>
                {s.text}
              </div>
            </div>
          ))}
        </div>

        <p style={{ fontSize: 11, color: "#94A3B8", textAlign: "center", lineHeight: 1.6 }}>
          Documento generado conforme al RGPD (UE 2016/679) y la LOPDGDD (LO 3/2018).
          Para consultas: anabelen.peinado@upm.es
        </p>
      </div>
    </div>
  )
}
