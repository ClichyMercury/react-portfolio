import { useState, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import LoadingScreen from "./components/LoadingScreen";
import CvPage from "./components/CvPage";
import { AnimatePresence } from "framer-motion";

function Portfolio() {
  const [loading, setLoading] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
    // Remove the HTML loading screen entirely
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
  return (
    <Routes>
      <Route path="/cv" element={<CvPage />} />
      <Route path="*" element={<Portfolio />} />
    </Routes>
  );
}

export default App;
