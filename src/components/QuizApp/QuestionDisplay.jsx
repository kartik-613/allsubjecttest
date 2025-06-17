const QuestionDisplay = ({ question, options, selected, onSelect }) => (
  <div className="bg-white p-5 rounded-xl min-h-[300px]">
    <h3 className="text-lg font-medium mb-2">Question</h3>
    <p className="mb-4 min-h-[60px]">{question}</p>
    <div className="space-y-3">
      {options.map((option, index) => (
        <div
          key={index}
          onClick={() => onSelect(index)}
          className={`p-3 rounded-lg border border-gray-300 cursor-pointer transition-colors duration-200 ${
            selected === index ? "bg-blue-300" : "hover:bg-gray-100"
          }`}
        >
          {option}
        </div>
      ))}
    </div>
  </div>
);

export default QuestionDisplay;
