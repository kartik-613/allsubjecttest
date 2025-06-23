// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Button } from "../components/button";
// import { useNavigate } from "react-router-dom";

// const QuizApp = () => {
//   const [questions, setQuestions] = useState([]);
//   const [timeLeft, setTimeLeft] = useState(445);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [answers, setAnswers] = useState([]);
//   const [answered, setAnswered] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [markedForReview, setMarkedForReview] = useState({});
//   const [showExitWarning, setShowExitWarning] = useState(false);
//   const [unloadWarningCount, setUnloadWarningCount] = useState(0);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const res = await axios.get(import.meta.env.VITE_API_URL);
//         const fetchedQuestions = res.data.map((q) => ({
//           question: q.question,
//           options: q.options.map((opt) => {
//             const key = Object.keys(opt)[0];
//             return `${key.toUpperCase()}. ${opt[key]}`;
//           }),
//           correct_answer: q.correct_answer,
//           explanation: q.explanation,
//         }));
//         setQuestions(fetchedQuestions);
//         setAnswers(Array(fetchedQuestions.length).fill(null));
//       } catch (error) {
//         console.error("Error fetching questions:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchQuestions();
//   }, []);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           handleSubmitTest();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   useEffect(() => {
//     if (questions.length > 0) {
//       setAnswered(answers[currentQuestionIndex] !== null);
//     }
//   }, [currentQuestionIndex, answers, questions]);

//   useEffect(() => {
//     const preventDefault = (e) => e.preventDefault();
//     document.addEventListener("copy", preventDefault);
//     document.addEventListener("cut", preventDefault);
//     document.addEventListener("contextmenu", preventDefault);
//     document.body.style.userSelect = "none";

//     const handleBeforeUnload = (e) => {
//       e.preventDefault();
//       e.returnValue = "";

//       if (unloadWarningCount < 2) {
//         setUnloadWarningCount((prev) => prev + 1);
//         setShowExitWarning(true);
//       } else {
//         handleSubmitTest();
//       }
//     };
//     window.addEventListener("beforeunload", handleBeforeUnload);

//     const handleVisibilityChange = () => {
//       if (document.hidden) {
//         alert("Tab switch detected. Submitting your test.");
//         handleSubmitTest();
//       }
//     };
//     document.addEventListener("visibilitychange", handleVisibilityChange);

//     const goFullScreen = () => {
//       const el = document.documentElement;
//       if (el.requestFullscreen) el.requestFullscreen();
//       else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
//       else if (el.mozRequestFullScreen) el.mozRequestFullScreen();
//       else if (el.msRequestFullscreen) el.msRequestFullscreen();
//     };
//     goFullScreen();

//     const handleFullScreenChange = () => {
//       if (!document.fullscreenElement) {
//         alert("Fullscreen exited. Submitting your test.");
//         handleSubmitTest();
//       }
//     };
//     document.addEventListener("fullscreenchange", handleFullScreenChange);

//     const blockInspect = (e) => {
//       if (
//         e.key === "F12" ||
//         (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) ||
//         (e.ctrlKey && e.key === "U")
//       ) {
//         e.preventDefault();
//         alert("Inspect action detected. Submitting your test.");
//         handleSubmitTest();
//       }
//     };
//     window.addEventListener("keydown", blockInspect);

//     const handleBackButton = (e) => {
//       e.preventDefault();
//       window.history.pushState(null, "", window.location.href);
//     };
//     window.history.pushState(null, "", window.location.href);
//     window.addEventListener("popstate", handleBackButton);

//     return () => {
//       document.removeEventListener("copy", preventDefault);
//       document.removeEventListener("cut", preventDefault);
//       document.removeEventListener("contextmenu", preventDefault);
//       document.body.style.userSelect = "auto";

//       window.removeEventListener("beforeunload", handleBeforeUnload);
//       document.removeEventListener("visibilitychange", handleVisibilityChange);
//       document.removeEventListener("fullscreenchange", handleFullScreenChange);
//       window.removeEventListener("keydown", blockInspect);
//       window.removeEventListener("popstate", handleBackButton);
//     };
//   }, [unloadWarningCount]);

//   const formatTime = (seconds) => {
//     const min = Math.floor(seconds / 60);
//     const sec = seconds % 60;
//     return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
//   };

//   const handleOptionSelect = (index) => {
//     const updatedAnswers = [...answers];
//     updatedAnswers[currentQuestionIndex] = index;
//     setAnswers(updatedAnswers);
//     setAnswered(true);
//   };

//   const toggleMarkForReview = (index) => {
//     setMarkedForReview((prev) => ({
//       ...prev,
//       [index]: !prev[index],
//     }));
//   };

//   const handleSubmitTest = () => {
//     navigate("/tabs");
//   };

//   if (loading) {
//     return (
//       <div className="p-10 text-xl font-semibold">Loading questions...</div>
//     );
//   }

