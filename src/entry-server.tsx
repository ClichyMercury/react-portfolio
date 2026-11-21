import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import Home from "./components/home";
import CvPage from "./components/CvPage";
import ServicePage from "./components/ServicePage";
import { LocaleProvider, type Locale } from "./i18n";
import { ROUTES, type RouteKey } from "./i18n/routes";
import { pageMeta } from "./i18n/meta";
import { SERVICES, type ServiceKey } from "./content/services";

export { ROUTES, pageMeta, SERVICES };

export function render(key: RouteKey, locale: Locale) {
  const page = key === "home" ? <Home /> : key === "cv" ? <CvPage /> : <ServicePage service={key as ServiceKey} />;
  return renderToString(
    <StaticRouter location={ROUTES[key][locale]}>
      <LocaleProvider locale={locale}>{page}</LocaleProvider>
    </StaticRouter>
  );
}
