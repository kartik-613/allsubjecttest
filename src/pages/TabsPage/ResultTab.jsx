import React from "react";
import { Pie } from "react-chartjs-2";

const ResultTab = ({ correct = 0, wrong = 0, unattempted = 0, data }) => {
  return (
    <div className="mx-4 md:mx-10 my-5 pb-4.5 text-gray-800 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="w-full max-w-[250px] md:max-w-sm">
        <Pie data={data} />
      </div>
      <div className="flex flex-col justify-between min-h-96 text-lg font-medium text-center md:text-left">
        <h3 className="text-xl font-semibold">Subject: Mathematics</h3>
        <div className="flex flex-col gap-3">
          <p className="flex items-center gap-2 text-green-600">
            <span className="w-2 h-2 bg-black rounded-full inline-block" />
            Correct: {correct}
          </p>
          <p className="flex items-center gap-2 text-red-600">
            <span className="w-2 h-2 bg-black rounded-full inline-block" />
            Wrong: {wrong}
          </p>
          <p className="flex items-center gap-2 text-yellow-600">
            <span className="w-2 h-2 bg-black rounded-full inline-block" />
            Unattempted: {unattempted}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultTab;
