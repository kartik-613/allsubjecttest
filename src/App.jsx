import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EntryPage from "./pages/EntryPage";
import FormPage from "./pages/FormPage";
import QuizApp from "./pages/QuizApp";
import TabsPage from "./pages/TabsPage";
import CodePlaygroundPage from "./pages/CodePlaygroundPage"; // ✅
import GoogleTranslate from "./components/GoogleTranslate";

const App = () => {
  return (
    <Router>
      <GoogleTranslate />
      <Routes>
        <Route path="/" element={<EntryPage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/next" element={<QuizApp />} />
        <Route path="/editor" element={<CodePlaygroundPage />} />
        <Route path="/tabs" element={<TabsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
