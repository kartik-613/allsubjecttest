const Sidebar = ({ userName = "User", questions, answers, markedForReview, onNavigate }) => (
  <div className="w-full lg:w-80 flex flex-col justify-between rounded-xl border border-gray-300 bg-white">
    <div className="p-5">
      <div className="flex items-center gap-5 border-b border-gray-300 pb-3 mb-3">
        <div className="rounded-full p-5 border border-gray-300 bg-gray-100 text-black text-xl font-semibold flex items-center justify-center w-16 h-16">
          {userName.slice(0, 2)}
        </div>
        <div>
          <h1 className="text-lg font-medium">{userName}</h1>
        </div>
      </div>

      <div className="border-b border-gray-300 pb-1">
        <h3 className="text-lg font-semibold mb-4 border-b border-gray-300 pb-3">Question Analysis</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-h-[430px] overflow-y-auto">
          {questions.map((_, i) => (
            <div
              key={i}
              onClick={() => onNavigate(i)}
              className={`p-3 border rounded-lg text-sm font-medium text-center cursor-pointer ${
                markedForReview[i]
                  ? "bg-red-400 text-white"
                  : answers[i] !== null
                  ? "bg-blue-300 text-white"
                  : "bg-white hover:bg-gray-100 text-black"
              }`}
            >
              Q{i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Sidebar;
