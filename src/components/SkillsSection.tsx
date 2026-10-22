import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import TechConstellation from "./fx/TechConstellation";
import TechMosaic from "./fx/TechMosaic";
import Counter from "./fx/Counter";
import SectionRail from "./fx/SectionRail";
import { PROJECT_COUNT } from "./ProjectsGrid";
import Telemetry from "./Telemetry";

interface Skill {
  name: string;
  icon: string;
  category: "languages" | "frameworks" | "tools";
  url: string;
}

const SkillsSection = ({ skills = defaultSkills }: { skills?: Skill[] }) => {
  const [view, setView] = useState<"constellation" | "mosaic">("constellation");

  return (
    <section id="skills" className="min-h-screen py-32 lg:py-44 px-6 relative">
      <SectionRail index="02" label="arsenal" motif="bars" bars={[95, 88, 70, 62, 78, 55, 40]} />
      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionHeader
          index="02"
          label="arsenal"
          title="Tech"
          titleHighlight="Constellation"
          description={
            view === "constellation"
              ? "Every star is a technology I've shipped with. Hover to trace the connections — grab one and throw it."
              : "Every tile is a technology I've shipped with. Click one to open its official site or documentation."
          }
        />

        <motion.div
          className="panel rounded-2xl hud-corners overflow-hidden mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: "1px solid var(--border-subtle)", background: "var(--bg-elevated)" }}>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] flex-shrink-0" style={{ color: "var(--accent)" }}>
              {view === "constellation" ? "star_map.render( )" : `grid.render( ${skills.length} )`}
            </span>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="hidden sm:flex items-center gap-4 font-mono text-[9px] uppercase tracking-[0.15em]" style={{ color: "var(--fg-faint)" }}>
                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full" style={{ background: "#00E5FF" }} />languages</span>
                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full" style={{ background: "#7DF9FF" }} />frameworks</span>
                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full" style={{ background: "#4A90D9" }} />tools</span>
              </div>
              <div className="flex items-center rounded-md overflow-hidden" style={{ border: "1px solid var(--border-medium)" }}>
                {(["constellation", "mosaic"] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setView(mode)}
                    aria-pressed={view === mode}
                    className="px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.15em] transition-colors"
                    style={{
                      background: view === mode ? "var(--accent)" : "transparent",
                      color: view === mode ? "var(--bg)" : "var(--fg-faint)",
                    }}
                  >
                    {mode === "constellation" ? "stars" : "grid"}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {view === "constellation" ? <TechConstellation skills={skills} /> : <TechMosaic skills={skills} />}
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { value: 6, suffix: "+", label: "Years of Experience" },
            { value: PROJECT_COUNT, suffix: "+", label: "Projects Completed" },
            { value: skills.length, suffix: "+", label: "Technologies Used" },
            { value: 100, suffix: "%", label: "Client Satisfaction" },
          ].map((s) => (
            <motion.div
              key={s.label}
              className="text-center py-8 rounded-xl panel tentacle-glow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Counter value={s.value} suffix={s.suffix} className="block text-3xl lg:text-5xl font-semibold mb-2" />
              <div className="font-mono text-[9px] uppercase tracking-[0.2em]" style={{ color: "var(--fg-faint)" }}>{s.label}</div>
            </motion.div>
          ))}
        </div>

        <Telemetry />
      </div>
    </section>
  );
};

const D = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";
const S = "https://cdn.simpleicons.org";
const FW = "7DF9FF";
const TL = "4A90D9";

