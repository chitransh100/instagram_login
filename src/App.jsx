import { Routes, Route } from "react-router-dom";
import { BackgroundLinesDemo } from "./components/BackgroundLinesDemo";
import PrivacyPolicy from "./components/PrivacyPolicy";// ✅ Or your correct path

function App() {
  return (
    <Routes>
      <Route path="/" element={<BackgroundLinesDemo />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    </Routes>
  );
}

export default App;
