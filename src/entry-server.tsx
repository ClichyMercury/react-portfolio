import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import Home from "./components/home";
import CvPage from "./components/CvPage";

export function render(url: string) {
  const page = url === "/cv" ? <CvPage /> : <Home />;
  return renderToString(<StaticRouter location={url}>{page}</StaticRouter>);
}
