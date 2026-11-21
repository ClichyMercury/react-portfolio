import { useState, useCallback, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/home";
import LoadingScreen from "./components/LoadingScreen";
import CvPage from "./components/CvPage";
import ServicePage from "./components/ServicePage";
import { AnimatePresence } from "framer-motion";
import { LocaleProvider } from "@/i18n";
import { ROUTES, SERVICE_KEYS, localeFromPath, routeKeyFromPath } from "@/i18n/routes";
import { pageMeta } from "@/i18n/meta";
import type { ServiceKey } from "@/content/services";

function Portfolio() {
  const [loading, setLoading] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
    const htmlLoader = document.getElementById("loading-screen");
    if (htmlLoader) htmlLoader.remove();
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>
      {!loading && <Home />}
    </>
  );
}

function App() {
  const { pathname } = useLocation();
  const locale = localeFromPath(pathname);

  useEffect(() => {
    const key = routeKeyFromPath(pathname);
    if (key) document.title = pageMeta(key, locale).title;
  }, [pathname, locale]);

  return (
    <LocaleProvider locale={locale}>
      <Routes>
        <Route path={ROUTES.cv.fr} element={<CvPage />} />
        <Route path={ROUTES.cv.en} element={<CvPage />} />
        {SERVICE_KEYS.flatMap((k) =>
          (["fr", "en"] as const).map((l) => (
            <Route key={`${k}-${l}`} path={ROUTES[k][l]} element={<ServicePage service={k as ServiceKey} />} />
          ))
        )}
        <Route path="*" element={<Portfolio />} />
      </Routes>
    </LocaleProvider>
  );
}

export default App;
