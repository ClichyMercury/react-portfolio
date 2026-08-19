import { useEffect, useRef } from "react";

interface StarSkill {
  name: string;
  icon: string;
  category: string;
}

interface Node {
  skill: StarSkill;
  ax: number;
  ay: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  phase: number;
}

const CATEGORY_TINT: Record<string, string> = {
  languages: "#00E5FF",
  frameworks: "#7DF9FF",
  tools: "#4A90D9",
};

const TechConstellation = ({ skills }: { skills: StarSkill[] }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let nodes: Node[] = [];
    let edges: [number, number][] = [];
    const images: Record<string, HTMLImageElement> = {};
    const mouse = { x: -9999, y: -9999 };
    let hovered: Node | null = null;
    let dragged: Node | null = null;
    let raf = 0;

    const layout = () => {
      const rect = container.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cols = Math.ceil(Math.sqrt(skills.length * (W / Math.max(H, 1))));
      const rows = Math.ceil(skills.length / cols);
      const cw = W / cols;
      const ch = H / rows;

      nodes = skills.map((skill, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const jx = (Math.sin(i * 12.9898) * 0.5 + 0.5 - 0.5) * cw * 0.55;
        const jy = (Math.sin(i * 78.233) * 0.5 + 0.5 - 0.5) * ch * 0.55;
        const ax = cw * (col + 0.5) + jx;
        const ay = ch * (row + 0.5) + jy;
        const existing = nodes[i];
        return {
          skill,
          ax,
          ay,
          x: existing ? existing.x : ax,
          y: existing ? existing.y : ay,
          vx: 0,
          vy: 0,
          r: W < 640 ? 4 : 5,
          phase: i * 1.7,
        };
      });

      edges = [];
      for (let i = 0; i < nodes.length; i++) {
        const dists = nodes
          .map((n, j) => ({ j, d: (n.ax - nodes[i].ax) ** 2 + (n.ay - nodes[i].ay) ** 2 }))
          .filter((e) => e.j !== i)
          .sort((a, b) => a.d - b.d)
          .slice(0, 2);
        for (const { j } of dists) {
          if (!edges.some(([a, b]) => (a === i && b === j) || (a === j && b === i))) {
            edges.push([i, j]);
          }
        }
      }
    };

    layout();

    skills.forEach((s) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = s.icon;
      img.onload = () => { images[s.name] = img; };
    });

    const pointerPos = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const findNode = (x: number, y: number) =>
      nodes.find((n) => (n.x - x) ** 2 + (n.y - y) ** 2 < 28 ** 2) || null;

    const onPointerMove = (e: PointerEvent) => {
      const p = pointerPos(e);
      mouse.x = p.x;
      mouse.y = p.y;
      if (dragged) {
        dragged.x = p.x;
        dragged.y = p.y;
        dragged.vx = 0;
        dragged.vy = 0;
      } else {
        hovered = findNode(p.x, p.y);
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      const p = pointerPos(e);
      dragged = findNode(p.x, p.y);
      if (dragged) canvas.setPointerCapture(e.pointerId);
    };

    const onPointerUp = () => {
      if (dragged) {
        dragged.vx = (Math.random() - 0.5) * 2;
        dragged.vy = (Math.random() - 0.5) * 2;
      }
      dragged = null;
    };

    const onPointerLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
      hovered = null;
    };

    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointerleave", onPointerLeave);

    const ro = new ResizeObserver(() => layout());
    ro.observe(container);

    let t = 0;
    const draw = () => {
      t += 0.016;
      ctx.clearRect(0, 0, W, H);

      for (const n of nodes) {
        if (n === dragged) continue;
        const driftX = Math.sin(t * 0.6 + n.phase) * 0.15;
        const driftY = Math.cos(t * 0.45 + n.phase) * 0.15;
        n.vx += (n.ax - n.x) * 0.002 + driftX * 0.02;
        n.vy += (n.ay - n.y) * 0.002 + driftY * 0.02;
        n.vx *= 0.96;
        n.vy *= 0.96;
        n.x += n.vx;
        n.y += n.vy;
      }

      for (const [a, b] of edges) {
        const na = nodes[a];
        const nb = nodes[b];
        const isHot = hovered && (nodes.indexOf(hovered) === a || nodes.indexOf(hovered) === b);
        ctx.beginPath();
        ctx.moveTo(na.x, na.y);
        ctx.lineTo(nb.x, nb.y);
        ctx.strokeStyle = isHot ? "rgba(0,229,255,0.5)" : "rgba(0,229,255,0.08)";
        ctx.lineWidth = isHot ? 1.2 : 0.7;
        ctx.stroke();
      }

      for (const n of nodes) {
        const isHot = n === hovered || n === dragged;
        const tint = CATEGORY_TINT[n.skill.category] || "#00E5FF";

        if (isHot) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, 22, 0, Math.PI * 2);
          const grad = ctx.createRadialGradient(n.x, n.y, 4, n.x, n.y, 24);
          grad.addColorStop(0, "rgba(0,229,255,0.25)");
          grad.addColorStop(1, "rgba(0,229,255,0)");
          ctx.fillStyle = grad;
          ctx.fill();
        }

        const img = images[n.skill.name];
        if (img) {
          const size = isHot ? 30 : 22;
          ctx.save();
          ctx.globalAlpha = isHot ? 1 : 0.85;
          ctx.drawImage(img, n.x - size / 2, n.y - size / 2, size, size);
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          ctx.fillStyle = tint;
          ctx.fill();
        }

        ctx.font = `${isHot ? "500 11px" : "400 9px"} 'JetBrains Mono', monospace`;
        ctx.textAlign = "center";
        ctx.fillStyle = isHot ? "#E6EDF3" : "rgba(148,160,173,0.55)";
        ctx.fillText(n.skill.name, n.x, n.y + (isHot ? 30 : 24));
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [skills]);

  return (
    <div ref={containerRef} className="relative w-full h-[65vh] min-h-[420px]" data-cursor="drag">
      <canvas ref={canvasRef} className="absolute inset-0 touch-none" />
      <div className="absolute bottom-3 right-4 font-mono text-[10px] uppercase tracking-[0.2em] pointer-events-none" style={{ color: "var(--fg-faint)" }}>
        [ drag the stars ]
      </div>
    </div>
  );
};

export default TechConstellation;
