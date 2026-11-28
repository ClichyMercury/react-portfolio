import { motion } from "framer-motion";
import { Nfc, ArrowUpRight } from "lucide-react";
import { useLocale } from "@/i18n";

const SITE = "https://kawaida.gsdot.dev";
const SIGNAL = "#E85D04";

const KawaidaSection = () => {
  const { pick } = useLocale();

  return (
    <section id="kawaida" className="px-6 py-16 relative">
      <motion.a
        href={SITE}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative z-10 max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center gap-6 p-6 sm:p-8 rounded-xl panel hud-corners transition-colors duration-300"
        style={{ background: "var(--bg-card)" }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        data-cursor={pick({ fr: "visiter", en: "visit" })}
      >
        <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl" style={{ background: `${SIGNAL}1A`, color: SIGNAL }}>
          <Nfc className="h-7 w-7" />
        </span>
        <div className="flex-1">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] mb-2" style={{ color: SIGNAL }}>
            {pick({ fr: "// réalisation", en: "// built by me" })}
          </p>
          <p className="text-2xl sm:text-3xl font-semibold tracking-tight leading-tight">
            Kawaida<span style={{ color: SIGNAL }}>.</span>{" "}
            <span style={{ color: "var(--fg-muted)" }}>
              {pick({
                fr: "Fidélité, avis Google et quiz pour les restaurants d'Abidjan, d'un tap sur le téléphone.",
                en: "Loyalty cards, Google reviews and quizzes for Abidjan restaurants, in one phone tap.",
              })}
            </span>
          </p>
        </div>
        <span
          className="flex items-center gap-2 self-start sm:self-auto px-5 py-2.5 rounded font-mono text-[11px] uppercase tracking-[0.15em] text-white transition-transform duration-300 group-hover:translate-x-1"
          style={{ background: SIGNAL }}
        >
          {pick({ fr: "découvrir", en: "discover" })}<ArrowUpRight className="h-4 w-4" />
        </span>
      </motion.a>
    </section>
  );
};

export default KawaidaSection;
