// Multi-section navigation: stepper, progress bar, estimated time remaining

export function SectionStepper({ sections, currentIndex }) {
  return (
    <div className="no-print" style={{ marginBottom: 16 }}>
      {/* Stepper chips */}
      <div style={{ display: "flex", gap: 4, marginBottom: 8, overflowX: "auto", padding: "2px 0" }}>
        {sections.map((s, i) => {
          const isComplete = i < currentIndex;
          const isCurrent = i === currentIndex;
          return (
            <div key={s.id} style={{
              display: "flex", alignItems: "center", gap: 4,
              padding: "4px 10px", borderRadius: 20, flexShrink: 0,
              fontSize: 11, fontWeight: 600, whiteSpace: "nowrap",
              background: isCurrent ? "#1E293B" : isComplete ? "#22C55E18" : "#F1F5F9",
              color: isCurrent ? "white" : isComplete ? "#22C55E" : "#94A3B8",
              border: isCurrent ? "none" : isComplete ? "1px solid #22C55E40" : "1px solid #E2E8F0"
            }}>
              {isComplete ? "✓" : s.emoji} {s.shortName || s.name}
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div style={{ height: 4, background: "#E2E8F0", borderRadius: 2, overflow: "hidden" }}>
        <div style={{
          height: "100%", background: "#1E293B", borderRadius: 2,
          width: `${((currentIndex + 1) / sections.length) * 100}%`,
          transition: "width 0.3s"
        }} />
      </div>

      {/* Progress text */}
      <div style={{
        display: "flex", justifyContent: "space-between", marginTop: 6,
        fontSize: 11, color: "#94A3B8"
      }}>
        <span>Sección {currentIndex + 1} de {sections.length}</span>
        <span>{Math.round(((currentIndex + 1) / sections.length) * 100)}% completado</span>
      </div>
    </div>
  );
}

export function TimeEstimate({ sections, currentIndex }) {
  const remaining = sections.slice(currentIndex).reduce((sum, s) => sum + (s.estimatedMinutes || 2), 0);
  if (remaining <= 0) return null;
  return (
    <span style={{ fontSize: 11, color: "#94A3B8" }}>
      ~{remaining} min restantes
    </span>
  );
}

export function SectionHeader({ section, questionCount }) {
  return (
    <div style={{
      background: "#F8FAFC", borderRadius: 16, padding: 16, marginBottom: 14,
      border: "1.5px solid #E2E8F0"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 28 }}>{section.emoji}</span>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, color: "#1E293B" }}>{section.name}</h2>
          <p style={{ fontSize: 13, color: "#64748B", marginTop: 2 }}>{section.description}</p>
        </div>
      </div>
      {(questionCount || section.estimatedMinutes) && (
        <div style={{
          display: "flex", gap: 12, marginTop: 10, fontSize: 12, color: "#94A3B8"
        }}>
          {questionCount != null && <span>{questionCount} preguntas</span>}
          {section.estimatedMinutes && <span>~{section.estimatedMinutes} min</span>}
        </div>
      )}
    </div>
  );
}
