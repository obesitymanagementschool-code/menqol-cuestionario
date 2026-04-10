import { useState } from 'react'

/* ─── Help Bottom Sheet (kept for MENQOL tooltips) ─── */
export function HelpSheet({ title, text, onClose }) {
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
        {title && <h4 style={{ fontSize: 17, fontWeight: 600, color: "#1E293B", marginBottom: 8 }}>{title}</h4>}
        <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.6 }}>{text}</p>
        <button onClick={onClose} style={{
          marginTop: 16, width: "100%", padding: 12, background: "#dd2946",
          color: "white", border: "none", borderRadius: 12, fontSize: 15,
          fontWeight: 600, cursor: "pointer"
        }}>Entendido</button>
      </div>
    </div>
  );
}

/* ─── Inline help text ─── */
function HelpText({ text }) {
  if (!text) return null;
  return (
    <p style={{ fontSize: 12, color: "#94A3B8", marginTop: 6, lineHeight: 1.5, fontStyle: "italic" }}>
      {text}
    </p>
  );
}

/* ─── Question Card wrapper ─── */
function QuestionCard({ children }) {
  return (
    <div style={{
      background: "white", borderRadius: 14, padding: "14px 16px",
      border: "1.5px solid #F1F5F9",
      boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
    }}>
      {children}
    </div>
  );
}

/* ─── Question Label ─── */
function QuestionLabel({ label }) {
  return (
    <p style={{ fontSize: 14, fontWeight: 600, color: "#1E293B", lineHeight: 1.5, marginBottom: 10 }}>
      {label}
    </p>
  );
}

/* ─── Radio Question ─── */
export function RadioQuestion({ question, value, onChange }) {
  return (
    <QuestionCard>
      <QuestionLabel label={question.label} />
      {question.help && <HelpText text={question.help} />}
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 10 }}>
        {question.options.map(opt => {
          const active = value === opt.value;
          return (
            <button key={opt.value} onClick={() => onChange(opt.value)} style={{
              width: "100%", padding: "10px 14px", borderRadius: 10, textAlign: "left",
              border: active ? "2px solid #dd2946" : "1.5px solid #E2E8F0",
              background: active ? "#FFF5F7" : "white",
              color: active ? "#dd2946" : "#64748B",
              fontSize: 13, fontWeight: active ? 600 : 400, cursor: "pointer",
              transition: "all 0.15s"
            }}>{opt.label}</button>
          );
        })}
      </div>
    </QuestionCard>
  );
}

/* ─── Yes/No Question ─── */
export function YesNoQuestion({ question, value, onChange }) {
  return (
    <QuestionCard>
      <QuestionLabel label={question.label} />
      {question.help && <HelpText text={question.help} />}
      <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
        {[false, true].map(val => {
          const active = value === val;
          return (
            <button key={String(val)} onClick={() => onChange(val)} style={{
              flex: 1, padding: "10px 0", borderRadius: 10,
              border: active ? "2px solid #dd2946" : "1.5px solid #E2E8F0",
              background: active ? "#FFF5F7" : "white",
              color: active ? "#dd2946" : "#64748B",
              fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "all 0.15s"
            }}>{val ? "Sí" : "No"}</button>
          );
        })}
      </div>
    </QuestionCard>
  );
}

/* ─── Number Input ─── */
export function NumberInput({ question, value, onChange }) {
  return (
    <QuestionCard>
      <QuestionLabel label={question.label} />
      {question.help && <HelpText text={question.help} />}
      <input
        type="number"
        value={value ?? ""}
        onChange={e => onChange(e.target.value === "" ? null : Number(e.target.value))}
        placeholder={question.placeholder}
        min={question.min}
        max={question.max}
        step={question.step || 1}
        style={{
          width: "100%", padding: "12px 16px", borderRadius: 12,
          border: "1.5px solid #E2E8F0", fontSize: 16, color: "#1E293B",
          outline: "none", background: "#FAFBFE", marginTop: 10
        }}
      />
    </QuestionCard>
  );
}

/* ─── Text Input ─── */
export function TextInput({ question, value, onChange }) {
  return (
    <QuestionCard>
      <QuestionLabel label={question.label} />
      {question.help && <HelpText text={question.help} />}
      <input
        type="text"
        value={value ?? ""}
        onChange={e => onChange(e.target.value || null)}
        placeholder={question.placeholder}
        style={{
          width: "100%", padding: "12px 16px", borderRadius: 12,
          border: "1.5px solid #E2E8F0", fontSize: 14, color: "#1E293B",
          outline: "none", background: "#FAFBFE", marginTop: 10
        }}
      />
    </QuestionCard>
  );
}

