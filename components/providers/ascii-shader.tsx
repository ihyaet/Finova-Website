"use client"

import { useRef, useEffect, useCallback } from "react"

// ── SVG Shape ────────────────────────────────────────────
const SVG_PATH = `M16.9375 24V0H19.4601V24H16.9375Z M22.4985 24V0H26.2824V1.26316H27.5437V3.78947H28.805V6.31579H30.0663V8.84211H31.3276V11.3684H32.5889V13.8947H33.8502V16.4211H35.1115V18.9474H32.5889V16.4211H31.3276V13.8947H30.0663V11.3684H28.805V8.84211H27.5437V6.31579H26.2824V3.78947H25.0211V24H22.4985ZM35.1115 21.4737V18.9474H36.3729V0H38.8955V24H36.3729V21.4737H35.1115Z M45.2277 21.4737V18.9474H43.9664V16.4211H42.7051V7.57895H43.9664V5.05263H45.2277V2.52632H46.489V1.26316H49.0116V0H56.5794V1.26316H59.102V2.52632H60.3633V5.05263H61.6247V7.57895H62.886V16.4211H61.6247V18.9474H60.3633V21.4737H59.102V22.7368H56.5794V24H49.0116V22.7368H46.489V21.4737H45.2277ZM59.102 7.57895V5.05263H57.8407V3.78947H56.5794V2.52632H49.0116V3.78947H47.7503V5.05263H46.489V7.57895H45.2277V16.4211H46.489V18.9474H47.7503V20.2105H49.0116V21.4737H56.5794V20.2105H57.8407V18.9474H59.102V16.4211H60.3633V7.57895H59.102Z M69.7101 21.4737V18.9474H68.4488V15.1579H67.1875V11.3684H65.9262V7.57895H64.6649V3.78947H63.4035V0H65.9262V3.78947H67.1875V7.57895H68.4488V11.3684H69.7101V15.1579H70.9714V18.9474H73.494V15.1579H74.7553V11.3684H76.0166V7.57895H77.2779V3.78947H78.5392V0H81.0618V3.78947H79.8005V7.57895H78.5392V11.3684H77.2779V15.1579H76.0166V18.9474H74.7553V21.4737H73.494V24H70.9714V21.4737H69.7101Z M91.6937 12.6316V8.84211H90.4324V5.05263H87.9098V8.84211H86.6485V12.6316H85.3872V13.8947H92.955V12.6316H91.6937ZM80.342 24V20.2105H81.6033V16.4211H82.8646V12.6316H84.1259V8.84211H85.3872V5.05263H86.6485V2.52632H87.9098V0H90.4324V2.52632H91.6937V5.05263H92.955V8.84211H94.2163V12.6316H95.4776V16.4211H96.7389V20.2105H98.0002V24H95.4776V20.2105H94.2163V16.4211H84.1259V20.2105H82.8646V24H80.342Z M0 0V24H2.52261V2.52632H15.1357V0H0Z M15 10H3.5V12.5263H15V10Z`
const SVG_WIDTH = 98
const SVG_HEIGHT = 24

// ── Config ──────────────────────────────────────────────
interface AsciiConfig {
  cellSize: number
  speed: number
  waveFreq: number
  waveIntensity: number
  mouseRadius: number
  flickerRate: number
  noiseAmount: number
  scanlines: number
  charSet: string
}

const DEFAULT_CONFIG: AsciiConfig = {
  "cellSize": 9,
  "speed": 1,
  "waveFreq": 3,
  "waveIntensity": 0.5,
  "mouseRadius": 155,
  "flickerRate": 1,
  "noiseAmount": 1,
  "scanlines": 0,
  "charSet": "minimal"
}

// ── SVG Utilities ───────────────────────────────────────

