import { useState, useCallback } from "react";
import Home from "./components/home";
import LoadingScreen from "./components/LoadingScreen";
import { AnimatePresence } from "framer-motion";

function App() {
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

export default App;