//   const currentQ = questions[currentQuestionIndex];

//   return (
//     <div className="min-h-screen bg-white text-black px-10 py-7">
//       <div className="flex flex-col lg:flex-row gap-10">
//         <div className="flex-1 flex flex-col space-y-5">
//           <div className="bg-white rounded-xl px-5 py-6 border border-gray-300">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
//               <h1 className="text-2xl font-bold">📘 Subject: Quiz</h1>
//               <h2 className="text-xl font-semibold">
//                 ⏱️ TIME LEFT - {formatTime(timeLeft)} MIN
//               </h2>
//             </div>
//           </div>

//           <div className="rounded-xl border border-gray-300 flex flex-col justify-between">
//             <div className="bg-white p-5 rounded-xl" style={{ minHeight: "300px" }}>
//               <div className="pb-1.5">
//                 <h3 className="text-lg font-medium mb-2">
//                   Question {currentQuestionIndex + 1}
//                 </h3>
//                 <p className="mb-2 min-h-[60px]">{currentQ.question}</p>
//                 <div className="space-y-3">
//                   {currentQ.options.map((option, index) => (
//                     <div
//                       key={index}
//                       onClick={() => handleOptionSelect(index)}
//                       className={`p-4 rounded-lg border border-gray-300 cursor-pointer transition-colors duration-200 ${
//                         answers[currentQuestionIndex] === index
//                           ? "bg-blue-300"
//                           : "hover:bg-gray-100"
//                       }`}
//                     >
//                       {option}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <div className="flex justify-center">
//               <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-center bg-white border-t p-5 border-gray-300 rounded-bl-xl rounded-br-xl gap-3 sm:gap-4">
//                 {timeLeft === 0 ? (
//                   <Button onClick={handleSubmitTest} className="bg-green-500 hover:bg-green-600 text-white border border-gray-300 rounded-lg py-3 px-6 w-full sm:w-auto">
//                     Submit Test
//                   </Button>
//                 ) : (
//                   <>
//                     {currentQuestionIndex > 0 && (
//                       <Button
//                         onClick={() => setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0))}
//                         className="bg-blue-400 text-white hover:bg-blue-500 border border-gray-300 rounded-lg py-3 px-6 w-full sm:w-auto"
//                       >
//                         Previous
//                       </Button>
//                     )}

//                     {currentQuestionIndex < questions.length - 1 && (
//                       <Button
//                         onClick={() => setCurrentQuestionIndex((prev) => Math.min(prev + 1, questions.length - 1))}
//                         className="bg-blue-400 text-white hover:bg-blue-500 border border-gray-300 rounded-lg py-3 px-6 w-full sm:w-auto"
//                       >
//                         Next
//                       </Button>
//                     )}

//                     {currentQuestionIndex < questions.length - 1 && (
//                       <Button
//                         onClick={() => {
//                           const isMarked = markedForReview[currentQuestionIndex];
//                           toggleMarkForReview(currentQuestionIndex);
//                           if (!isMarked && currentQuestionIndex < questions.length - 1) {
//                             setCurrentQuestionIndex(currentQuestionIndex + 1);
//                           }
//                         }}
//                         className={`text-white border border-gray-300 rounded-lg py-3 px-6 w-full sm:w-auto ${
//                           markedForReview[currentQuestionIndex]
//                             ? "bg-blue-500 hover:bg-blue-600"
//                             : "bg-blue-400 hover:bg-blue-500"
//                         }`}
//                       >
//                         {markedForReview[currentQuestionIndex]
//                           ? "Unmark"
//                           : "Mark for Review"}
//                       </Button>
//                     )}
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Sidebar */}
//         <div className="w-full lg:w-80 flex flex-col justify-between rounded-xl border border-gray-300 bg-white">
//           <div className="p-5">
//             <div className="flex items-center gap-5 border-b border-gray-300 pb-3 mb-3">
//               <div className="rounded-full p-5 border border-gray-300 bg-gray-100 text-black text-xl font-semibold flex items-center justify-center w-16 h-16">
//                 Ab
//               </div>
//               <div>
//                 <h1 className="text-lg font-medium">User</h1>
//               </div>
//             </div>

//             <div className="border-b border-gray-300 pb-1">
//               <h3 className="text-lg font-semibold mb-4 border-b border-gray-300 pb-3">
//                 Question Analysis
//               </h3>
//               <div className="flex gap-3 flex-wrap mb-3 max-h-88 overflow-y-auto">
//                 {questions.map((_, i) => (
//                   <button
//                     key={i}
//                     onClick={() => setCurrentQuestionIndex(i)}
//                     className={`w-10 h-10 md:w-12 md:h-12 inline-flex justify-center items-center rounded-lg border border-gray-300 text-sm font-medium cursor-pointer
//                     ${
//                       markedForReview[i]
//                         ? "bg-red-400 text-white"
//                         : answers[i] !== null
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