function fillSVGPath(
  svgPath: string,
  density: number,
  svgWidth: number,
  svgHeight: number,
): Array<{ x: number; y: number; edgeDist: number }> {
  const SCALE = Math.max(1, Math.round(density * 8))
  const cw = Math.ceil(svgWidth * SCALE)
  const ch = Math.ceil(svgHeight * SCALE)
  const off = document.createElement("canvas")
  off.width = cw
  off.height = ch
  const ctx = off.getContext("2d")!
  ctx.scale(SCALE, SCALE)
  ctx.fillStyle = "#fff"
  ctx.fill(new Path2D(svgPath))
  const { data } = ctx.getImageData(0, 0, cw, ch)
  const filled = new Uint8Array(cw * ch)
  for (let i = 0; i < cw * ch; i++) filled[i] = data[i * 4 + 3] > 64 ? 1 : 0
  const points: Array<{ x: number; y: number; edgeDist: number }> = []
  for (let py = 0; py < ch; py++) {
    for (let px = 0; px < cw; px++) {
      if (!filled[py * cw + px]) continue
      const isEdge =
        px === 0 || px === cw - 1 || py === 0 || py === ch - 1 ||
        !filled[(py - 1) * cw + px] || !filled[(py + 1) * cw + px] ||
        !filled[py * cw + (px - 1)] || !filled[py * cw + (px + 1)]
      points.push({ x: px / SCALE, y: py / SCALE, edgeDist: isEdge ? 0 : 3 })
    }
  }
  return points
}

function getLogoTransform(
  w: number,
  h: number,
  svgScale: number,
  svgWidth: number,
  svgHeight: number,
) {
  const base = Math.min(w / svgWidth, h / svgHeight)
  const scale = base * svgScale
  return {
    scale,
    offsetX: (w - svgWidth * scale) / 2,
    offsetY: (h - svgHeight * scale) / 2,
  }
}

// ── ASCII Shader ──────────────────────────────────────
const CHAR_RAMPS = {
  blocks: " \u2591\u2592\u2593\u2588",
  code: " ._-~:;=!*#$@",
  minimal: " .-+X#",
}
type RampKey = keyof typeof CHAR_RAMPS

interface GridCell {
  col: number
  row: number
  x: number
  y: number
  density: number
  edgeFactor: number
  tornUntil: number
}

interface FlyingChar {
  x: number; y: number
  vx: number; vy: number
  char: string
  r: number; g: number; b: number
  life: number
  maxLife: number
  size: number
  rotation: number
  rotSpeed: number
  cellIdx: number
  mass: number
  dragCoeff: number
  tumblePhase: number
  tumbleFreq: number
  scaleY: number
  flipSpeed: number
}

const MAX_FLYING = 250