/* ─── Select / Dropdown ─── */
export function SelectQuestion({ question, value, onChange }) {
  return (
    <QuestionCard>
      <QuestionLabel label={question.label} />
      {question.help && <HelpText text={question.help} />}
      <select
        value={value ?? ""}
        onChange={e => onChange(e.target.value || null)}
        style={{
          width: "100%", padding: "12px 16px", borderRadius: 12,
          border: "1.5px solid #E2E8F0", fontSize: 14, color: value ? "#1E293B" : "#94A3B8",
          outline: "none", background: "#FAFBFE", marginTop: 10,
          appearance: "none", cursor: "pointer"
        }}
      >
        <option value="">Selecciona una opción</option>
        {question.options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </QuestionCard>
  );
}

/* ─── Checkbox (multi-select) ─── */
export function CheckboxQuestion({ question, value, onChange }) {
  const selected = value || [];
  const toggle = (v) => {
    const next = selected.includes(v)
      ? selected.filter(x => x !== v)
      : [...selected, v];
    onChange(next.length > 0 ? next : null);
  };
  return (
    <QuestionCard>
      <QuestionLabel label={question.label} />
      {question.help && <HelpText text={question.help} />}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 10 }}>
        {question.options.map(opt => {
          const active = selected.includes(opt.value);
          return (
            <div
              key={opt.value}
              onClick={() => toggle(opt.value)}
              style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "10px 14px", borderRadius: 10, cursor: "pointer",
                border: active ? "2px solid #dd2946" : "1.5px solid #E2E8F0",
                background: active ? "#FFF5F7" : "white",
                transition: "all 0.15s"
              }}
            >
              <div style={{
                width: 20, height: 20, borderRadius: 5, flexShrink: 0,
                border: "2px solid #dd2946",
                background: active ? "#dd2946" : "white",
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                {active && <span style={{ color: "white", fontSize: 13, fontWeight: 700 }}>✓</span>}
              </div>
              <span style={{ fontSize: 13, color: active ? "#dd2946" : "#64748B", fontWeight: active ? 600 : 400 }}>
                {opt.label}
              </span>
            </div>
          );
        })}
      </div>
    </QuestionCard>
  );
}

/* ─── Generic Question Renderer ─── */
export function QuestionRenderer({ question, value, onChange, openHelp, setOpenHelp }) {
  switch (question.type) {
    case "radio":
      return <RadioQuestion question={question} value={value} onChange={onChange} />;
    case "yesno":
      return <YesNoQuestion question={question} value={value} onChange={onChange} />;
    case "number":
      return <NumberInput question={question} value={value} onChange={onChange} />;
    case "text":
      return <TextInput question={question} value={value} onChange={onChange} />;
    case "select":
      return <SelectQuestion question={question} value={value} onChange={onChange} />;
    case "checkbox":
      return <CheckboxQuestion question={question} value={value} onChange={onChange} />;
    default:
      return null;
  }
}function HelpButton({ onClick, active }) {
  return (
    <button
      onClick={onClick}
      aria-label="Más información"
      style={{
        width: 28, height: 28, borderRadius: "50%",
        border: "1.5px solid #CBD5E1",
        background: active ? "#F1F5F9" : "white",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", fontSize: 14, color: "#64748B", flexShrink: 0
      }}
    >?</button>
  );
}

/* ─── Question Card wrapper ─── */
function QuestionCard({ children, incomplete }) {
  return (
    <div style={{
      background: "white", borderRadius: 14, padding: "14px 16px",
      border: incomplete ? "2px solid #F59E0B" : "1.5px solid #F1F5F9",
      boxShadow: incomplete ? "0 0 0 3px #F59E0B18" : "0 1px 3px rgba(0,0,0,0.04)",
      transition: "all 0.2s"
    }}>
      {children}
    </div>
  );
}

