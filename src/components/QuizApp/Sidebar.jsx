import React from "react";

const Sidebar = ({
  questions,
  answers,
  markedForReview,
  onSelectQuestion,
  onSubmit,
}) => (
  <div className="w-full lg:w-80 flex flex-col justify-between rounded-xl border border-gray-300 bg-white">
    <div className="p-5">
      <div className="flex items-center gap-5 border-b border-gray-300 pb-3 mb-3">
        <div className="rounded-full p-5 border border-gray-300 bg-gray-100 text-black text-xl font-semibold flex items-center justify-center w-16 h-16">
          Ab
        </div>
        <div>
          <h1 className="text-lg font-medium">User</h1>
        </div>
      </div>

      <div className="border-b border-gray-300 pb-1">
        <h3 className="text-lg font-semibold mb-4 border-b border-gray-300 pb-3">
          Question Analysis
        </h3>
        <div className="flex gap-3 flex-wrap mb-3 max-h-88 overflow-y-auto">
          {questions.map((_, i) => (
            <button
              key={i}
              onClick={() => onSelectQuestion(i)}
              className={`w-10 h-10 md:w-12 md:h-12 inline-flex justify-center items-center rounded-lg border border-gray-300 text-sm font-medium cursor-pointer
              ${
                markedForReview[i]
                  ? "bg-red-400 text-white"
                  : answers[i] !== null
                  ? "bg-blue-300 text-white"
                  : "bg-white text-black hover:bg-blue-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>

    <div className="w-full flex items-center justify-center py-4 border-t border-gray-300 text-white bg-blue-400 hover:bg-blue-500 rounded-bl-xl rounded-br-xl cursor-pointer">
      <button onClick={onSubmit}>Submit Test</button>
    </div>
  </div>
);

export default Sidebar;
