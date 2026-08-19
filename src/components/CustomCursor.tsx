import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [label, setLabel] = useState("");
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const followerPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if ("ontouchstart" in window) {
      setIsTouchDevice(true);
      document.body.style.cursor = "auto";
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
      }
      const target = e.target as HTMLElement;
      const cursorEl = target.closest("[data-cursor]") as HTMLElement | null;
      const interactive = target.closest("a, button, [role='button'], input, textarea");
      setLabel(cursorEl?.dataset.cursor || "");
      setIsHovering(Boolean(interactive || cursorEl));
    };

    let raf: number;
    const animate = () => {
      followerPos.current.x += (pos.current.x - followerPos.current.x) * 0.14;
      followerPos.current.y += (pos.current.y - followerPos.current.y) * 0.14;
      const f = followerRef.current;
      if (f) {
        const size = isHovering ? 44 : 30;
        f.style.transform = `translate(${followerPos.current.x - size / 2}px, ${followerPos.current.y - size / 2}px)`;
        f.style.width = size + "px";
        f.style.height = size + "px";
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate(${followerPos.current.x + 20}px, ${followerPos.current.y + 20}px)`;
      }
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(raf);
    };
  }, [isHovering]);

  if (isTouchDevice) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          width: 6, height: 6, borderRadius: "50%",
          background: "var(--accent)",
          opacity: isHovering ? 0 : 1,
          transition: "opacity 0.2s",
        }}
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          width: 30, height: 30,
          border: `1px solid ${isHovering ? "var(--accent)" : "rgba(0,229,255,0.4)"}`,
          transition: "width 0.3s ease, height 0.3s ease, border-color 0.3s ease, transform 0.05s linear",
          boxShadow: isHovering ? "0 0 16px rgba(0,229,255,0.25)" : "none",
        }}
      />
      <div
        ref={labelRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none font-mono text-[9px] uppercase tracking-[0.25em]"
        style={{
          color: "var(--accent)",
          opacity: label ? 1 : 0,
          transition: "opacity 0.2s",
        }}
      >
        [ {label} ]
      </div>
    </>
  );
};

export default CustomCursor;
