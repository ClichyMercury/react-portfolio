import { useEffect, useRef } from "react";

interface Star {
  x: number; y: number;
  vx: number; vy: number;
  size: number; opacity: number;
  color: string;
  twinkleSpeed: number;
  twinkleOffset: number;
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    let w = window.innerWidth, h = window.innerHeight;
    const starCount = Math.min(120, Math.floor((w * h) / 10000));

    const resize = () => {
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + "px"; canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const colors = [
      "255,255,255",      // white
      "215,251,97",       // accent green
      "139,92,246",       // purple
      "56,189,248",       // cyan
      "236,72,153",       // pink
    ];

    const stars: Star[] = Array.from({ length: starCount }, () => {
      const isColored = Math.random() < 0.15;
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        size: Math.random() * 2.5 + 0.3,
        opacity: Math.random() * 0.6 + 0.1,
        color: isColored ? colors[1 + Math.floor(Math.random() * 4)] : colors[0],
        twinkleSpeed: 2 + Math.random() * 4,
        twinkleOffset: Math.random() * Math.PI * 2,
      };
    });

    const onMouse = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };

    let raf: number;
    let time = 0;

    const animate = () => {
      time += 0.016;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        // Mouse interaction
        const dx = s.x - mouseRef.current.x;
        const dy = s.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (150 - dist) / 150;
          s.vx += (dx / dist) * force * 0.15;
          s.vy += (dy / dist) * force * 0.15;
        }
        s.vx *= 0.985;
        s.vy *= 0.985;
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0) s.x = w;
        if (s.x > w) s.x = 0;
        if (s.y < 0) s.y = h;
        if (s.y > h) s.y = 0;

        // Twinkle
        const twinkle = 0.5 + 0.5 * Math.sin(time * s.twinkleSpeed + s.twinkleOffset);
        const alpha = s.opacity * (0.4 + 0.6 * twinkle);

        // Draw star with glow
        if (s.size > 1.5) {
          // Glow for bigger stars
          const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size * 4);
          grad.addColorStop(0, `rgba(${s.color}, ${alpha * 0.4})`);
          grad.addColorStop(1, `rgba(${s.color}, 0)`);
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size * 4, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }

        // Core
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.color}, ${alpha})`;
        ctx.fill();

        // Connect nearby stars
        for (let j = i + 1; j < stars.length; j++) {
          const s2 = stars[j];
          const cd = Math.sqrt((s.x - s2.x) ** 2 + (s.y - s2.y) ** 2);
          if (cd < 140) {
            const lineAlpha = (1 - cd / 140) * 0.06;
            ctx.beginPath();
            ctx.moveTo(s.x, s.y);
            ctx.lineTo(s2.x, s2.y);
            ctx.strokeStyle = `rgba(215,251,97, ${lineAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Occasional shooting star
      if (Math.random() < 0.003) {
        const sx = Math.random() * w;
        const sy = Math.random() * h * 0.5;
        const len = 60 + Math.random() * 80;
        const angle = Math.PI * 0.15 + Math.random() * 0.2;
        const grad = ctx.createLinearGradient(sx, sy, sx + Math.cos(angle) * len, sy + Math.sin(angle) * len);
        grad.addColorStop(0, "rgba(255,255,255,0.6)");
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(sx + Math.cos(angle) * len, sy + Math.sin(angle) * len);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse);
    raf = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" style={{ opacity: 0.7 }} />;
};

export default ParticleBackground;
