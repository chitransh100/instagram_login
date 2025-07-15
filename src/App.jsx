import { Routes, Route } from "react-router-dom";
import { BackgroundLinesDemo } from "./components/BackgroundLinesDemo";
import PrivacyPolicy from "./components/PrivacyPolicy";// ✅ Or your correct path
import TermsOfService from "./components/TermsOfService";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<BackgroundLinesDemo />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/Terms-of-service" element={<TermsOfService/>} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
