import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EntryPage from "./pages/EntryPage";
import FormPage from "./pages/FormPage";
import QuizApp from "./pages/QuizApp";
import CodePlaygroundPage from "./pages/CodePlaygroundPage"; // ✅

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EntryPage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/next" element={<QuizApp />} />
        <Route path="/editor" element={<CodePlaygroundPage />} /> {/* ✅ New */}
      </Routes>
    </Router>
  );
};

export default App;
