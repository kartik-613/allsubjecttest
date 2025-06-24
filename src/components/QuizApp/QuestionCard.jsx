import React from "react";

const QuestionCard = ({ question, index, selectedAnswer, onSelect }) => (
  <div className="bg-white p-5 rounded-xl" style={{ minHeight: "300px" }}>
    <div className="pb-1.5">
      <h3 className="text-lg font-medium mb-2">Question {index + 1}</h3>
      <p className="mb-2 min-h-[60px]">{question.question}</p>
      <div className="space-y-3">
        {question.options.map((option, idx) => (
          <div
            key={idx}
            onClick={() => onSelect(idx)}
            className={`p-4 rounded-lg border border-gray-300 cursor-pointer transition-colors duration-200 ${
              selectedAnswer === idx ? "bg-blue-300" : "hover:bg-blue-100"
            }`}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default QuestionCard;
