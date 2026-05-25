import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import AppPage from "./pages/AppPage";
import LibraryPage from "./pages/LibraryPage";

const App: React.FC = () => {
  return (
    <div className="full-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<AppPage />} />
        <Route path="/library" element={<LibraryPage />} />
      </Routes>
    </div>
  );
};

export default App;