//           {/* Bottom Submit Button */}
//           <div className="w-full flex items-center justify-center py-4 border-t border-gray-300 text-white bg-blue-400 hover:bg-blue-500 rounded-bl-xl rounded-br-xl cursor-pointer">
//             <Button onClick={handleSubmitTest}>Submit Test</Button>
//           </div>
//         </div>
//       </div>

//       {/* Exit confirmation modal */}
//       {showExitWarning && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
//             <h2 className="text-xl font-bold text-red-600 mb-4">Exit Warning</h2>
//             <p className="mb-6">You're trying to exit the test. Do you want to continue or exit and submit?</p>
//             <div className="flex justify-center gap-4">
//               <button
//                 onClick={() => setShowExitWarning(false)}
//                 className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//               >
//                 Continue Test
//               </button>
//               <button
//                 onClick={() => {
//                   setShowExitWarning(false);
//                   handleSubmitTest();
//                 }}
//                 className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//               >
//                 Exit & Submit
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default QuizApp;


















import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";

const API_CALL = import.meta.env.VITE_API_URL_PATH;
const API_KEY = import.meta.env.VITE_API_URL_KEY;
// console.log('hgjhghhgf',API_CALL , API_KEY);

const QuizApp = () => {
  const [questions, setQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(445);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [answered, setAnswered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [markedForReview, setMarkedForReview] = useState({});
  const [showExitWarning, setShowExitWarning] = useState(false);
  const [securityBreachMessage, setSecurityBreachMessage] = useState("");

  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_API_URL);
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
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      setAnswered(answers[currentQuestionIndex] !== null);
    }
  }, [currentQuestionIndex, answers, questions]);

  useEffect(() => {
    const preventDefault = (e) => e.preventDefault();
    document.addEventListener("copy", preventDefault);
    document.addEventListener("cut", preventDefault);
    document.addEventListener("contextmenu", preventDefault);
    document.body.style.userSelect = "none";

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
      setSecurityBreachMessage(
        "Exit attempt detected. Do you want to exit and submit or continue your test?"
      );
      setShowExitWarning(true);
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setSecurityBreachMessage(
          "Tab switch detected. Do you want to exit and submit or continue your test?"
        );
        setShowExitWarning(true);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const goFullScreen = () => {
      const el = document.documentElement;
      if (el.requestFullscreen) el.requestFullscreen();
      else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
      else if (el.mozRequestFullScreen) el.mozRequestFullScreen();
      else if (el.msRequestFullscreen) el.msRequestFullscreen();
    };
    goFullScreen();

    const handleFullScreenChange = () => {
      if (!document.fullscreenElement) {
        setSecurityBreachMessage(
          "Fullscreen exited. Do you want to exit and submit or continue your test?"
        );
        setShowExitWarning(true);
      }
    };
    document.addEventListener("fullscreenchange", handleFullScreenChange);

    // const blockInspect = (e) => {
    //   if (
    //     e.key === "F12" ||
    //     (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) ||
    //     (e.ctrlKey && e.key === "U")
    //   ) {
    //     e.preventDefault();
    //     setSecurityBreachMessage("Inspect action detected. Do you want to exit and submit or continue your test?");
    //     setShowExitWarning(true);
    //   }
    // };
    // window.addEventListener("keydown", blockInspect);

    const handleBackButton = (e) => {
      e.preventDefault();
      window.history.pushState(null, "", window.location.href);
    };
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handleBackButton);

    // Start webcam
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      })
      .catch((err) => {
        console.error("Camera access denied:", err);
        setCameraActive(false);
      });

    return () => {
      document.removeEventListener("copy", preventDefault);
      document.removeEventListener("cut", preventDefault);
      document.removeEventListener("contextmenu", preventDefault);
      document.body.style.userSelect = "auto";
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
      // window.removeEventListener("keydown", blockInspect);
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);

  // Periodic screen capture from camera
  useEffect(() => {
    if (!cameraActive) return;

    const interval = setInterval(() => {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      console.log(canvas, video);

      if (canvas && video) {
        const context = canvas.getContext("2d");

        if (video.videoWidth === 0 || video.videoHeight === 0) return;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(async (blob) => {
          if (!blob) return;

          const formData = new FormData();
          formData.append("file", blob, `screenshot_${Date.now()}.png`);
            console.log("Uploading screenshot", formData.getAll("file"));

          try {
            const a = await axios.post(

              `${API_CALL}/api/FileAPI/UploadFiles`,
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  // "APIKEY": API_KEY ,
                },
                params: {
                  APIKEY: API_KEY,
                },
              }
            );
            console.log("Upload response:", a.data);
            
            console.log("Screenshot uploaded");
          } catch (error) {
            console.error("Upload failed:", error);
          }
        }, "image/png");


      }
    }, 60000); // every 60 seconds
    

    return () => clearInterval(interval);
  }, [cameraActive]);

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

  const toggleMarkForReview = (index) => {
    setMarkedForReview((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleSubmitTest = () => {
    // Stop the camera
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();

      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }

    // Navigate to the result page
    navigate("/tabs");
  };

  if (loading) {
    return (
      <div className="p-10 text-xl font-semibold">Loading questions...</div>
    );
  }

  const currentQ = questions[currentQuestionIndex];



  return (
    <div className="min-h-screen bg-white text-black px-10 py-7">
      {/* Hidden video and canvas */}
      <video ref={videoRef} autoPlay playsInline className="hidden" />
      <canvas ref={canvasRef} className="hidden" />

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 flex flex-col space-y-5">
          <div className="bg-white rounded-xl px-5 py-6 border border-gray-300">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h1 className="text-2xl font-bold">📘 Subject: Quiz</h1>
              <h2 className="text-xl font-semibold">
                ⏱️ TIME LEFT - {formatTime(timeLeft)} MIN
              </h2>
            </div>
          </div>

          <div className="rounded-xl border border-gray-300 flex flex-col justify-between">
            <div
              className="bg-white p-5 rounded-xl"
              style={{ minHeight: "300px" }}
            >
              <div className="pb-1.5">
                <h3 className="text-lg font-medium mb-2">
                  Question {currentQuestionIndex + 1}
                </h3>
                <p className="mb-2 min-h-[60px]">{currentQ.question}</p>
                <div className="space-y-3">
                  {currentQ.options.map((option, index) => (
                    <div
                      key={index}
                      onClick={() => handleOptionSelect(index)}
                      className={`p-4 rounded-lg border border-gray-300 cursor-pointer transition-colors duration-200 ${
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

            <div className="flex justify-center">
              <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-center bg-white border-t p-5 border-gray-300 rounded-bl-xl rounded-br-xl gap-3 sm:gap-4">
                {timeLeft === 0 ? (
                  <Button
                    onClick={handleSubmitTest}
                    className="bg-green-500 hover:bg-green-600 text-white border border-gray-300 rounded-lg py-3 px-6 w-full sm:w-auto"
                  >
                    Submit Test
                  </Button>
                ) : (
                  <>
                    {currentQuestionIndex > 0 && (
                      <Button
                        onClick={() =>
                          setCurrentQuestionIndex((prev) =>
                            Math.max(prev - 1, 0)
                          )
                        }
                        className="bg-blue-400 text-white hover:bg-blue-500 border border-gray-300 rounded-lg py-3 px-6 w-full sm:w-auto"
                      >
                        Previous
                      </Button>
                    )}

                    {currentQuestionIndex < questions.length - 1 && (
                      <Button
                        onClick={() =>
                          setCurrentQuestionIndex((prev) =>
                            Math.min(prev + 1, questions.length - 1)
                          )
                        }
                        className="bg-blue-400 text-white hover:bg-blue-500 border border-gray-300 rounded-lg py-3 px-6 w-full sm:w-auto"
                      >
                        Next
                      </Button>
                    )}

                    {currentQuestionIndex < questions.length - 1 && (
                      <Button
                        onClick={() => {
                          const isMarked =
                            markedForReview[currentQuestionIndex];
                          toggleMarkForReview(currentQuestionIndex);
                          if (
                            !isMarked &&
                            currentQuestionIndex < questions.length - 1
                          ) {
                            setCurrentQuestionIndex(currentQuestionIndex + 1);
                          }
                        }}
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
            </div>
          </div>
        </div>

        {/* Sidebar */}
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
                    onClick={() => setCurrentQuestionIndex(i)}
                    className={`w-10 h-10 md:w-12 md:h-12 inline-flex justify-center items-center rounded-lg border border-gray-300 text-sm font-medium cursor-pointer
                    ${
                      markedForReview[i]
                        ? "bg-red-400 text-white"
                        : answers[i] !== null
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

          <div className="w-full flex items-center justify-center py-4 border-t border-gray-300 text-white bg-blue-400 hover:bg-blue-500 rounded-bl-xl rounded-br-xl cursor-pointer">
            <Button onClick={handleSubmitTest}>Submit Test</Button>
          </div>
        </div>
      </div>

      {/* Exit Modal */}
      {showExitWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
            <h2 className="text-xl font-bold text-red-600 mb-4">
              Exit Warning
            </h2>
            <p className="mb-6">
              {securityBreachMessage ||
                "You're trying to exit the test. Do you want to continue or exit and submit?"}
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowExitWarning(false)}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Continue Test
              </button>
              <button
                onClick={() => {
                  setShowExitWarning(false);
                  handleSubmitTest();
                }}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Exit & Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizApp;
