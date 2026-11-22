(function () {
  var script = document.currentScript;
  var current = (script && script.getAttribute("data-current")) || "v4";
  var VERSIONS = [
    { id: "v4", href: "/", date: { fr: "nov. 2026", en: "Nov 2026" }, name: { fr: "Actuelle · bilingue", en: "Current · bilingual" }, color: "#00E5FF" },
    { id: "v3", href: "/v3/", date: { fr: "août 2026", en: "Aug 2026" }, name: { fr: "Mission Control", en: "Mission Control" }, color: "#7C5CFF" },
    { id: "v2", href: "/v2/", date: { fr: "mars 2026", en: "Mar 2026" }, name: { fr: "Galaxie · pieuvre", en: "Galaxy · octopus" }, color: "#C04CFD" },
    { id: "v1", href: "/v1/", date: { fr: "juil. 2025", en: "Jul 2025" }, name: { fr: "Le premier portfolio", en: "The first portfolio" }, color: "#F5A524" },
  ];

  var lang = "fr";
  try {
    lang = localStorage.getItem("gs-lang") || "";
  } catch (e) {}
  if (lang !== "fr" && lang !== "en") lang = (navigator.language || "fr").toLowerCase().indexOf("fr") === 0 ? "fr" : "en";
  if (current === "v4") lang = (document.documentElement.lang || lang).indexOf("en") === 0 ? "en" : "fr";
  var T = {
    title: { fr: "Versions du site", en: "Site versions" },
    archive: { fr: "archive", en: "archive" },
    back: { fr: "Revenir à la version actuelle", en: "Back to the current version" },
  };
  var t = function (o) { return o[lang]; };
  var cur = VERSIONS.filter(function (v) { return v.id === current; })[0] || VERSIONS[0];

  var host = document.createElement("div");
  host.setAttribute("data-version-switcher", "");
  host.style.cssText = "position:fixed;left:16px;bottom:16px;z-index:2147483000;";
  var root = host.attachShadow({ mode: "open" });

  var rows = VERSIONS.map(function (v) {
    var active = v.id === current;
    return (
      '<a href="' + v.href + '" class="row' + (active ? " active" : "") + '"' + (active ? ' aria-current="page"' : "") + ">" +
      '<span class="dot" style="background:' + v.color + '"></span>' +
      '<span class="id">' + v.id.toUpperCase() + "</span>" +
      '<span class="meta"><span class="name">' + t(v.name) + '</span><span class="date">' + t(v.date) + "</span></span>" +
      "</a>"
    );
  }).join("");

  root.innerHTML =
    "<style>" +
    ":host{all:initial}" +
    "*{box-sizing:border-box;font-family:ui-monospace,SFMono-Regular,Menlo,monospace}" +
    ".badge{display:flex;align-items:center;gap:8px;padding:7px 11px;border-radius:999px;background:rgba(10,12,18,.88);color:#E6E8EE;border:1px solid rgba(255,255,255,.14);font-size:11px;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);box-shadow:0 6px 24px rgba(0,0,0,.35);transition:border-color .2s}" +
    ".badge:hover,.badge[aria-expanded=true]{border-color:" + cur.color + "}" +
    ".badge .dot{width:7px;height:7px;border-radius:50%;background:" + cur.color + ";box-shadow:0 0 8px " + cur.color + "}" +
    ".badge .tag{opacity:.55}" +
    ".panel{position:absolute;left:0;bottom:calc(100% + 10px);width:250px;padding:8px;border-radius:14px;background:rgba(10,12,18,.96);border:1px solid rgba(255,255,255,.12);box-shadow:0 16px 48px rgba(0,0,0,.5);opacity:0;transform:translateY(6px);pointer-events:none;transition:opacity .18s,transform .18s}" +
    ".open .panel{opacity:1;transform:none;pointer-events:auto}" +
    ".head{padding:6px 8px 8px;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#8A90A0}" +
    ".row{display:flex;align-items:center;gap:10px;padding:9px 8px;border-radius:9px;color:#E6E8EE;text-decoration:none;transition:background .15s}" +
    ".row:hover{background:rgba(255,255,255,.06)}" +
    ".row.active{background:rgba(255,255,255,.09)}" +
    ".row .dot{width:8px;height:8px;border-radius:50%;flex:none}" +
    ".row .id{font-size:12px;font-weight:700;width:22px}" +
    ".meta{display:flex;flex-direction:column;gap:2px;min-width:0}" +
    ".name{font-size:12px;font-family:ui-sans-serif,system-ui,-apple-system,sans-serif;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}" +
    ".date{font-size:10px;color:#8A90A0}" +
    ".back{display:block;margin-top:6px;padding:9px 8px;border-top:1px solid rgba(255,255,255,.08);font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:#00E5FF;text-decoration:none}" +
    "@media print{.wrap{display:none}}" +
    "</style>" +
    '<div class="wrap">' +
    '<div class="panel" role="menu"><div class="head">' + t(T.title) + "</div>" + rows +
    (current !== "v4" ? '<a class="back" href="/">← ' + t(T.back) + "</a>" : "") +
    "</div>" +
    '<button class="badge" type="button" aria-haspopup="true" aria-expanded="false"><span class="dot"></span>' + cur.id + (current !== "v4" ? ' <span class="tag">' + t(T.archive) + "</span>" : "") + "</button>" +
    "</div>";

  var wrap = root.querySelector(".wrap");
  var badge = root.querySelector(".badge");
  var setOpen = function (open) {
    wrap.classList.toggle("open", open);
    badge.setAttribute("aria-expanded", String(open));
  };
  badge.addEventListener("click", function (e) {
    e.stopPropagation();
    setOpen(!wrap.classList.contains("open"));
  });
  document.addEventListener("click", function (e) {
    if (!host.contains(e.target)) setOpen(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setOpen(false);
  });

  var mount = function () { document.body.appendChild(host); };
  if (document.body) mount();
  else document.addEventListener("DOMContentLoaded", mount);
})();
