// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EntryPage from "./pages/EntryPage";
import FormPage from "./pages/FormPage";
import QuizApp from "./pages/QuizApp";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EntryPage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/next" element={<QuizApp />} />
      </Routes>
    </Router>
  );
};

export default App;