/* ─── Radio Question ─── */
export function RadioQuestion({ question, value, onChange, openHelp, setOpenHelp }) {
  return (
    <QuestionCard>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: "#1E293B", flex: 1, lineHeight: 1.4 }}>
          {question.label}
        </span>
        {question.help && (
          <HelpButton onClick={() => setOpenHelp(openHelp === question.id ? null : question.id)} active={openHelp === question.id} />
        )}
      </div>
      {question.sublabel && (
        <p style={{ fontSize: 12, color: "#94A3B8", marginBottom: 8, lineHeight: 1.4 }}>{question.sublabel}</p>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {question.options.map(opt => {
          const active = value === opt.value;
          return (
            <button key={opt.value} onClick={() => onChange(opt.value)} style={{
              width: "100%", padding: "10px 14px", borderRadius: 10, textAlign: "left",
              border: active ? "2px solid #7C9CE8" : "1.5px solid #E2E8F0",
              background: active ? "#EEF2FF" : "white",
              color: active ? "#1E293B" : "#64748B",
              fontSize: 13, fontWeight: active ? 600 : 400, cursor: "pointer",
              transition: "all 0.15s"
            }}>{opt.label}</button>
          );
        })}
      </div>
    </QuestionCard>
  );
}

/* ─── Yes/No Question ─── */
export function YesNoQuestion({ question, value, onChange, openHelp, setOpenHelp }) {
  return (
    <QuestionCard>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: "#1E293B", flex: 1, lineHeight: 1.4 }}>
          {question.label}
        </span>
        {question.help && (
          <HelpButton onClick={() => setOpenHelp(openHelp === question.id ? null : question.id)} active={openHelp === question.id} />
        )}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        {[false, true].map(val => {
          const active = value === val;
          return (
            <button key={String(val)} onClick={() => onChange(val)} style={{
              flex: 1, padding: "10px 0", borderRadius: 10,
              border: active ? "2px solid #7C9CE8" : "1.5px solid #E2E8F0",
              background: active ? "#EEF2FF" : "white",
              color: active ? "#1E293B" : "#64748B",
              fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "all 0.15s"
            }}>{val ? "Sí" : "No"}</button>
          );
        })}
      </div>
    </QuestionCard>
  );
}

/* ─── Number Input ─── */
export function NumberInput({ question, value, onChange, openHelp, setOpenHelp }) {
  return (
    <QuestionCard>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: "#1E293B", flex: 1, lineHeight: 1.4 }}>
          {question.label}
        </span>
        {question.help && (
          <HelpButton onClick={() => setOpenHelp(openHelp === question.id ? null : question.id)} active={openHelp === question.id} />
        )}
      </div>
      {question.sublabel && (
        <p style={{ fontSize: 12, color: "#94A3B8", marginBottom: 8, lineHeight: 1.4 }}>{question.sublabel}</p>
      )}
      <input
        type="number"
        value={value ?? ""}
        onChange={e => onChange(e.target.value === "" ? null : Number(e.target.value))}
        placeholder={question.placeholder}
        min={question.min}
        max={question.max}
        step={question.step || 1}
        style={{
          width: "100%", padding: "12px 16px", borderRadius: 12,
          border: "1.5px solid #E2E8F0", fontSize: 16, color: "#1E293B",
          outline: "none", background: "#FAFBFE"
        }}
      />
    </QuestionCard>
  );
}

/* ─── Text Input ─── */
export function TextInput({ question, value, onChange, openHelp, setOpenHelp }) {
  return (
    <QuestionCard>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: "#1E293B", flex: 1, lineHeight: 1.4 }}>
          {question.label}
        </span>
        {question.help && (
          <HelpButton onClick={() => setOpenHelp(openHelp === question.id ? null : question.id)} active={openHelp === question.id} />
        )}
      </div>
      <input
        type="text"
        value={value ?? ""}
        onChange={e => onChange(e.target.value || null)}
        placeholder={question.placeholder}
        style={{
          width: "100%", padding: "12px 16px", borderRadius: 12,
          border: "1.5px solid #E2E8F0", fontSize: 14, color: "#1E293B",
          outline: "none", background: "#FAFBFE"
        }}
      />
    </QuestionCard>
  );
}

/* ─── Generic Question Renderer ─── */
export function QuestionRenderer({ question, value, onChange, openHelp, setOpenHelp }) {
  switch (question.type) {
    case "radio":
      return <RadioQuestion question={question} value={value} onChange={onChange} openHelp={openHelp} setOpenHelp={setOpenHelp} />;
    case "yesno":
      return <YesNoQuestion question={question} value={value} onChange={onChange} openHelp={openHelp} setOpenHelp={setOpenHelp} />;
    case "number":
      return <NumberInput question={question} value={value} onChange={onChange} openHelp={openHelp} setOpenHelp={setOpenHelp} />;
    case "text":
      return <TextInput question={question} value={value} onChange={onChange} openHelp={openHelp} setOpenHelp={setOpenHelp} />;
    default:
      return null;
  }
}
