// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormPage from "./pages/FormPage";
import QuizApp from "./pages/QuizApp";



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/next" element={<QuizApp />} />
      </Routes>
    </Router>
  );
};

export default App;
