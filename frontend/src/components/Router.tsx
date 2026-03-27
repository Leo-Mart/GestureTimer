import { HashRouter, Routes, Route } from "react-router-dom";
import DrawingPage from "../pages/DrawingPage";
import SettingsPage from "../pages/SettingsPage";

function Router() {
  return (
    <>
      <HashRouter basename="/">
        <Routes>
          <Route path="/" element={<SettingsPage />} />
          <Route path="/drawing" element={<DrawingPage />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default Router;
