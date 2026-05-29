"use client";
import { useEffect, useRef, useCallback, useState } from "react";

const ALL_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*_+-=|;:,.?/~`".split("");
const CALM_CHARS = ".-:".split("");

// Fixed constants
const OUTER_R = 360;
const ZONE_HEIGHT = 0.35;

function smoothstep(e0: number, e1: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
}

function pickChar(variationRate: number) {
  if (Math.random() < variationRate) return ALL_CHARS[Math.floor(Math.random() * ALL_CHARS.length)];
  return CALM_CHARS[Math.floor(Math.random() * CALM_CHARS.length)];
}

interface AsciiHeroProps {
  children?: React.ReactNode;
  className?: string;
  bgColor?: string;
  showControls?: boolean;
}

export default function AsciiHero({
  children,
  className = "",
  bgColor = "#111111",
  showControls = false,
}: AsciiHeroProps) {
  const heroRef   = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const cellsRef  = useRef<HTMLDivElement[]>([]);
  const colsRef   = useRef(0);
  const rowsRef   = useRef(0);

  // ── Controllable state (hydrated from localStorage if saved) ────
  const STORAGE_KEY = "ascii_hero_config";
  const saved = typeof window !== "undefined"
    ? (() => { try { return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}") } catch { return {} } })()
    : {};

  const [cellW,    setCellW]    = useState<number>(saved.cellW    ?? 22);
  const [cellH,    setCellH]    = useState<number>(saved.cellH    ?? 26);
  const [innerR,   setInnerR]   = useState<number>(saved.innerR   ?? 30);
  const [fontSize, setFontSize] = useState<number>(saved.fontSize ?? 14);
  const [opacity,  setOpacity]  = useState<number>(saved.opacity  ?? 0.3);

  // Refs mirror state so callbacks never go stale
  const cellWRef    = useRef(cellW);
  const cellHRef    = useRef(cellH);
  const innerRRef   = useRef(innerR);
  const fontSizeRef = useRef(fontSize);
  const opacityRef  = useRef(opacity);

  useEffect(() => { cellWRef.current    = cellW;    }, [cellW]);
  useEffect(() => { cellHRef.current    = cellH;    }, [cellH]);
  useEffect(() => { innerRRef.current   = innerR;   }, [innerR]);
  useEffect(() => { fontSizeRef.current = fontSize; }, [fontSize]);
  useEffect(() => { opacityRef.current  = opacity;  }, [opacity]);

  // ── Build grid ─────────────────────────────────────────────────
  const build = useCallback(() => {
    const hero   = heroRef.current;
    const canvas = canvasRef.current;
    if (!hero || !canvas) return;

    const cw = cellWRef.current;
    const ch = cellHRef.current;
    const fs = fontSizeRef.current;

    const zoneH = hero.offsetHeight * ZONE_HEIGHT;
    const cols  = Math.ceil(hero.offsetWidth / cw);
    const rows  = Math.ceil(zoneH / ch);
    colsRef.current = cols;
    rowsRef.current = rows;

    canvas.style.gridTemplateColumns = `repeat(${cols}, ${cw}px)`;
    canvas.style.gridTemplateRows    = `repeat(${rows}, ${ch}px)`;
    canvas.innerHTML  = "";
    cellsRef.current  = [];

    for (let i = 0; i < cols * rows; i++) {
      const el = document.createElement("div");
      el.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${fs}px;
        color: #9F94D2;
        opacity: 0;
        transition: opacity 0.06s ease;
        pointer-events: none;
        font-family: monospace;
      `;
      el.textContent = CALM_CHARS[Math.floor(Math.random() * CALM_CHARS.length)];
      canvas.appendChild(el);
      cellsRef.current.push(el);
    }
  }, []);

  // ── Update on mouse move ───────────────────────────────────────
  const update = useCallback((cx: number, cy: number) => {
    const hero = heroRef.current;
    if (!hero) return;

    const rect       = hero.getBoundingClientRect();
    const mx         = cx - rect.left;
    const my         = cy - rect.top;
    const cols       = colsRef.current;
    const rows       = rowsRef.current;
    const cw         = hero.offsetWidth / cols;
    const ch         = (hero.offsetHeight * ZONE_HEIGHT) / rows;
    const cells      = cellsRef.current;
    const ir         = innerRRef.current;
    const maxOpacity = opacityRef.current;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const px   = (c + 0.5) * cw;
        const py   = (r + 0.5) * ch;
        const dist = Math.sqrt((px - mx) ** 2 + (py - my) ** 2);
        const idx  = r * cols + c;
        const el   = cells[idx];
        if (!el) continue;

        if (dist < OUTER_R) {
          const t = 1 - smoothstep(ir, OUTER_R, dist);
          el.style.opacity = String(t * maxOpacity);
          const variationRate = 1 - smoothstep(0, OUTER_R * 0.6, dist);
          if (Math.random() < 0.04 + variationRate * 0.55) {
            el.textContent = pickChar(variationRate);
          }
        } else {
          el.style.opacity = "0";
        }
      }
    }
  }, []);

  const clearAll = useCallback(() => {
    cellsRef.current.forEach(el => (el.style.opacity = "0"));
  }, []);

  // Rebuild when layout-affecting vars change (skip double-call on mount
  // by tracking first render)
  const mountedRef = useRef(false);
  useEffect(() => {
    if (!mountedRef.current) { mountedRef.current = true; return; }
    build();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cellW, cellH, fontSize]);

  // Initial build + resize
  useEffect(() => {
    build();
    window.addEventListener("resize", build);
    return () => window.removeEventListener("resize", build);
  }, [build]);

  // Global mouse tracking
  useEffect(() => {
    const onMove  = (e: MouseEvent) => update(e.clientX, e.clientY);
    const onLeave = () => clearAll();
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [update, clearAll]);

  // Ambient flicker — random cells pulse at very low opacity (calm, institutional)
  useEffect(() => {
    const pending: ReturnType<typeof setTimeout>[] = []
    const ticker = setInterval(() => {
      const cells = cellsRef.current
      if (!cells.length) return
      // ~1.5 % of grid at a time
      const count = Math.max(1, Math.floor(cells.length * 0.015))
      for (let i = 0; i < count; i++) {
        const cell = cells[Math.floor(Math.random() * cells.length)]
        if (!cell) continue
        cell.style.opacity = (Math.random() * 0.05 + 0.02).toFixed(3)
        cell.textContent   = pickChar(0.15)
        const t = setTimeout(
          () => { if (cell) cell.style.opacity = "0" },
          Math.random() * 2000 + 600
        )
        pending.push(t)
      }
    }, 120)
    return () => { clearInterval(ticker); pending.forEach(clearTimeout) }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    update(e.touches[0].clientX, e.touches[0].clientY);
  }, [update]);

  // Convert hex bgColor → rgb string for gradients
  const hex = bgColor.replace("#", "");
  const rr  = parseInt(hex.slice(0, 2), 16);
  const gg  = parseInt(hex.slice(2, 4), 16);
  const bb  = parseInt(hex.slice(4, 6), 16);
  const rgb = `${rr},${gg},${bb}`;

  const [minimized, setMinimized] = useState(false);
  const [saved2, setSaved2] = useState(false);

  const saveConfig = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ cellW, cellH, innerR, fontSize, opacity }));
      setSaved2(true);
      setTimeout(() => setSaved2(false), 1500);
    } catch {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cellW, cellH, innerR, fontSize, opacity]);

  // ── Slider config ──────────────────────────────────────────────
  const SLIDERS = [
    { label: "Cell W",    abbr: "C.W",  value: cellW,    set: setCellW,    min: 8,  max: 60,  step: 1,    fmt: (v: number) => `${v}px`     },
    { label: "Cell H",    abbr: "C.H",  value: cellH,    set: setCellH,    min: 8,  max: 60,  step: 1,    fmt: (v: number) => `${v}px`     },
    { label: "Inner R",   abbr: "I.R",  value: innerR,   set: setInnerR,   min: 0,  max: 200, step: 1,    fmt: (v: number) => `${v}`       },
    { label: "Font Size", abbr: "F.Sz", value: fontSize, set: setFontSize, min: 6,  max: 32,  step: 1,    fmt: (v: number) => `${v}px`     },
    { label: "Opacity",   abbr: "Opa",  value: opacity,  set: setOpacity,  min: 0,  max: 1,   step: 0.01, fmt: (v: number) => v.toFixed(2) },
  ] as const;

  return (
    <div
      ref={heroRef}
      className={className}
      style={{ position: "relative", overflow: "hidden" }}
      onTouchMove={handleTouchMove}
      onTouchEnd={clearAll}
    >
      {/* ASCII grid zone */}
      <div
        ref={canvasRef}
        style={{
          display: "grid",
          width: "100%",
          height: `${ZONE_HEIGHT * 100}%`,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          userSelect: "none",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Top fade — 10% of container */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "10%",
          background: `linear-gradient(to bottom, rgba(${rgb},1) 0%, rgba(${rgb},0) 100%)`,
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* Bottom fade — sits at the bottom edge of the ASCII zone */}
      <div
        style={{
          position: "absolute",
          top: `calc(${ZONE_HEIGHT * 100}% - 10% + 20px)`,
          left: 0, right: 0,
          height: "10%",
          background: `linear-gradient(to bottom, rgba(${rgb},0) 0%, rgba(${rgb},1) 100%)`,
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* Hero content */}
      <div style={{ position: "relative", zIndex: 3 }}>
        {children}
      </div>

      {/* ── Floating debug controls ──────────────────────────────── */}
      {showControls && (
        <div
          style={{
            position: "fixed",
            bottom: 24,
            left: 24,
            zIndex: 9999,
            width: 200,
            background: "rgba(7,8,15,0.88)",
            border: "1px solid rgba(159,148,210,0.18)",
            borderRadius: 10,
            padding: minimized ? "8px 10px" : "8px 10px 12px",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            fontFamily: "monospace",
            userSelect: "none",
            transition: "padding 0.15s ease",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span
                style={{
                  display: "inline-block",
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "#9f94d2",
                  boxShadow: "0 0 5px #9f94d2",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: 9,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(178,169,219,0.6)",
                }}
              >
                ASCII
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {/* Save button */}
              <button
                onClick={saveConfig}
                style={{
                  background: "none",
                  border: "none",
                  color: saved2 ? "#9f94d2" : "rgba(178,169,219,0.4)",
                  cursor: "pointer",
                  fontSize: 10,
                  lineHeight: 1,
                  padding: 0,
                  transition: "color 0.2s",
                }}
                aria-label="Save settings"
                title="Save settings"
              >
                {saved2 ? "✓" : "⬇"}
              </button>
              {/* Minimize button */}
              <button
                onClick={() => setMinimized(m => !m)}
                style={{
                  background: "none",
                  border: "none",
                  color: "rgba(178,169,219,0.5)",
                  cursor: "pointer",
                  fontSize: 13,
                  lineHeight: 1,
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                }}
                aria-label={minimized ? "Expand controls" : "Minimize controls"}
              >
                {minimized ? "+" : "−"}
              </button>
            </div>
          </div>

          {/* Sliders */}
          {!minimized && (
            <div style={{ marginTop: 10 }}>
              {SLIDERS.map(({ label, abbr, value, set, min, max, step, fmt }) => (
                <div key={label} style={{ marginBottom: 8 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      marginBottom: 3,
                    }}
                  >
                    <span style={{ fontSize: 9, color: "rgba(178,169,219,0.6)" }}>
                      {label}
                    </span>
                    <span
                      style={{
                        fontSize: 9,
                        color: "#e0dcf5",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {fmt(value)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={e => (set as (v: number) => void)(Number(e.target.value))}
                    style={{
                      width: "100%",
                      accentColor: "#9f94d2",
                      cursor: "pointer",
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
