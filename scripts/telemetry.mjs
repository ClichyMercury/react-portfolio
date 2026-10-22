import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const ROOTS = ["ReactVueAngular", "flutter_man", "svelte_man", "back end"].map((d) => join(homedir(), d));
const AUTHOR = "gaelelscientifico|ClichyMercury|GAEL SASSAN";
const MONTHS = 24;
const OUT = new URL("../src/data/telemetry.json", import.meta.url);

const readJson = (file) => {
  try {
    return JSON.parse(readFileSync(file, "utf8"));
  } catch {
    return {};
  }
};

const detectStacks = (dir) => {
  const stacks = new Set();
  if (existsSync(join(dir, "pubspec.yaml"))) stacks.add("Flutter");
  if (existsSync(join(dir, "composer.json"))) stacks.add("Laravel");
  if (existsSync(join(dir, "Cargo.toml"))) stacks.add("Rust");
  const pkg = readJson(join(dir, "package.json"));
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };
  const map = [
    ["@sveltejs/kit", "SvelteKit"],
    ["next", "Next.js"],
    ["@adonisjs/core", "AdonisJS"],
    ["@nestjs/core", "NestJS"],
    ["fastify", "Fastify"],
    ["vue", "Vue"],
    ["@angular/core", "Angular"],
  ];
  for (const [dep, name] of map) if (deps[dep]) stacks.add(name);
  if (deps.react && !deps.next) stacks.add("React");
  if (!stacks.has("Flutter") && (existsSync(join(dir, "build.gradle.kts")) || existsSync(join(dir, "app/build.gradle.kts")))) stacks.add("Kotlin");
  if (!stacks.size && existsSync(join(dir, "package.json"))) stacks.add("Node.js");
  return [...stacks];
};

const monthKeys = () => {
  const keys = [];
  const d = new Date();
  d.setDate(1);
  for (let i = MONTHS - 1; i >= 0; i--) {
    const m = new Date(d.getFullYear(), d.getMonth() - i, 1);
    keys.push(`${m.getFullYear()}-${String(m.getMonth() + 1).padStart(2, "0")}`);
  }
  return keys;
};

const keys = monthKeys();
const perMonth = Object.fromEntries(keys.map((k) => [k, 0]));
const perStack = {};
let repos = 0;
let commits = 0;

for (const root of ROOTS) {
  if (!existsSync(root)) continue;
  for (const name of readdirSync(root)) {
    const dir = join(root, name);
    if (!existsSync(join(dir, ".git"))) continue;
    let log = "";
    try {
      log = execFileSync(
        "git",
        ["-C", dir, "log", "--all", "--no-merges", "-i", "-E", `--author=${AUTHOR}`, `--since=${MONTHS} months ago`, "--format=%ad", "--date=format:%Y-%m"],
        { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }
      );
    } catch {
      continue;
    }
    const dates = log.split("\n").filter(Boolean);
    if (!dates.length) continue;
    repos++;
    commits += dates.length;
    for (const m of dates) if (m in perMonth) perMonth[m]++;
    const last = dates[0];
    for (const stack of detectStacks(dir)) {
      perStack[stack] ??= { commits: 0, repos: 0, last: "" };
      perStack[stack].commits += dates.length;
      perStack[stack].repos++;
      if (last > perStack[stack].last) perStack[stack].last = last;
    }
  }
}

const data = {
  generatedAt: new Date().toISOString().slice(0, 10),
  months: keys.map((k) => ({ month: k, commits: perMonth[k] })),
  stacks: Object.entries(perStack)
    .map(([name, s]) => ({ name, ...s }))
    .sort((a, b) => b.commits - a.commits),
  totals: { repos, commits },
};

mkdirSync(new URL("../src/data/", import.meta.url), { recursive: true });
writeFileSync(OUT, JSON.stringify(data, null, 2) + "\n");
console.log(`telemetry: ${repos} repos, ${commits} commits over ${MONTHS} months → src/data/telemetry.json`);
