const TimerBar = ({ subject = "Quiz", timeLeft }) => {
  const formatTime = (seconds) =>
    `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

  return (
    <div className="bg-white rounded-xl px-5 py-5 border border-gray-300">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h1 className="text-2xl font-bold">📘 Subject: {subject}</h1>
        <h2 className="text-xl font-semibold">⏱️ TIME LEFT - {formatTime(timeLeft)} MIN</h2>
      </div>
    </div>
  );
};

export default TimerBar;