export default function AsciiShader({ config, svgScale = 1, theme = "dark", svgPath = SVG_PATH, svgWidth = SVG_WIDTH, svgHeight = SVG_HEIGHT, colorFn, className }: { config: AsciiConfig; svgScale?: number; theme?: "light" | "dark"; svgPath?: string; svgWidth?: number; svgHeight?: number; colorFn?: ((x: number, y: number, w: number, h: number) => string) | null; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const configRef = useRef(config)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const prevMouseRef = useRef({ x: -9999, y: -9999, time: 0 })
  const velRef = useRef({ vx: 0, vy: 0, speed: 0 })
  const gridRef = useRef<GridCell[]>([])
  const gridLookupRef = useRef<Map<number, number>>(new Map())
  const flyingRef = useRef<FlyingChar[]>([])
  const lastFrameRef = useRef(0)
  const dimsRef = useRef({ w: 0, h: 0 })
  const themeRef = useRef(theme)
  const colorFnRef = useRef(colorFn)
  const startTimeRef = useRef<number | null>(null)

  configRef.current = config
  themeRef.current = theme
  colorFnRef.current = colorFn

  const packKey = (col: number, row: number) => col * 100000 + row

  const init = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dpr = window.devicePixelRatio || 1
    const parent = canvas.parentElement
    const w = parent ? parent.clientWidth : window.innerWidth
    const h = parent ? parent.clientHeight : window.innerHeight
    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    dimsRef.current = { w, h }

    const points = fillSVGPath(svgPath, 1.2, svgWidth, svgHeight)
    const { scale, offsetX, offsetY } = getLogoTransform(w, h, svgScale, svgWidth, svgHeight)

    const charSize = configRef.current.cellSize
    const rowH = charSize * 1.6
    const halfChar = charSize / 2

    const tempMap = new Map<number, { count: number; edgeSum: number }>()
    for (const p of points) {
      const tx = p.x * scale + offsetX
      const ty = p.y * scale + offsetY
      const col = Math.floor(tx / charSize)
      const row = Math.floor(ty / rowH)
      const key = packKey(col, row)
      const existing = tempMap.get(key)
      if (existing) {
        existing.count++
        existing.edgeSum += p.edgeDist
      } else {
        tempMap.set(key, { count: 1, edgeSum: p.edgeDist })
      }
    }

    let maxDensity = 0
    for (const v of tempMap.values()) {
      if (v.count > maxDensity) maxDensity = v.count
    }

    const cells: GridCell[] = []
    const lookup = new Map<number, number>()
    for (const [key, v] of tempMap) {
      const row = key % 100000
      const col = (key - row) / 100000
      const idx = cells.length
      lookup.set(key, idx)
      cells.push({
        col, row,
        x: col * charSize + halfChar,
        y: row * rowH + charSize * 0.8,
        density: v.count / maxDensity,
        edgeFactor: (v.edgeSum / v.count) / 10,
        tornUntil: 0,
      })
    }

    gridRef.current = cells
    gridLookupRef.current = lookup
    flyingRef.current = []
  }, [svgScale, svgPath, svgWidth, svgHeight])

  useEffect(() => {
    init()
    const parent = canvasRef.current?.parentElement
    let observer: ResizeObserver | null = null
    if (parent) {
      observer = new ResizeObserver(init)
      observer.observe(parent)
    } else {
      window.addEventListener("resize", init)
    }
    return () => {
      observer?.disconnect()
      window.removeEventListener("resize", init)
    }
  }, [init])

  useEffect(() => { init() }, [config.cellSize, init])

  useEffect(() => {
    const updatePointer = (x: number, y: number) => {
      const now = performance.now()
      const prev = prevMouseRef.current
      const dt = (now - prev.time) / 1000
      if (dt > 0.001 && dt < 0.15) {
        const rx = (x - prev.x) / dt
        const ry = (y - prev.y) / dt
        const v = velRef.current
        v.vx = v.vx * 0.55 + rx * 0.45
        v.vy = v.vy * 0.55 + ry * 0.45
        v.speed = Math.sqrt(v.vx * v.vx + v.vy * v.vy)
      }
      prevMouseRef.current = { x, y, time: now }
      mouseRef.current = { x, y }
    }
    const onMove = (e: MouseEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect()
      const x = rect ? e.clientX - rect.left : e.clientX
      const y = rect ? e.clientY - rect.top : e.clientY
      updatePointer(x, y)
    }
    const onTouch = (e: TouchEvent) => {
      if ((e.target as Element)?.closest?.("[data-controls-panel]")) return
      const touch = e.touches[0]
      if (touch) {
        const rect = canvasRef.current?.getBoundingClientRect()
        const x = rect ? touch.clientX - rect.left : touch.clientX
        const y = rect ? touch.clientY - rect.top : touch.clientY
        updatePointer(x, y)
      }
    }
    window.addEventListener("mousemove", onMove)
    window.addEventListener("touchstart", onTouch, { passive: true })
    window.addEventListener("touchmove", onTouch, { passive: true })
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("touchstart", onTouch)
      window.removeEventListener("touchmove", onTouch)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    // Compute column/row ranges for intro normalization
    let minCol = Infinity, maxCol = -Infinity, minRow = Infinity, maxRow = -Infinity
    for (const c of gridRef.current) {
      if (c.col < minCol) minCol = c.col
      if (c.col > maxCol) maxCol = c.col
      if (c.row < minRow) minRow = c.row
      if (c.row > maxRow) maxRow = c.row
    }
    const colRange = Math.max(1, maxCol - minCol)
    const rowRange = Math.max(1, maxRow - minRow)

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) startTimeRef.current = timestamp
      const introElapsed = (timestamp - startTimeRef.current) * 0.001
      const introDuration = 2.0

      const dt = Math.min((timestamp - (lastFrameRef.current || timestamp)) / 1000, 0.05)
      lastFrameRef.current = timestamp

      const cfg = configRef.current
      const dpr = window.devicePixelRatio || 1
      const { w: width, h: height } = dimsRef.current
      const cells = gridRef.current
      const mouse = mouseRef.current
      const vel = velRef.current
      const flying = flyingRef.current
      const time = timestamp * 0.001 * cfg.speed
      const charSize = cfg.cellSize
      const ramp = CHAR_RAMPS[(cfg.charSet as RampKey)] || CHAR_RAMPS.minimal
      const rampLen = ramp.length
      const mouseRad = cfg.mouseRadius
      const mouseRadSq = mouseRad * mouseRad

      ctx.save()
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const isLight = themeRef.current === "light"
      ctx.clearRect(0, 0, width, height)

      if (cells.length === 0) {
        ctx.restore()
        rafRef.current = requestAnimationFrame(animate)
        return
      }

      const speedThresh = 1600
      if (vel.speed > speedThresh && flying.length < MAX_FLYING) {
        const spawnBudget = Math.min(Math.floor((vel.speed - speedThresh) / 400), 6, MAX_FLYING - flying.length)
        const dirX = vel.vx / vel.speed
        const dirY = vel.vy / vel.speed
        const now = timestamp

        let spawned = 0
        const startIdx = Math.floor(Math.random() * cells.length)
        for (let j = 0; j < cells.length && spawned < spawnBudget; j++) {
          const i = (startIdx + j) % cells.length
          const c = cells[i]
          if (c.tornUntil > now) continue
          const dx = c.x - mouse.x
          const dy = c.y - mouse.y
          const dSq = dx * dx + dy * dy
          if (dSq > mouseRadSq) continue

          const distNorm = Math.sqrt(dSq) / mouseRad
          if (Math.random() > (1 - distNorm) * 0.7) continue

          const wP = Math.sin(
            (c.x / width) * cfg.waveFreq * 6.28 +
            (c.y / height) * cfg.waveFreq * 3.14 - time * 2
          ) * 0.5 + 0.5
          let br = c.density * 0.5 + c.edgeFactor * 0.3 + wP * cfg.waveIntensity * 0.3
          if (br > 1) br = 1
          const ci = Math.min(Math.floor(br * (rampLen - 1)), rampLen - 1)
          const ch = ramp[ci]
          if (ch === " ") continue

          const st = cfg.charSet as RampKey
          let cr: number, cg: number, cb: number
          if (st === "blocks") {
            cr = (20 * br + 30 * wP) | 0
            cg = (80 * br + 100 * wP) | 0
            cb = (180 + 75 * br) | 0
          } else if (st === "code") {
            cr = (140 + 115 * br) | 0
            cg = (40 * br * wP) | 0
            cb = (60 + 68 * br) | 0
          } else {
            const base = (120 + 135 * br) | 0
            cr = (base * 0.85 + 30 * wP) | 0
            cg = (base * 0.9 + 20 * wP) | 0
            cb = base
          }

          const mass = 0.5 + Math.random() * 1.5
          const baseAngle = Math.atan2(dirY, dirX)
          const spreadAngle = (1.2 / mass) * (Math.random() - 0.5)
          const angle = baseAngle + spreadAngle
          const speedMul = (0.06 + Math.random() * 0.16) / Math.sqrt(mass)
          const mag = vel.speed * speedMul
          const perpSign = Math.random() > 0.5 ? 1 : -1
          const perpAngle = baseAngle + perpSign * 1.5708
          const perpMag = vel.speed * (0.01 + Math.random() * 0.04) / mass

          const lifespan = 1.0 + Math.random() * 1.2 + mass * 0.3

          c.tornUntil = now + lifespan * 1000

          flying.push({
            x: c.x, y: c.y,
            vx: Math.cos(angle) * mag + Math.cos(perpAngle) * perpMag,
            vy: Math.sin(angle) * mag + Math.sin(perpAngle) * perpMag - 30 * (1 / mass),
            char: ch,
            r: cr, g: cg, b: cb,
            life: lifespan,
            maxLife: lifespan,
            size: charSize,
            rotation: (Math.random() - 0.5) * 0.3,
            rotSpeed: (Math.random() - 0.5) * (8 / mass),
            cellIdx: i,
            mass,
            dragCoeff: 0.001 + Math.random() * 0.002,
            tumblePhase: Math.random() * 6.28,
            tumbleFreq: 2 + Math.random() * 4,
            scaleY: 1,
            flipSpeed: (Math.random() - 0.5) * (6 / mass),
          })
          spawned++
        }
      }

      const baseGravity = 280

      ctx.font = `${charSize}px monospace`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      let writeIdx = 0
      for (let i = 0; i < flying.length; i++) {
        const f = flying[i]
        const elapsed = f.maxLife - f.life

        f.vy += baseGravity * f.mass * 0.7 * dt

        const speed = Math.sqrt(f.vx * f.vx + f.vy * f.vy)
        if (speed > 1) {
          const dragMag = f.dragCoeff * speed * speed / f.mass
          f.vx -= (f.vx / speed) * dragMag * dt
          f.vy -= (f.vy / speed) * dragMag * dt
        }

        const turbX = Math.sin(elapsed * f.tumbleFreq + f.tumblePhase) * 15 / f.mass
        const turbY = Math.cos(elapsed * f.tumbleFreq * 0.7 + f.tumblePhase * 1.3) * 8 / f.mass
        f.vx += turbX * dt
        f.vy += turbY * dt

        f.x += f.vx * dt
        f.y += f.vy * dt

        f.rotation += f.rotSpeed * dt
        f.rotSpeed *= (1 - 1.2 * dt)

        f.scaleY = Math.cos(elapsed * f.flipSpeed + f.tumblePhase)

        f.life -= dt

        if (f.life <= 0 || f.x < -200 || f.x > width + 200 || f.y > height + 200) {
          continue
        }

        const cosR = Math.cos(f.rotation)
        const sinR = Math.sin(f.rotation)
        const sy = f.scaleY
        ctx.setTransform(
          dpr * cosR, dpr * sinR * sy,
          -dpr * sinR, dpr * cosR * sy,
          dpr * f.x, dpr * f.y
        )

  const lifeRatio = f.life / f.maxLife
  const alpha = lifeRatio < 0.35 ? (lifeRatio / 0.35) * (lifeRatio / 0.35) : 1
  const cfnFlying = colorFnRef.current
  if (cfnFlying) {
    ctx.fillStyle = `rgba(${cfnFlying(f.x, f.y, width, height)},${alpha})`
  } else {
    ctx.fillStyle = `rgba(${f.r},${f.g},${f.b},${alpha})`
  }
  ctx.fillText(f.char, 0, 0)

        if (writeIdx !== i) flying[writeIdx] = f
        writeIdx++
      }
      flying.length = writeIdx

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.font = `${charSize}px monospace`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      const now = timestamp
      const hackBootChars = "01{}[]<>/\\|!@#$%&*:;=+-_~"

      for (let i = 0; i < cells.length; i++) {
        const c = cells[i]
        if (c.tornUntil > now) continue

        // Intro: cascade type-in from top-left to bottom-right
        const normCol = (c.col - minCol) / colRange
        const normRow = (c.row - minRow) / rowRange
        // Diagonal sweep: top-left arrives first
        const cellDelay = (normCol * 0.5 + normRow * 0.5) * 1.2
        const cellElapsed = Math.max(0, introElapsed - cellDelay)
        const cellProgress = introDuration > 0 ? Math.min(cellElapsed / (introDuration * 0.5), 1) : 1
        if (cellProgress <= 0) continue

        // Character cycling: random chars before settling
        const isSettled = cellProgress >= 1
        const cyclePhase = isSettled ? -1 : Math.floor(cellElapsed * 20 + c.col * 7 + c.row * 13)

        const dx = c.x - mouse.x
        const dy = c.y - mouse.y
        const dSq = dx * dx + dy * dy
        const mouseInf = dSq < mouseRadSq ? Math.max(0, 1 - Math.sqrt(dSq) / mouseRad) : 0

        const wavePhase = Math.sin(
          (c.x / width) * cfg.waveFreq * 6.28 +
          (c.y / height) * cfg.waveFreq * 3.14 - time * 2
        ) * 0.5 + 0.5

        let brightness = c.density * 0.5 + c.edgeFactor * 0.3 + wavePhase * cfg.waveIntensity * 0.3
        if (mouseInf > 0) brightness = Math.min(1, brightness + mouseInf * 0.5)

        const flickerSeed = Math.sin(c.col * 127.1 + c.row * 311.7 + ((time * cfg.flickerRate) | 0) * 43.37) * 43758.5453
        const flicker = flickerSeed - Math.floor(flickerSeed)
        if (flicker < cfg.noiseAmount * 0.15) brightness = flicker * 2.5

        const charIdx = Math.min((brightness * (rampLen - 1)) | 0, rampLen - 1)
        const char = ramp[charIdx]
        if (char === " ") continue

        let r: number, g: number, b: number, alpha: number
        const st = cfg.charSet as RampKey

        if (st === "blocks") {
          if (isLight) {
            r = (10 + 30 * brightness) | 0
            g = (30 + 60 * brightness) | 0
            b = (100 + 80 * brightness) | 0
          } else {
            r = (20 * brightness + 30 * wavePhase) | 0
            g = (80 * brightness + 100 * wavePhase) | 0
            b = (180 + 75 * brightness) | 0
          }
          alpha = 0.4 + brightness * 0.6
          if (brightness > 0.7) {
            const t = (brightness - 0.7) / 0.3
            if (isLight) {
              r = (r + (20 - r) * t) | 0
              g = (g + (50 - g) * t) | 0
              b = (b + (160 - b) * t) | 0
            } else {
              r = (r + (120 - r) * t) | 0
              g = (g + (200 - g) * t) | 0
              b = (b + (255 - b) * t) | 0
            }
          }
          if (mouseInf > 0.1) {
            if (isLight) {
              r = (r * (1 - mouseInf * 0.5)) | 0
              g = (g * (1 - mouseInf * 0.3)) | 0
              b = (b + (180 - b) * mouseInf * 0.6) | 0
            } else {
              r = (r + (180 - r) * mouseInf * 0.4) | 0
              g = (g + (240 - g) * mouseInf * 0.6) | 0
              b = (b + (255 - b) * mouseInf) | 0
            }
          }
        } else if (st === "code") {
          if (isLight) {
            r = (120 + 40 * brightness) | 0
            g = (10 + 20 * brightness * wavePhase) | 0
            b = (40 + 40 * brightness) | 0
          } else {
            r = (140 + 115 * brightness) | 0
            g = (40 * brightness * wavePhase) | 0
            b = (60 + 68 * brightness) | 0
          }
          alpha = 0.35 + brightness * 0.65
          if (brightness > 0.7) {
            const t = (brightness - 0.7) / 0.3
            if (isLight) {
              r = (r + (160 - r) * t) | 0
              g = (g + (20 - g) * t) | 0
              b = (b + (80 - b) * t) | 0
            } else {
              r = (r + (255 - r) * t) | 0
              g = (g + (60 - g) * t) | 0
              b = (b + (160 - b) * t) | 0
            }
          }
          if (mouseInf > 0.1) {
            if (isLight) {
              r = (r + (180 - r) * mouseInf * 0.6) | 0
              g = (g * (1 - mouseInf * 0.3)) | 0
              b = (b + (100 - b) * mouseInf * 0.4) | 0
            } else {
              r = (r + (255 - r) * mouseInf) | 0
              g = (g + (100 - g) * mouseInf * 0.3) | 0
              b = (b + (200 - b) * mouseInf * 0.5) | 0
            }
          }
        } else {
          if (isLight) {
            const base = (30 + 80 * brightness) | 0
            r = (base * 0.85 + 15 * wavePhase) | 0
            g = (base * 0.9 + 10 * wavePhase) | 0
            b = base
          } else {
            const base = (120 + 135 * brightness) | 0
            r = (base * 0.85 + 30 * wavePhase) | 0
            g = (base * 0.9 + 20 * wavePhase) | 0
            b = base
          }
          alpha = 0.3 + brightness * 0.7
          if (mouseInf > 0.1) {
            if (isLight) {
              r = (r * (1 - mouseInf * 0.4)) | 0
              g = (g * (1 - mouseInf * 0.4)) | 0
              b = (b * (1 - mouseInf * 0.3)) | 0
            } else {
              r = (r + (255 - r) * mouseInf) | 0
              g = (g + (255 - g) * mouseInf) | 0
              b = (b + (255 - b) * mouseInf * 0.8) | 0
            }
          }
        }

        let displayChar = char
        // During intro cycling, show random boot characters
        if (!isSettled && cyclePhase >= 0) {
          displayChar = hackBootChars[Math.abs(cyclePhase) % hackBootChars.length]
          // Fade in alpha during intro
          alpha *= cellProgress
        } else if (mouseInf > 0.3 && flicker < 0.3) {
          displayChar = hackBootChars[(c.col * 7 + c.row * 13 + ((time * 12) | 0)) % hackBootChars.length]
        }

        const cfn = colorFnRef.current
        if (cfn) {
          const tint = cfn(c.x, c.y, width, height)
          const [tr, tg, tb] = tint.split(",").map(Number)
          // Blend: use the tint color but preserve the original brightness/alpha
          const lum = (r * 0.299 + g * 0.587 + b * 0.114) / 255
          r = Math.round(tr * lum)
          g = Math.round(tg * lum)
          b = Math.round(tb * lum)
        }
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`
        ctx.fillText(displayChar, c.x, c.y)
      }

      if (cfg.scanlines > 0) {
        ctx.fillStyle = isLight ? `rgba(255,255,255,${cfg.scanlines * 0.5})` : `rgba(0,0,0,${cfg.scanlines * 0.5})`
        for (let sy = 0; sy < height; sy += 3) {
          ctx.fillRect(0, sy, width, 1)
        }
      }

      if (cfg.noiseAmount > 0.1) {
        const count = (cfg.noiseAmount * 40) | 0
        const hackChars = "01{}[]<>/\\|!@#$%&*:;=+-_~"
        const timeSlot = (time * 3) | 0
        ctx.font = `${charSize * 0.8}px monospace`
        const st = cfg.charSet as RampKey
        const nc = isLight
          ? (st === "blocks" ? "10,40,120" : st === "code" ? "140,0,60" : "60,65,75")
          : (st === "blocks" ? "40,120,255" : st === "code" ? "255,0,128" : "160,170,190")
        for (let s = 0; s < count; s++) {
          const seed = Math.sin(s * 127.1 + timeSlot * 311.7) * 43758.5453
          const r2 = seed - Math.floor(seed)
          const seed2 = Math.sin(s * 269.5 + timeSlot * 183.3) * 43758.5453
          const r3 = seed2 - Math.floor(seed2)
          const a = 0.03 + r2 * 0.06
          ctx.fillStyle = `rgba(${nc},${a})`
          ctx.fillText(hackChars[(s * 7 + timeSlot) % hackChars.length], width * 0.2 + r2 * width * 0.6, height * 0.15 + r3 * height * 0.7)
        }
      }

      ctx.restore()
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return <canvas ref={canvasRef} className={className ?? "fixed inset-0 w-full h-full"} style={{ background: "transparent", touchAction: "none" }} />
}
