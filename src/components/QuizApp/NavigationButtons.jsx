import React from "react";
import { Button } from "../Button";

const NavigationButtons = ({
  currentQuestionIndex,
  totalQuestions,
  markedForReview,
  onPrevious,
  onNext,
  onToggleMark,
  onSubmit,
  timeLeft
}) => (
  <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-center bg-white border-t p-5 border-gray-300 rounded-bl-xl rounded-br-xl gap-3 sm:gap-4">
    {timeLeft === 0 ? (
      <Button
        onClick={onSubmit}
        className="bg-green-500 hover:bg-green-600 text-white border border-gray-300 rounded-lg py-3 px-6 w-full sm:w-auto"
      >
        Submit Test
      </Button>
    ) : (
      <>
        {currentQuestionIndex > 0 && (
          <Button
            onClick={onPrevious}
            className="bg-blue-400 text-white hover:bg-blue-500 border border-gray-300 rounded-lg py-3 px-6 w-full sm:w-auto"
          >
            Previous
          </Button>
        )}
        {currentQuestionIndex < totalQuestions - 1 && (
          <Button
            onClick={onNext}
            className="bg-blue-400 text-white hover:bg-blue-500 border border-gray-300 rounded-lg py-3 px-6 w-full sm:w-auto"
          >
            Next
          </Button>
        )}
        {currentQuestionIndex < totalQuestions - 1 && (
          <Button
            onClick={onToggleMark}
            className={`text-white border border-gray-300 rounded-lg py-3 px-6 w-full sm:w-auto ${
              markedForReview[currentQuestionIndex]
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-blue-400 hover:bg-blue-500"
            }`}
          >
            {markedForReview[currentQuestionIndex]
              ? "Unmark"
              : "Mark for Review"}
          </Button>
        )}
      </>
    )}
  </div>
);

export default NavigationButtons;
