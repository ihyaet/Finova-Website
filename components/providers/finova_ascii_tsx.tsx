import { useState, useRef, useCallback } from "react";

const G7: Record<string, string[]> = {
  F: ["11111","10000","10000","11110","10000","10000","10000"],
  I: ["1","1","1","1","1","1","1"],
  N: ["10001","10001","11001","10101","10011","10001","10001"],
  O: ["01110","10001","10001","10001","10001","10001","01110"],
  V: ["10001","10001","10001","10001","01010","01010","00100"],
  A: ["00100","01010","01010","10001","11111","10001","10001"],
};

const WORD = ["F","I","N","O","V","A"];
const FILL = "===";
const SC = 2;
const GAP = 2;
const ITH = 1;

function buildSegments() {
  const numLines = 7 * SC;
  const segs: string[][] = WORD.map(() => Array(numLines).fill(""));
  for (let r = 0; r < 7; r++) {
    for (let ci = 0; ci < WORD.length; ci++) {
      const ch = WORD[ci];
      let seg = ch === "I"
        ? FILL.repeat(ITH)
        : G7[ch][r].split("").map(b => b === "1" ? FILL.repeat(SC) : " ".repeat(FILL.length * SC)).join("");
      seg += " ".repeat(GAP);
      for (let s = 0; s < SC; s++) segs[ci][r * SC + s] = seg;
    }
  }
  return { segs, numLines };
}

const { segs, numLines } = buildSegments();

function AsciiBlock({ color }: { color: string }) {
  return (
    <div style={{ fontFamily: "'Courier New', monospace", fontSize: 'inherit', lineHeight: 1.25, whiteSpace: "pre", color }}>
      {Array.from({ length: numLines }, (_, li) => (
        <div key={li} style={{ display: "flex", whiteSpace: "pre" }}>
          {WORD.map((_, ci) => (
            <span key={ci} style={{ whiteSpace: "pre" }}>{segs[ci][li]}</span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function FinovaAscii({ className }: { className?: string }) {
  const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setMouse({ x: e.clientX - r.left, y: e.clientY - r.top });
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setMouse(null)}
      className={className}
      style={{ position: "relative", display: "inline-block", userSelect: "none", cursor: "none", lineHeight: 0 }}
    >
      {/* spacer to size the container */}
      <AsciiBlock color="transparent" />

      {/* default: 50% opacity */}
      {!mouse && (
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <AsciiBlock color="rgba(190,176,249,0.5)" />
        </div>
      )}

      {/* hover: radial reveal 50% → 0% */}
      {mouse && (
        <div style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          WebkitMaskImage: `radial-gradient(circle 200px at ${mouse.x}px ${mouse.y}px, black 0%, transparent 100%)`,
          maskImage: `radial-gradient(circle 200px at ${mouse.x}px ${mouse.y}px, black 0%, transparent 100%)`,
        }}>
          <AsciiBlock color="rgba(190,176,249,0.5)" />
        </div>
      )}
    </div>
  );
}
