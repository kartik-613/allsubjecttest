import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "../components/button";

const QuizApp = () => {
  const [questions, setQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(445);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [answered, setAnswered] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get("/data/questions.json");
        const fetchedQuestions = res.data.map((q) => ({
          question: q.question,
          options: q.options.map((opt) => {
            const key = Object.keys(opt)[0];
            return `${key.toUpperCase()}. ${opt[key]}`;
          }),
          correct_answer: q.correct_answer,
          explanation: q.explanation,
        }));
        setQuestions(fetchedQuestions);
        setAnswers(Array(fetchedQuestions.length).fill(null));
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      setAnswered(answers[currentQuestionIndex] !== null);
    }
  }, [currentQuestionIndex, answers, questions]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, "0")}:${sec
      .toString()
      .padStart(2, "0")}`;
  };

  const handleOptionSelect = (index) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = index;
    setAnswers(updatedAnswers);
    setAnswered(true);
  };

  if (loading) {
    return <div className="p-10 text-xl font-semibold">Loading questions...</div>;
  }

  const currentQ = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-white text-black px-10 py-10">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left Panel */}
        <div className="flex-1 flex flex-col space-y-5">
          {/* Header */}
          <div className="bg-white rounded-xl px-5 py-5 border border-gray-300">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h1 className="text-2xl font-bold">📘 Subject: Quiz</h1>
              <h2 className="text-xl font-semibold">
                ⏱️ TIME LEFT - {formatTime(timeLeft)} MIN
              </h2>
            </div>
          </div>

          {/* Question Box */}
          <div className="rounded-xl border border-gray-300 flex flex-col justify-between">
            <div className="bg-white p-5 rounded-xl" style={{ minHeight: "300px" }}>
              <div>
                <h3 className="text-lg font-medium mb-2">
                  Question {currentQuestionIndex + 1}
                </h3>
                <p className="mb-2 min-h-[60px]">{currentQ.question}</p>

                <div className="space-y-3">
                  {currentQ.options.map((option, index) => (
                    <div
                      key={index}
                      onClick={() => handleOptionSelect(index)}
                      className={`p-3 rounded-lg border border-gray-300 cursor-pointer transition-colors duration-200 ${
                        answers[currentQuestionIndex] === index
                          ? "bg-blue-300"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center">
              <div className="w-full flex items-center justify-center bg-white border-t p-3 border-gray-300 rounded-bl-xl rounded-br-xl">
                <Button
                  onClick={() =>
                    setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0))
                  }
                  disabled={currentQuestionIndex === 0}
                  className="bg-blue-400 text-white hover:bg-blue-500 border border-gray-300 rounded-lg py-3 px-6 mr-2 cursor-pointer"
                >
                  Previous
                </Button>
                <Button
                  onClick={() =>
                    setCurrentQuestionIndex((prev) =>
                      Math.min(prev + 1, questions.length - 1)
                    )
                  }
                  disabled={currentQuestionIndex === questions.length - 1}
                  className="bg-blue-400 text-white hover:bg-blue-500 border border-gray-300 rounded-lg py-3 px-9 ml-2 cursor-pointer"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80 flex flex-col justify-between rounded-xl border border-gray-300 bg-white">
          <div className="p-5">
            {/* User Info */}
            <div className="flex items-center gap-5 border-b border-gray-300 pb-3 mb-3">
              <div className="rounded-full p-5 border border-gray-300 bg-gray-100 text-black text-xl font-semibold flex items-center justify-center w-16 h-16">
                Ab
              </div>
              <div>
                <h1 className="text-lg font-medium">User</h1>
              </div>
            </div>

            {/* Question Navigation */}
            <div className="border-b border-gray-300 pb-1">
              <h3 className="text-lg font-semibold mb-4 border-b border-gray-300 pb-3">
                Question Analysis
              </h3>
              <div className="flex gap-2 flex-wrap mb-3 max-h-80 overflow-y-auto">
                {questions.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentQuestionIndex(i)}
                    className={`py-3 px-5 rounded-lg border border-gray-300 text-sm font-medium cursor-pointer ${
                      answers[i] !== null
                        ? "bg-blue-300 text-white"
                        : "bg-white text-black hover:bg-gray-100"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="w-full flex items-center justify-center py-4 border-t border-gray-300 text-white bg-blue-400 hover:bg-blue-500 rounded-bl-xl rounded-br-xl cursor-pointer">
            <Button onClick={() => alert("Test Submitted!")}>Submit Test</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizApp;




















// import React, { useState, useEffect } from "react";
// import { Button } from "../components/button";

// const questions = [
//   {
//     question:
//       "A stone falls freely under gravity. It covers distances h₁, h₂ and h₃ in the first 5 seconds, the next 5 seconds and the next 5 seconds respectively. The relation between h₁ and h₂ and h₃ is",
//     options: [
//       "h₂ = 3h₁ and h₃ = 3h₂",
//       "h₁ = h₂ = h₃",
//       "h₁ = 2h₂ = 3h₃",
//       "h₁ = h₂ / 3 = h₃ / 5",
//     ],
//   },
//   {
//     question: "What is the speed of light?",
//     options: ["3 × 10⁸ m/s", "1.5 × 10⁸ m/s", "6 × 10⁸ m/s", "9.8 m/s²"],
//   },
//   {
//     question: "Who is known as the father of modern physics?",
//     options: [
//       "Isaac Newton",
//       "Albert Einstein",
//       "Galileo Galilei",
//       "Nikola Tesla",
//     ],
//   },
// ];

// const QuizApp = () => {
//   const [timeLeft, setTimeLeft] = useState(445);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [answers, setAnswers] = useState(Array(questions.length).fill(null));
//   const [answered, setAnswered] = useState(false);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   useEffect(() => {
//     setAnswered(answers[currentQuestionIndex] !== null);
//   }, [currentQuestionIndex, answers]);

//   const formatTime = (seconds) => {
//     const min = Math.floor(seconds / 60);
//     const sec = seconds % 60;
//     return `${min.toString().padStart(2, "0")}:${sec
//       .toString()
//       .padStart(2, "0")}`;
//   };

//   const handleOptionSelect = (index) => {
//     const newAnswers = [...answers];
//     newAnswers[currentQuestionIndex] = index;
//     setAnswers(newAnswers);
//     setAnswered(true);
//   };

//   return (
//     <div className="min-h-screen bg-white text-black px-10 py-10">
//       <div className="flex flex-col lg:flex-row gap-10">
//         {/* Left Panel */}
//         <div className="flex-1 flex flex-col space-y-5">
//           {/* Header */}
//           <div className="bg-white rounded-xl px-5 py-5 border border-gray-300">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
//               <h1 className="text-2xl font-bold">📘 Subject: Physics</h1>
//               <h2 className="text-xl font-semibold">
//                 ⏱️ TIME LEFT - {formatTime(timeLeft)} MIN
//               </h2>
//             </div>
//           </div>

//           {/* Question Box */}
//           <div className="rounded-xl border border-gray-300 flex flex-col justify-between">
//             <div className="bg-white p-5 rounded-xl" style={{ minHeight: "300px" }}>
//               <div>
//                 <h3 className="text-lg font-medium mb-2">
//                   Question {currentQuestionIndex + 1}
//                 </h3>
//                 <p className="mb-2 min-h-[60px]">
//                   {questions[currentQuestionIndex].question}
//                 </p>

//                 <div className="space-y-3">
//                   {questions[currentQuestionIndex].options.map((option, index) => (
//                     <div
//                       key={index}
//                       onClick={() => handleOptionSelect(index)}
//                       className={`p-3 rounded-lg border border-gray-300 cursor-pointer transition-colors duration-200 ${
//                         answers[currentQuestionIndex] === index
//                           ? "bg-blue-300"
//                           : "hover:bg-gray-100"
//                       }`}
//                     >
//                       <span className="font-bold mr-2">
//                         {String.fromCharCode(65 + index)}.
//                       </span>
//                       {option}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Navigation Buttons */}
//             <div className="flex justify-center">
//               <div className="w-full flex items-center justify-center bg-white border-t p-3 border-gray-300 rounded-bl-xl rounded-br-xl">
//                 <Button
//                   onClick={() =>
//                     setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0))
//                   }
//                   disabled={currentQuestionIndex === 0}
//                   className="bg-blue-400 text-white hover:bg-blue-500 border border-gray-300 rounded-lg py-3 px-6 mr-2 cursor-pointer"
//                 >
//                   Previous
//                 </Button>
//                 <Button
//                   onClick={() =>
//                     setCurrentQuestionIndex((prev) =>
//                       Math.min(prev + 1, questions.length - 1)
//                     )
//                   }
//                   disabled={currentQuestionIndex === questions.length - 1}
//                   className="bg-blue-400 text-white hover:bg-blue-500 border border-gray-300 rounded-lg py-3 px-9 ml-2 cursor-pointer"
//                 >
//                   Next
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Sidebar */}
//         <div className="w-full lg:w-80 flex flex-col justify-between rounded-xl border border-gray-300 bg-white">
//           <div className="p-5">
//             {/* User Info */}
//             <div className="flex items-center gap-5 border-b border-gray-300 pb-3 mb-3">
//               <div className="rounded-full p-5 border border-gray-300 bg-gray-100 text-black text-xl font-semibold flex items-center justify-center w-16 h-16">
//                 Ab
//               </div>
//               <div>
//                 <h1 className="text-lg font-medium">User</h1>
//               </div>
//             </div>

//             {/* Question Navigation */}
//             <div className="border-b border-gray-300 pb-1">
//               <h3 className="text-lg font-semibold mb-4 border-b border-gray-300 pb-3">
//                 Question Analysis
//               </h3>
//               <div className="flex gap-2 flex-wrap mb-3 max-h-80 overflow-y-auto">
//                 {questions.map((_, i) => (
//                   <button
//                     key={i}
//                     onClick={() => setCurrentQuestionIndex(i)}
//                     className={`py-3 px-5 rounded-lg border border-gray-300 text-sm font-medium cursor-pointer ${
//                       answers[i] !== null
//                         ? "bg-blue-300 text-white"
//                         : "bg-white text-black hover:bg-gray-100"
//                     }`}
//                   >
//                     {i + 1}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <div className="w-full flex items-center justify-center py-4 border-t border-gray-300 text-white bg-blue-400 hover:bg-blue-500 rounded-bl-xl rounded-br-xl cursor-pointer">
//             <Button onClick={() => alert("Test Submitted!")}>
//               Submit Test
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QuizApp;










