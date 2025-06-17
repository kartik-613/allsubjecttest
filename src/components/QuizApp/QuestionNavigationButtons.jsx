import { Button } from "../button";

const QuestionNavigationButtons = ({
  currentIndex,
  totalQuestions,
  onPrev,
  onNext,
  onMarkForReview,
  isMarked,
  isTimeUp,
  onSubmit,
}) => (
  <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-center bg-white border-t p-3 border-gray-300 rounded-bl-xl rounded-br-xl gap-3 sm:gap-4">
    {isTimeUp ? (
      <Button onClick={onSubmit} className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 w-full sm:w-auto">
        Submit Test
      </Button>
    ) : (
      <>
        {currentIndex > 0 && (
          <Button onClick={onPrev} className="bg-blue-400 hover:bg-blue-500 text-white py-3 px-6 w-full sm:w-auto">
            Previous
          </Button>
        )}
        {currentIndex < totalQuestions - 1 && (
          <Button onClick={onNext} className="bg-blue-400 hover:bg-blue-500 text-white py-3 px-6 w-full sm:w-auto">
            Next
          </Button>
        )}
        <Button
          onClick={onMarkForReview}
          className={`text-white py-3 px-6 w-full sm:w-auto ${
            isMarked ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-400 hover:bg-blue-500"
          }`}
        >
          {isMarked ? "Unmark" : "Mark for Review"}
        </Button>
      </>
    )}
  </div>
);

export default QuestionNavigationButtons;
