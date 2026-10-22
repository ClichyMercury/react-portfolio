import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import telemetry from "@/data/telemetry.json";

type Ring = "core" | "active" | "dormant";

const RING_STYLE: Record<Ring, { label: string; color: string }> = {
  core: { label: "core", color: "var(--accent)" },
  active: { label: "active", color: "var(--fg-muted)" },
  dormant: { label: "dormant", color: "var(--fg-faint)" },
};

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const formatMonth = (key: string) => {
  const [y, m] = key.split("-");
  return `${MONTH_NAMES[Number(m) - 1]} ${y}`;
};

const monthsBetween = (from: string, to: string) => {
  const [fy, fm] = from.split("-").map(Number);
  const [ty, tm] = to.split("-").map(Number);
  return (ty - fy) * 12 + (tm - fm);
};

const Telemetry = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [showTable, setShowTable] = useState(false);
  const { months, stacks, totals, generatedAt } = telemetry;

  const max = Math.max(...months.map((m) => m.commits), 1);
  const latest = months[months.length - 1].month;
  const busiest = months.reduce((a, b) => (b.commits > a.commits ? b : a), months[0]);
  const activeMonths = months.filter((m) => m.commits > 0).length;

  const rings = useMemo(
    () =>
      stacks.map((s) => {
        const share = s.commits / totals.commits;
        const ring: Ring = share >= 0.07 && monthsBetween(s.last, latest) <= 1 ? "core" : monthsBetween(s.last, latest) <= 3 ? "active" : "dormant";
        return { ...s, share, ring };
      }),
    [stacks, totals.commits, latest]
  );
  const stackMax = Math.max(...rings.map((s) => s.commits), 1);

  return (
    <motion.div
      className="mt-24"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center gap-3 mb-6 font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: "var(--fg-faint)" }}>
        <span style={{ color: "var(--accent)" }}>◉</span> telemetry // git_activity
        <div className="flex-1 tentacle-line" />
        <span>synced {generatedAt}</span>
      </div>

      <div className="grid lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3 panel rounded-xl p-5 sm:p-6 hud-corners">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {[
              { label: "commits", value: totals.commits.toLocaleString("en-US") },
              { label: "repositories", value: String(totals.repos) },
              { label: "active months", value: `${activeMonths}/${months.length}` },
              { label: "peak month", value: formatMonth(busiest.month) },
            ].map((k) => (
              <div key={k.label}>
                <span className="block text-xl sm:text-2xl font-semibold leading-tight">{k.value}</span>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em]" style={{ color: "var(--fg-faint)" }}>{k.label}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--fg-muted)" }}>commits per month · last {months.length} months</span>
            <button
              onClick={() => setShowTable((v) => !v)}
              className="font-mono text-[10px] uppercase tracking-[0.15em] transition-colors hover:text-[var(--accent)]"
              style={{ color: "var(--fg-faint)" }}
              aria-expanded={showTable}
            >
              {showTable ? "chart" : "table"}
            </button>
          </div>

          {showTable ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-x-4 gap-y-1 font-mono text-[11px]">
              {months.map((m) => (
                <div key={m.month} className="flex justify-between gap-2" style={{ color: "var(--fg-muted)" }}>
                  <span style={{ color: "var(--fg-faint)" }}>{m.month}</span>
                  <span>{m.commits}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="relative">
              <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: "var(--border-medium)" }} />
              <div className="relative flex items-end gap-[2px] h-44" onMouseLeave={() => setHovered(null)}>
                {months.map((m, i) => (
                  <div
                    key={m.month}
                    className="relative flex-1 h-full flex items-end"
                    onMouseEnter={() => setHovered(i)}
                    onFocus={() => setHovered(i)}
                    tabIndex={0}
                    aria-label={`${formatMonth(m.month)}: ${m.commits} commits`}
                  >
                    <motion.div
                      className="w-full rounded-t"
                      style={{
                        background: "var(--accent)",
                        opacity: hovered === null || hovered === i ? 0.9 : 0.35,
                        minHeight: m.commits ? 2 : 0,
                      }}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${(m.commits / max) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.025, ease: [0.19, 1, 0.22, 1] }}
                    />
                    {hovered === i && (
                      <div
                        className={`absolute bottom-full mb-2 z-10 px-2.5 py-1.5 rounded whitespace-nowrap font-mono text-[10px] pointer-events-none ${
                          i < months.length / 3 ? "left-0" : i > (months.length * 2) / 3 ? "right-0" : "left-1/2 -translate-x-1/2"
                        }`}
                        style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-medium)", color: "var(--fg)" }}
                      >
                        {formatMonth(m.month)} · <span style={{ color: "var(--accent)" }}>{m.commits}</span> commits
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex gap-[2px] mt-2">
                {months.map((m, i) => (
                  <span key={m.month} className="flex-1 text-center font-mono text-[9px]" style={{ color: "var(--fg-faint)" }}>
                    {i % 6 === 0 || i === months.length - 1 ? formatMonth(m.month).replace(" 20", " '") : ""}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-2 panel rounded-xl p-5 sm:p-6 hud-corners">
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--fg-muted)" }}>stack radar · commits</span>
            <div className="flex gap-3">
              {(Object.keys(RING_STYLE) as Ring[]).map((r) => (
                <span key={r} className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.15em]" style={{ color: "var(--fg-faint)" }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: RING_STYLE[r].color }} />{RING_STYLE[r].label}
                </span>
              ))}
            </div>
          </div>
          <ul className="space-y-2.5">
            {rings.map((s, i) => (
              <li key={s.name} className="grid grid-cols-[88px_1fr_auto] items-center gap-3" title={`${s.name}: ${s.commits} commits in ${s.repos} repos, last commit ${formatMonth(s.last)}`}>
                <span className="flex items-center gap-2 font-mono text-[11px] truncate" style={{ color: "var(--fg)" }}>
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: RING_STYLE[s.ring].color }} />
                  {s.name}
                </span>
                <span className="relative h-1.5 rounded-full overflow-hidden" style={{ background: "var(--bg-elevated)" }}>
                  <motion.span
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ background: RING_STYLE[s.ring].color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(s.commits / stackMax) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1 + i * 0.05 }}
                  />
                </span>
                <span className="font-mono text-[10px] text-right" style={{ color: "var(--fg-muted)" }}>
                  {s.commits} <span style={{ color: "var(--fg-faint)" }}>· {s.repos}r</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-5 font-mono text-[9px] leading-relaxed" style={{ color: "var(--fg-faint)" }}>
            core: ≥7% of commits and used this month · active: used in the last 3 months · dormant: older. Derived from git history, no code read.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Telemetry;
