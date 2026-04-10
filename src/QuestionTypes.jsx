import React, { useState } from 'react'

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
      {question.sublabel && <p style={{ fontSize: 12, color: "#94A3B8", marginTop: 4, marginBottom: 4 }}>{question.sublabel}</p>}
      {question.help && <HelpText text={question.help} />}
      <select
        value={value ?? ""}
        onChange={e => onChange(e.target.value || null)}
        style={{
          width: "100%", padding: "12px 16px", borderRadius: 12,
          border: "1.5px solid #E2E8F0", fontSize: 14,
          color: value ? "#1E293B" : "#94A3B8",
          outline: "none", background: "#FAFBFE", marginTop: 10,
          appearance: "none", cursor: "pointer"
        }}
      >
        <option value="">— Selecciona —</option>
        {question.options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </QuestionCard>
  );
}

/* ─── Checkbox/* ─── Checkbox (multi-select) ─── */
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

/* ─── Wheel Picker (ruleta numérica) ─── */
export function WheelPicker({ question, value, onChange }) {
  const { useState, useRef, useEffect, useCallback } = require !== undefined
    ? { useState: null } : {}

  const min = question.min ?? 0
  const max = question.max ?? 100
  const step = question.step ?? 1
  const unit = question.unit ?? ""
  const defaultVal = question.defaultValue ?? Math.round((min + max) / 2)

  const [current, setCurrent] = React.useState(value != null ? Number(value) : null)
  const [isDragging, setIsDragging] = React.useState(false)
  const [startY, setStartY] = React.useState(0)
  const [startVal, setStartVal] = React.useState(defaultVal)
  const containerRef = React.useRef(null)

  const displayVal = current != null ? current : defaultVal
  const ITEM_HEIGHT = 44

  const clamp = (v) => Math.min(max, Math.max(min, Math.round(v / step) * step))

  const handleStart = (clientY) => {
    setIsDragging(true)
    setStartY(clientY)
    setStartVal(displayVal)
    if (current == null) {
      setCurrent(defaultVal)
      onChange(String(defaultVal))
    }
  }

  const handleMove = (clientY) => {
    if (!isDragging) return
    const diff = startY - clientY
    const steps = Math.round(diff / ITEM_HEIGHT)
    const newVal = clamp(startVal + steps * step)
    setCurrent(newVal)
    onChange(String(newVal))
  }

  const handleEnd = () => setIsDragging(false)

  // Touch events
  const onTouchStart = (e) => handleStart(e.touches[0].clientY)
  const onTouchMove = (e) => { e.preventDefault(); handleMove(e.touches[0].clientY) }
  const onTouchEnd = () => handleEnd()

  // Mouse events
  const onMouseDown = (e) => handleStart(e.clientY)
  const onMouseMove = (e) => { if (isDragging) handleMove(e.clientY) }
  const onMouseUp = () => handleEnd()

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", onMouseMove)
      window.addEventListener("mouseup", onMouseUp)
    }
    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseup", onMouseUp)
    }
  }, [isDragging, startY, startVal])

  // Scroll wheel support
  const onWheel = (e) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? step : -step
    const newVal = clamp(displayVal + delta)
    setCurrent(newVal)
    onChange(String(newVal))
  }

  const prev2 = clamp(displayVal - 2 * step)
  const prev1 = clamp(displayVal - 1 * step)
  const next1 = clamp(displayVal + 1 * step)
  const next2 = clamp(displayVal + 2 * step)

  const rowStyle = (opacity, fontSize, color) => ({
    height: ITEM_HEIGHT, display: "flex", alignItems: "center", justifyContent: "center",
    fontSize, fontWeight: 600, color, opacity, userSelect: "none", transition: "all 0.15s"
  })

  return (
    <QuestionCard>
      <QuestionLabel label={question.label} />
      {question.help && <HelpText text={question.help} />}
      <div style={{ marginTop: 12, position: "relative" }}>
        {/* Instruction */}
        {current == null && (
          <p style={{ textAlign: "center", fontSize: 12, color: "#94A3B8", marginBottom: 8 }}>
            Desliza arriba o abajo para seleccionar
          </p>
        )}
        {/* Wheel container */}
        <div
          ref={containerRef}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onWheel={onWheel}
          style={{
            height: ITEM_HEIGHT * 5,
            overflow: "hidden",
            cursor: isDragging ? "grabbing" : "grab",
            position: "relative",
            borderRadius: 14,
            background: current == null ? "#FFF5F7" : "#FAFBFE",
            border: current == null ? "2px dashed #dd294640" : "1.5px solid #E2E8F0",
            touchAction: "none",
            transition: "background 0.2s, border 0.2s"
          }}
        >
          {/* Highlight bar */}
          <div style={{
            position: "absolute", top: ITEM_HEIGHT * 2, left: 0, right: 0,
            height: ITEM_HEIGHT,
            background: "#dd294610",
            borderTop: "2px solid #dd294630",
            borderBottom: "2px solid #dd294630",
            pointerEvents: "none"
          }} />
          {/* Items */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={rowStyle(0.2, 13, "#94A3B8")}>{prev2 !== displayVal ? `${prev2} ${unit}` : ""}</div>
            <div style={rowStyle(0.5, 15, "#64748B")}>{prev1 !== displayVal ? `${prev1} ${unit}` : ""}</div>
            <div style={rowStyle(1, 22, "#dd2946")}>{current != null ? `${displayVal} ${unit}` : `— ${unit} —`}</div>
            <div style={rowStyle(0.5, 15, "#64748B")}>{next1 !== displayVal ? `${next1} ${unit}` : ""}</div>
            <div style={rowStyle(0.2, 13, "#94A3B8")}>{next2 !== displayVal ? `${next2} ${unit}` : ""}</div>
          </div>
        </div>
        {/* Arrow buttons */}
        <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 10 }}>
          <button
            onClick={() => { const v = clamp(displayVal - step); setCurrent(v); onChange(String(v)) }}
            style={{
              width: 44, height: 44, borderRadius: "50%", border: "1.5px solid #E2E8F0",
              background: "white", fontSize: 20, cursor: "pointer", color: "#64748B",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}
          >↓</button>
          <button
            onClick={() => { const v = clamp(displayVal + step); setCurrent(v); onChange(String(v)) }}
            style={{
              width: 44, height: 44, borderRadius: "50%", border: "1.5px solid #E2E8F0",
              background: "white", fontSize: 20, cursor: "pointer", color: "#64748B",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}
          >↑</button>
        </div>
        {current != null && (
          <button
            onClick={() => { setCurrent(null); onChange(null) }}
            style={{
              display: "block", margin: "8px auto 0", background: "none", border: "none",
              fontSize: 12, color: "#CBD5E1", cursor: "pointer"
            }}
          >Borrar selección</button>
        )}
      </div>
    </QuestionCard>
  )
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
    case "wheel":
      return <WheelPicker question={question} value={value} onChange={onChange} />;
    default:
      return null;
  }
}