const defaultSkills: Skill[] = [
  { name: "Dart", icon: `${D}/dart/dart-original.svg`, category: "languages", url: "https://dart.dev" },
  { name: "Java", icon: `${D}/java/java-original.svg`, category: "languages", url: "https://dev.java" },
  { name: "JavaScript", icon: `${D}/javascript/javascript-original.svg`, category: "languages", url: "https://developer.mozilla.org/docs/Web/JavaScript" },
  { name: "TypeScript", icon: `${D}/typescript/typescript-original.svg`, category: "languages", url: "https://www.typescriptlang.org" },
  { name: "Python", icon: `${D}/python/python-original.svg`, category: "languages", url: "https://www.python.org" },
  { name: "Kotlin", icon: `${D}/kotlin/kotlin-original.svg`, category: "languages", url: "https://kotlinlang.org" },
  { name: "Swift", icon: `${D}/swift/swift-original.svg`, category: "languages", url: "https://www.swift.org" },
  { name: "Rust", icon: `${D}/rust/rust-original.svg`, category: "languages", url: "https://www.rust-lang.org" },
  { name: "PHP", icon: `${D}/php/php-original.svg`, category: "languages", url: "https://www.php.net" },
  { name: "HTML/CSS", icon: `${D}/html5/html5-original.svg`, category: "languages", url: "https://developer.mozilla.org/docs/Web/HTML" },
  { name: "SvelteKit", icon: `${D}/svelte/svelte-original.svg`, category: "frameworks", url: "https://svelte.dev/docs/kit" },
  { name: "Svelte 5", icon: `${D}/svelte/svelte-original.svg`, category: "frameworks", url: "https://svelte.dev/docs/svelte/what-are-runes" },
  { name: "Flutter", icon: `${D}/flutter/flutter-original.svg`, category: "frameworks", url: "https://flutter.dev" },
  { name: "Flutter BLoC", icon: `${D}/flutter/flutter-original.svg`, category: "frameworks", url: "https://bloclibrary.dev" },
  { name: "Provider", icon: `${D}/flutter/flutter-original.svg`, category: "frameworks", url: "https://pub.dev/packages/provider" },
  { name: "Android Dev", icon: `${D}/android/android-original.svg`, category: "frameworks", url: "https://developer.android.com" },
  { name: "Laravel", icon: `${D}/laravel/laravel-original.svg`, category: "frameworks", url: "https://laravel.com" },
  { name: "Flask", icon: `${D}/flask/flask-original.svg`, category: "frameworks", url: "https://flask.palletsprojects.com" },
  { name: "Node.js", icon: `${D}/nodejs/nodejs-original.svg`, category: "frameworks", url: "https://nodejs.org" },
  { name: "React", icon: `${D}/react/react-original.svg`, category: "frameworks", url: "https://react.dev" },
  { name: "Next.js", icon: `${D}/nextjs/nextjs-original.svg`, category: "frameworks", url: "https://nextjs.org" },
  { name: "Tailwind CSS", icon: `${D}/tailwindcss/tailwindcss-original.svg`, category: "frameworks", url: "https://tailwindcss.com" },
  { name: "AdonisJS", icon: `${D}/adonisjs/adonisjs-original.svg`, category: "frameworks", url: "https://adonisjs.com" },
  { name: "Lucid ORM", icon: `${D}/adonisjs/adonisjs-original.svg`, category: "frameworks", url: "https://lucid.adonisjs.com" },
  { name: "Socket.IO", icon: `${D}/socketio/socketio-original.svg`, category: "frameworks", url: "https://socket.io" },
  { name: "NestJS", icon: `${D}/nestjs/nestjs-original.svg`, category: "frameworks", url: "https://nestjs.com" },
  { name: "Ktor", icon: `${D}/ktor/ktor-original.svg`, category: "frameworks", url: "https://ktor.io" },
  { name: "Riverpod", icon: `${D}/flutter/flutter-original.svg`, category: "frameworks", url: "https://riverpod.dev" },
  { name: "GetX", icon: `${S}/getx/${FW}`, category: "frameworks", url: "https://pub.dev/packages/get" },
  { name: "go_router", icon: `${D}/flutter/flutter-original.svg`, category: "frameworks", url: "https://pub.dev/packages/go_router" },
  { name: "Dio", icon: `${D}/dart/dart-original.svg`, category: "frameworks", url: "https://pub.dev/packages/dio" },
  { name: "Framer Motion", icon: `${D}/framermotion/framermotion-original.svg`, category: "frameworks", url: "https://motion.dev" },
  { name: "Vue 3", icon: `${D}/vuejs/vuejs-original.svg`, category: "frameworks", url: "https://vuejs.org" },
  { name: "Pinia", icon: `${S}/pinia/${FW}`, category: "frameworks", url: "https://pinia.vuejs.org" },
  { name: "Express", icon: `${D}/express/express-original.svg`, category: "frameworks", url: "https://expressjs.com" },
  { name: "Zustand", icon: `${D}/react/react-original.svg`, category: "frameworks", url: "https://zustand.docs.pmnd.rs" },
  { name: "TanStack Query", icon: `${S}/tanstack/${FW}`, category: "frameworks", url: "https://tanstack.com/query" },
  { name: "Chart.js", icon: `${D}/chartjs/chartjs-original.svg`, category: "frameworks", url: "https://www.chartjs.org" },
  { name: "Three.js", icon: `${D}/threejs/threejs-original.svg`, category: "frameworks", url: "https://threejs.org" },
  { name: "GSAP", icon: `${S}/greensock/${FW}`, category: "frameworks", url: "https://gsap.com" },
  { name: "Prisma", icon: `${D}/prisma/prisma-original.svg`, category: "frameworks", url: "https://www.prisma.io" },
  { name: "Radix UI", icon: `${S}/radixui/${FW}`, category: "frameworks", url: "https://www.radix-ui.com" },
  { name: "shadcn/ui", icon: `${S}/shadcnui/${FW}`, category: "frameworks", url: "https://ui.shadcn.com" },
  { name: "DaisyUI", icon: `${S}/daisyui/${FW}`, category: "frameworks", url: "https://daisyui.com" },
  { name: "Leaflet", icon: `${S}/leaflet/${FW}`, category: "frameworks", url: "https://leafletjs.com" },
  { name: "Zod", icon: `${S}/zod/${FW}`, category: "frameworks", url: "https://zod.dev" },
  { name: "Axios", icon: `${D}/axios/axios-plain.svg`, category: "frameworks", url: "https://axios-http.com" },
  { name: "Lottie", icon: `${S}/lottiefiles/${FW}`, category: "frameworks", url: "https://lottiefiles.com" },
  { name: "Firebase", icon: `${D}/firebase/firebase-original.svg`, category: "tools", url: "https://firebase.google.com" },
  { name: "Supabase", icon: `${D}/supabase/supabase-original.svg`, category: "tools", url: "https://supabase.com" },
  { name: "PostgreSQL", icon: `${D}/postgresql/postgresql-original.svg`, category: "tools", url: "https://www.postgresql.org" },
  { name: "Redis", icon: `${D}/redis/redis-original.svg`, category: "tools", url: "https://redis.io" },
  { name: "Vite", icon: `${D}/vitejs/vitejs-original.svg`, category: "tools", url: "https://vite.dev" },
  { name: "Vercel", icon: `${D}/vercel/vercel-original.svg`, category: "tools", url: "https://vercel.com" },
  { name: "Postman", icon: `${D}/postman/postman-original.svg`, category: "tools", url: "https://www.postman.com" },
  { name: "Figma", icon: `${D}/figma/figma-original.svg`, category: "tools", url: "https://www.figma.com" },
  { name: "Nginx", icon: `${D}/nginx/nginx-original.svg`, category: "tools", url: "https://nginx.org" },
  { name: "GitHub Actions", icon: `${D}/githubactions/githubactions-original.svg`, category: "tools", url: "https://github.com/features/actions" },
  { name: "Sanctum", icon: `${D}/laravel/laravel-original.svg`, category: "tools", url: "https://laravel.com/docs/sanctum" },
  { name: "Reverb", icon: `${D}/laravel/laravel-original.svg`, category: "tools", url: "https://laravel.com/docs/reverb" },
  { name: "JWT", icon: `${S}/jsonwebtokens/${TL}`, category: "tools", url: "https://jwt.io" },
  { name: "Swagger", icon: `${D}/swagger/swagger-original.svg`, category: "tools", url: "https://swagger.io" },
  { name: "MinIO", icon: `${S}/minio/${TL}`, category: "tools", url: "https://min.io" },
  { name: "Caddy", icon: `${S}/caddy/${TL}`, category: "tools", url: "https://caddyserver.com" },
  { name: "Metabase", icon: `${S}/metabase/${TL}`, category: "tools", url: "https://www.metabase.com" },
  { name: "Directus", icon: `${S}/directus/${TL}`, category: "tools", url: "https://directus.io" },
  { name: "Hive", icon: `${S}/hive/${TL}`, category: "tools", url: "https://pub.dev/packages/hive" },
  { name: "Vitest", icon: `${D}/vitest/vitest-original.svg`, category: "tools", url: "https://vitest.dev" },
  { name: "Playwright", icon: `${D}/playwright/playwright-original.svg`, category: "tools", url: "https://playwright.dev" },
  { name: "Jest", icon: `${D}/jest/jest-plain.svg`, category: "tools", url: "https://jestjs.io" },
  { name: "Husky", icon: `${D}/git/git-original.svg`, category: "tools", url: "https://typicode.github.io/husky" },
  { name: "SQLite", icon: `${D}/sqlite/sqlite-original.svg`, category: "tools", url: "https://www.sqlite.org" },
  { name: "Pusher", icon: `${S}/pusher/${TL}`, category: "tools", url: "https://pusher.com" },
  { name: "Cloudflare", icon: `${D}/cloudflare/cloudflare-original.svg`, category: "tools", url: "https://www.cloudflare.com" },
  { name: "Gradle", icon: `${D}/gradle/gradle-original.svg`, category: "tools", url: "https://gradle.org" },
  { name: "Xcode", icon: `${D}/xcode/xcode-original.svg`, category: "tools", url: "https://developer.apple.com/xcode" },
  { name: "Bash", icon: `${D}/bash/bash-original.svg`, category: "tools", url: "https://www.gnu.org/software/bash" },
  { name: "BullMQ", icon: `${D}/redis/redis-original.svg`, category: "tools", url: "https://bullmq.io" },
  { name: "FCM", icon: `${D}/firebase/firebase-plain.svg`, category: "tools", url: "https://firebase.google.com/docs/cloud-messaging" },
  { name: "npm", icon: `${D}/npm/npm-original-wordmark.svg`, category: "tools", url: "https://www.npmjs.com" },
  { name: "pnpm", icon: `${D}/pnpm/pnpm-original.svg`, category: "tools", url: "https://pnpm.io" },
  { name: "Deno", icon: `${D}/denojs/denojs-original.svg`, category: "tools", url: "https://deno.com" },
  { name: "Composer", icon: `${D}/composer/composer-original.svg`, category: "tools", url: "https://getcomposer.org" },
  { name: "pip", icon: `${D}/pypi/pypi-original.svg`, category: "tools", url: "https://pip.pypa.io" },
  { name: "Git", icon: `${D}/git/git-original.svg`, category: "tools", url: "https://git-scm.com" },
  { name: "GitHub", icon: `${D}/github/github-original.svg`, category: "tools", url: "https://github.com" },
  { name: "Android Studio", icon: `${D}/androidstudio/androidstudio-original.svg`, category: "tools", url: "https://developer.android.com/studio" },
  { name: "MySQL", icon: `${D}/mysql/mysql-original.svg`, category: "tools", url: "https://www.mysql.com" },
  { name: "PostHog", icon: `${S}/posthog/${TL}`, category: "tools", url: "https://posthog.com" },
  { name: "Search Console", icon: `${S}/googlesearchconsole/${TL}`, category: "tools", url: "https://search.google.com/search-console/about" },
  { name: "Clarity", icon: `${S}/googleanalytics/${TL}`, category: "tools", url: "https://clarity.microsoft.com" },
  { name: "AppsFlyer", icon: `${S}/googletagmanager/${TL}`, category: "tools", url: "https://www.appsflyer.com" },
  { name: "Amplitude", icon: `${S}/mixpanel/${TL}`, category: "tools", url: "https://amplitude.com" },
  { name: "Sentry", icon: `${D}/sentry/sentry-original.svg`, category: "tools", url: "https://sentry.io" },
  { name: "SigNoz", icon: `${S}/opentelemetry/${TL}`, category: "tools", url: "https://signoz.io" },
  { name: "Taskforce", icon: `${S}/grafana/${TL}`, category: "tools", url: "https://taskforce.sh" },
  { name: "Linux", icon: `${D}/linux/linux-original.svg`, category: "tools", url: "https://www.kernel.org" },
  { name: "Docker", icon: `${D}/docker/docker-original.svg`, category: "tools", url: "https://www.docker.com" },
  { name: "AWS", icon: `${D}/amazonwebservices/amazonwebservices-original-wordmark.svg`, category: "tools", url: "https://aws.amazon.com" },
  { name: "VSCode", icon: `${D}/vscode/vscode-original.svg`, category: "tools", url: "https://code.visualstudio.com" },
];

export const SKILLS = defaultSkills;

export default SkillsSection;
