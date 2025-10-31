import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import { Home } from "./pages/Home";
import { AnimatedPage } from "./components/AnimatedPage";
import { About } from "./pages/About";
import { Apps } from "./pages/Apps";
import { Navigation } from "./components/custom/navigation";
import { ProtectedRoutes } from "./components/protectedRoutes";
import { Login } from "./pages/Login";

function App() {
  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route
              path="/"
              element={
                <AnimatedPage>
                  <Home />
                </AnimatedPage>
              }
            />
            <Route
              path="/about"
              element={
                <AnimatedPage>
                  <About />
                </AnimatedPage>
              }
            />
            <Route
              path="/apps"
              element={
                <AnimatedPage>
                  <Apps />
                </AnimatedPage>
              }
            />
          </Route>
        </Routes>
      </AnimatePresence>
      <Navigation />
    </>
  );
}

export default App;
